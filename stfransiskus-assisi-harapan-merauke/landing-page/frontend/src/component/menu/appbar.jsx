import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import stfransiskus from "../../assets/image/st.fransiskus_assisi.png";

const navMenuTitle = [
  { to: "/profil-gereja", label: "Profil" },
  { to: "/pedoman-pastoral", label: "Pedoman" },
  { to: "/katekese", label: "Katekese" },
  { to: "/administratif", label: "Administratif" },
  { to: "/pengumuman", label: "Pengumuman" },
  { to: "/berita", label: "Berita" },
  { to: "/gallery", label: "Galeri" },
];

// Layout navigasi situs menangani tautan halaman dan menu mobile.
export default function Layout({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoMask, setLogoMask] = useState("");
  const logoRef = useRef(null);
  const bgRef = useRef(null);
  // Hanya beranda yang boleh berada di belakang appbar; halaman lain berada di bawahnya.
  const isHome = pathname === "/";
  // Appbar sedang transparan (latar hitam tipis): teks putih, tidak bergantung pada tema.
  const onTransparent = !isScrolled && !isMenuOpen;
  // Warna latar appbar dipisah ke lapisan sendiri agar bisa dilubangi di area logo.
  const headerBg = onTransparent ? "bg-black/40" : "bg-[#B38728]";

  // Ukur posisi logo terhadap lapisan latar, lalu buat lubang bulat tepat di area logo.
  const measureLogo = useCallback(() => {
    const logo = logoRef.current;
    const bg = bgRef.current;
    if (!logo || !bg) return;
    const l = logo.getBoundingClientRect();
    const b = bg.getBoundingClientRect();
    const radius = l.width / 2;
    const cx = l.left - b.left + radius;
    const cy = l.top - b.top + l.height / 2;
    setLogoMask(
      `radial-gradient(circle at ${cx}px ${cy}px, transparent ${radius}px, #000 ${radius + 0.5}px)`,
    );
  }, []);

  useLayoutEffect(() => {
    measureLogo();
    window.addEventListener("resize", measureLogo);
    return () => window.removeEventListener("resize", measureLogo);
  }, [measureLogo, isScrolled, isMenuOpen]);

  // Pantau posisi gulir untuk mengubah appbar: transparan di atas, pill melayang saat digulir.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateHome = () => {
    // Kembali ke beranda, gulir ke awal, dan tutup menu seluler.
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  // Daftar tautan yang sama dipakai untuk navigasi desktop dan menu mobile.
  return (
    <section
      className="relative flex min-h-screen flex-col"
      children={[
        <header
          onTransitionEnd={measureLogo}
          className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
            onTransparent ? "text-white" : "text-slate-950"
          } ${
            isScrolled
              ? `mx-3 mt-3 overflow-hidden border border-amber-700/20 shadow-lg sm:mx-6 ${
                  isMenuOpen ? "rounded-xl" : "rounded-xl"
                }`
              : `border-b ${
                  isMenuOpen
                    ? "border-amber-700/20 shadow-sm"
                    : "border-transparent"
                }`
          }`}
          children={[
            /* Lapisan latar appbar; area logo dilubangi agar tembus ke belakang appbar. */
            <span
              key="bg"
              ref={bgRef}
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 -z-10 transition-colors duration-300 ${headerBg}`}
              style={
                logoMask
                  ? { WebkitMaskImage: logoMask, maskImage: logoMask }
                  : undefined
              }
            />,
            <nav
              aria-label="Navigasi utama"
              className="mx-auto flex max-w-screen-7xl items-center justify-between gap-4 px-4 py-3 sm:px-2"
              children={[
                <button
                  type="button"
                  onClick={navigateHome}
                  className="flex min-w-0 cursor-pointer items-center gap-3 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  children={[
                    <section
                      className="border-2 border-black bg-transparent rounded-full m-0.5"
                      children={
                        <section
                          ref={logoRef}
                          className="bg-transparent rounded-full p-0.2"
                          children={
                            <img
                              src={stfransiskus}
                              className="block h-11 w-11 shrink-0 rounded-full border border-amber-800/40 object-cover"
                              alt="Logo Paroki St. Fransiskus Assisi"
                            />
                          }
                        />
                      }
                    />,
                    <span
                      className="min-w-0 leading-tight"
                      children={[
                        <span
                          key="text"
                          className="block truncate font-serif text-base font-semibold sm:text-lg"
                          children="Paroki St.Fransiskus Assisi"
                        />,
                        <span
                          key="text"
                          className={`mt-1 block text-[12px] font-semibold uppercase tracking-[0.14em] sm:text-[12px] ${
                            onTransparent
                              ? "text-slate-200"
                              : "text-slate-800/80"
                          }`}
                          children="Harapan Makmur - Merauke, Papua Selatan"
                        />,
                      ]}
                    />,
                  ]}
                />,
                <button
                  type="button"
                  aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
                  aria-expanded={isMenuOpen}
                  onClick={() => setIsMenuOpen((open) => !open)}
                  className={`inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl transition hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 md:hidden ${
                    onTransparent ? "text-white" : "text-slate-900"
                  }`}
                  children={isMenuOpen ? <X size={21} /> : <Menu size={21} />}
                />,
                /* Navigasi lebar ditampilkan mulai breakpoint desktop. */
                <ul
                  className="hidden items-center gap-1 md:flex"
                  children={navMenuTitle.map((item) => (
                    <li
                      key={item.to}
                      children={
                        <NavLink
                          to={item.to}
                          onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                          }
                          className={({ isActive }) =>
                            `inline-flex rounded-lg px-3 py-2 text-[12px] uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                              isActive
                                ? onTransparent
                                  ? "bg-white/15 text-white font-bold"
                                  : "bg-black/10 text-gray-50 font-bold"
                                : onTransparent
                                  ? "text-white/90 hover:bg-white/10 hover:text-white"
                                  : "text-black hover:bg-black/10 hover:text-white"
                            }`
                          }
                          children={item.label}
                        />
                      }
                    />
                  ))}
                />,
              ]}
            />,

            /* Menu seluler hanya dirender ketika tombol menu diaktifkan. */
            isMenuOpen && (
              <nav
                aria-label="Menu seluler"
                className="border-t border-amber-800/20 px-4 py-3 md:hidden"
              >
                <ul
                  className="mx-auto grid max-w-screen-7xl grid-cols-2 gap-2 sm:grid-cols-3"
                  children={navMenuTitle.map((item) => (
                    <li
                      key={item.to}
                      children={
                        <NavLink
                          to={item.to}
                          onClick={() => {
                            setIsMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={({ isActive }) =>
                            `block rounded-lg px-3 py-2.5 text-xs uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                              isActive
                                ? "bg-black/10 text-slate-950 font-bold"
                                : "text-white font-medium hover:bg-black/10"
                            }`
                          }
                          children={item.label}
                        />
                      }
                    />
                  ))}
                />
              </nav>
            ),
          ]}
        />,

        <main
          className={`flex min-h-screen flex-1 flex-col ${isHome ? "" : "pt-22"}`}
          children={
            <section
              className="w-full max-w-screen-7xl flex-1"
              children={children}
            />
          }
        />,
      ]}
    />
  );
}
