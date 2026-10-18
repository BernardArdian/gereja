import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Newspaper,
  BookOpenCheck,
  LogOutIcon,
  PanelLeftCloseIcon,
  MenuIcon,
  ShieldCheck,
  Files,
  Moon,
  Sun,
} from "lucide-react";

import LogoutModal from "../alert/logout_modal";
import StFransis from "../../../public/saint_francis_assisi.png";

const THEME_STORAGE_KEY = "admin-theme";

export default function Layout({ children, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    () => window.localStorage.getItem(THEME_STORAGE_KEY) === "dark",
  );

  const location = useLocation();
  const mainRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    document.documentElement.style.colorScheme = isDarkMode ? "dark" : "light";
    window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    onLogout?.();
  };

  const menuItems = [
    {
      id: "Dashboard",
      icon: LayoutDashboard,
      text: "Dashboard",
      path: "/dashboard",
    },
    { id: "Umat", icon: Users, text: "Umat", path: "/umat" },
    {
      id: "Katekese",
      icon: BookOpenCheck,
      text: "Katekese",
      path: "/katekese",
    },
    { id: "Berita", icon: Newspaper, text: "Berita", path: "/berita" },
    {
      id: "Administratif",
      icon: Files,
      text: "Administratif",
      path: "/administratif",
    },
    { id: "Admin", icon: ShieldCheck, text: "Admin", path: "/admin" },
  ];

  const desktopSidebarWidth = isSidebarOpen ? "w-64" : "w-20";
  const themeLabel = isDarkMode ? "Mode gelap" : "Mode terang";

  return (
    <section className="relative flex h-dvh w-full overflow-hidden bg-gray-50 transition-colors">
      {isMobile && isSidebarOpen && (
        <button
          type="button"
          aria-label="Tutup menu navigasi"
          className="fixed inset-0 z-40 cursor-pointer bg-black/40 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        aria-label="Navigasi utama"
        className={`fixed left-0 top-0 z-50 flex h-dvh flex-col overflow-hidden border-r border-amber-300/50 bg-[#B38728] shadow-xl transition-all duration-300 ${
          isMobile
            ? isSidebarOpen
              ? "w-72 max-w-[calc(100vw-2rem)]"
              : "w-0 border-none shadow-none"
            : desktopSidebarWidth
        }`}
      >
        <header className="relative flex h-16 shrink-0 items-center border-b border-amber-300/50">
          <div className="flex w-20 shrink-0 items-center justify-center">
            <button
              type="button"
              aria-label={isSidebarOpen ? "Ciutkan menu" : "Perluas menu"}
              aria-expanded={isSidebarOpen}
              onClick={() => setIsSidebarOpen((open) => !open)}
              className="cursor-pointer rounded-full p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/50 bg-white shadow-md">
                <img
                  src={StFransis}
                  alt="Logo Gereja"
                  className="h-full w-full object-cover"
                />
              </span>
            </button>
          </div>

          {isSidebarOpen && (
            <div className="flex min-w-0 flex-1 animate-in items-center justify-between pr-4 fade-in duration-300">
              <span className="truncate font-serif text-xl font-bold text-amber-950">
                Gereja
              </span>
              <button
                type="button"
                aria-label="Ciutkan menu"
                onClick={() => setIsSidebarOpen(false)}
                className="cursor-pointer rounded-lg p-1.5 text-amber-950 transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <PanelLeftCloseIcon size={20} aria-hidden="true" />
              </button>
            </div>
          )}
        </header>

        <nav
          aria-label="Menu utama"
          className="sidebar-scroll-area flex-1 space-y-2 overflow-x-hidden overflow-y-auto py-3 font-serif"
        >
          {menuItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              location.pathname.startsWith(`${item.path}/`);
            return (
              <Link
                key={item.id}
                to={item.path}
                aria-current={isActive ? "page" : undefined}
                onClick={() => {
                  if (isMobile || isSidebarOpen) setIsSidebarOpen(false);
                }}
                title={!isSidebarOpen ? item.text : undefined}
                className={`group relative flex h-12 w-full items-center border-r-4 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white ${
                  isActive
                    ? "border-amber-950/70 bg-slate-950/15 font-bold text-amber-950 shadow-sm"
                    : "border-transparent text-white hover:bg-slate-950/10"
                }`}
              >
                <span className="z-10 flex h-full w-20 shrink-0 items-center justify-center">
                  <item.icon size={22} strokeWidth={2.25} aria-hidden="true" />
                </span>
                <span
                  className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                    isSidebarOpen ? "w-auto opacity-100" : "w-0 opacity-0"
                  }`}
                >
                  {item.text}
                </span>
              </Link>
            );
          })}
        </nav>

        <footer className="shrink-0 space-y-1 border-t border-amber-300/50 py-3">
          <button
            type="button"
            role="switch"
            aria-checked={isDarkMode}
            aria-label={`Tema: ${themeLabel}. Aktifkan untuk beralih tema.`}
            title={themeLabel}
            onClick={() => setIsDarkMode((dark) => !dark)}
            className="group flex min-h-11 w-full cursor-pointer items-center text-amber-950 transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
          >
            <span className="flex h-11 w-20 shrink-0 items-center justify-center">
              {isDarkMode ? (
                <Moon size={21} aria-hidden="true" />
              ) : (
                <Sun size={21} aria-hidden="true" />
              )}
            </span>
            {isSidebarOpen && (
              <span className="flex min-w-0 flex-1 items-center justify-between gap-3 pr-4 text-left text-sm font-medium">
                <span>{themeLabel}</span>
                <span
                  aria-hidden="true"
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    isDarkMode ? "bg-slate-900" : "bg-amber-950/30"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      isDarkMode ? "translate-x-[22px]" : "translate-x-0.5"
                    }`}
                  />
                </span>
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsLogoutModalOpen(true)}
            className="group flex h-10 w-full cursor-pointer items-center text-rose-950 transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
          >
            <span className="flex h-full w-20 shrink-0 items-center justify-center">
              <LogOutIcon size={21} strokeWidth={2.25} aria-hidden="true" />
            </span>
            {isSidebarOpen && (
              <span className="text-sm font-medium">Keluar</span>
            )}
          </button>
        </footer>
      </aside>

      {isMobile && (
        <header className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center border-b border-amber-300/50 bg-[#B38728] px-4 shadow-md">
          <button
            type="button"
            aria-label="Buka menu navigasi"
            aria-expanded={isSidebarOpen}
            onClick={() => setIsSidebarOpen(true)}
            className="cursor-pointer rounded-lg p-2 text-amber-950 transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <MenuIcon size={22} aria-hidden="true" />
          </button>
          <div className="ml-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/50 bg-white shadow-sm">
              <img
                src={StFransis}
                alt=""
                className="h-full w-full object-cover"
              />
            </span>
            <span className="font-serif text-base font-bold text-amber-950">
              Gereja
            </span>
          </div>
        </header>
      )}

      <main
        ref={mainRef}
        className={`h-dvh min-w-0 flex-1 overflow-x-hidden overflow-y-auto transition-[padding] duration-300 ${
          isMobile ? "pt-14" : isSidebarOpen ? "pl-64" : "pl-20"
        }`}
      >
        <div className="min-h-full w-full">{children}</div>
      </main>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </section>
  );
}
