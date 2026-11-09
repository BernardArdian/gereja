import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const navMenuTitle = [
  { to: "/profil-gereja", label: "Profil" },
  { to: "/pedoman-pastoral", label: "Pedoman" },
  { to: "/katekese", label: "Katekese" },
  { to: "/administratif", label: "Administratif" },
  { to: "/pengumuman", label: "Pengumuman" },
  { to: "/berita", label: "Berita" },
  { to: "/gallery", label: "Galeri" },
];

export default function Layout({ children, theme }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDark = theme === "dark";

  const navigateHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <section
      className="relative flex min-h-screen flex-col"
      children={[
        <header
          className={`sticky top-0 z-50 border-b shadow-sm transition-colors ${
            isDark
              ? "border-slate-700 bg-slate-950 text-white"
              : "border-amber-700/20 bg-[#B38728] text-slate-950"
          }`}
          children={[
            <nav
              aria-label="Navigasi utama"
              className="mx-auto flex max-w-screen-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
              children={[
                <button
                  type="button"
                  onClick={navigateHome}
                  className="flex min-w-0 cursor-pointer items-center gap-3 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  children={[
                    <img
                      src="/saint_francis_assisi.png"
                      className="h-11 w-11 shrink-0 rounded-full border border-amber-800/40 object-cover"
                      alt="Logo Paroki St. Fransiskus Assisi"
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
                            isDark ? "text-slate-300" : "text-slate-800/80"
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
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                  children={isMenuOpen ? <X size={21} /> : <Menu size={21} />}
                />,
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
                            `inline-flex rounded-lg px-3 py-2 text-[11px] font-semibold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                              isActive
                                ? isDark
                                  ? "bg-amber-400/15 text-amber-200"
                                  : "bg-black/10 text-slate-950"
                                : isDark
                                  ? "text-slate-200 hover:bg-white/10 hover:text-white"
                                  : "text-white hover:bg-black/10 hover:text-slate-950"
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

            isMenuOpen && (
              <nav
                aria-label="Menu seluler"
                className={`border-t px-4 py-3 md:hidden ${
                  isDark
                    ? "border-slate-700 bg-slate-950"
                    : "border-amber-800/20"
                }`}
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
                            `block rounded-lg px-3 py-2.5 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                              isActive
                                ? isDark
                                  ? "bg-amber-400/15 text-amber-200"
                                  : "bg-black/10 text-slate-950"
                                : isDark
                                  ? "text-slate-200 hover:bg-white/10"
                                  : "text-white hover:bg-black/10"
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
          className="flex min-h-screen flex-1 flex-col"
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
