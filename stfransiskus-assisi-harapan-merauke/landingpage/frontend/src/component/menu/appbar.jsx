import { NavLink, Link, useNavigate, Form } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();

  const navMenuTitle = [
    { to: "/profil-gereja", label: "Profil" },
    { to: "/pedoman-pastoral", label: "Pedoman" },
    { to: "/katekese", label: "Katekese" },
    { to: "/administratif", label: "Administratif" },
    { to: "/pengumuman", label: "Pengumuman" },
    { to: "/berita", label: "Berita" },
    { to: "/gallery", label: "Gallery" },
    // { to: "", label: "komunitas" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* NAVBAR */}
      <header className="fixed w-full top-0 z-50  bg-amber-300 border-b border-amber-600 px-5 py-4">
        <nav
          children={
            <section
              className="max-w-screen-xl mx-auto flex justify-between items-center"
              children={
                <>
                  {/* Logo */}
                  <div
                    onClick={() => {
                      navigate("/");
                      window.scrollTo(0, 0);
                    }}
                    className="cursor-pointer flex items-center gap-3"
                  >
                    <img
                      src="/saint_francis_assisi.png"
                      className="h-10 w-auto rounded-full border border-amber-800"
                      alt="Logo"
                    />
                    <div className="leading-tight">
                      <h2 className="font-serif text-[1.3em] font-medium text-gray-900">
                        Paroki St.Fransiskus Assisi
                      </h2>
                      <p className="font-serif text-[0.6em] text-gray-900 uppercase tracking-widest">
                        Harapan Makmur · Merauke, Papua Selatan
                      </p>
                    </div>
                  </div>
                  {/* List Menu */}
                  <ul
                    className="flex items-center gap-0.5 text-[0.59em] font-calibri font-semibold uppercase tracking-widest mr-2"
                    children={navMenuTitle.map((item) => (
                      <li
                        key={item.to}
                        onClick={() => window.scrollTo(0, 0)}
                        children={
                          <NavLink
                            to={item.to}
                            className={({ isActive }) =>
                              `px-2 py-2 rounded transition-colors ${
                                isActive
                                  ? "text-black bg-slate-500/30"
                                  : "text-white hover:text-gray-400 hover:bg-slate-200/40"
                              }`
                            }
                            children={item.label}
                          />
                        }
                      />
                    ))}
                  />
                </>
              }
            />
          }
        />
      </header>

      {/* CONTENT */}
      {/* bg-[#B8860B] */}
      <main className="flex-1 flex flex-col mt-17.5 min-h-screen">
        <section
          className="flex-1 w-full max-w-screen-xl mx-auto"
          children={children}
        />
      </main>
    </section>
  );
}
