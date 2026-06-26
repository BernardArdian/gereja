import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboardIcon,
  NewspaperIcon,
  UsersIcon,
  BookOpenTextIcon,
  LogOutIcon,
  PanelLeftCloseIcon,
  MenuIcon,
  UserSquare2Icon,
  FolderEditIcon,
} from "lucide-react";

import LogoutModal from "../alert/logout_modal";
import StFransis from "../../../public/saint_francis_assisi.png";

export default function Layout({ children, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const location = useLocation();
  const mainRef = useRef(null);

  // Deteksi ukuran layar
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname]);

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const menuItems = [
    {
      id: "Dashboard",
      icon: LayoutDashboardIcon,
      text: "Dashboard",
      path: "/dashboard",
    },
    { id: "Umat", icon: UsersIcon, text: "Umat", path: "/umat" },
    {
      id: "Katekese",
      icon: BookOpenTextIcon,
      text: "Katekese",
      path: "/katekese",
    },
    { id: "Berita", icon: NewspaperIcon, text: "Berita", path: "/berita" },
    {
      id: "Administratif",
      icon: FolderEditIcon,
      text: "Administratif",
      path: "/administratif",
    },
    { id: "Admin", icon: UserSquare2Icon, text: "Admin", path: "/admin" },
  ];

  // Sidebar selalu fixed overlay di semua ukuran layar — tidak pernah mendorong konten
  const desktopSidebarWidth = isSidebarOpen ? "w-64" : "w-20";

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />

      <section className="relative flex h-screen w-full bg-gray-50 overflow-hidden">
        {/* Overlay — muncul di semua ukuran layar saat sidebar terbuka */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`
            fixed left-0 top-0 h-full flex flex-col z-50 shadow-xl border-r border-amber-200 bg-[#B38728]
            transition-all duration-300
            ${
              isMobile
                ? isSidebarOpen
                  ? "w-64"
                  : "w-0 overflow-hidden border-none shadow-none"
                : desktopSidebarWidth
            }
          `}
        >
          {/* Header Sidebar */}
          <header className="h-16 flex items-center border-b border-amber-300/50 shrink-0 relative">
            <div className="w-20 flex items-center justify-center shrink-0">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-1 rounded-full transition-all duration-200 focus:outline-none cursor-pointer"
              >
                <div className="h-9 w-9 overflow-hidden rounded-full border border-white/50 shadow-md flex items-center justify-center bg-white">
                  <img
                    src={StFransis}
                    alt="Logo"
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
            </div>

            {isSidebarOpen && (
              <div className="flex items-center justify-between flex-1 pr-4 animate-in fade-in duration-300">
                <span className="text-xl font-bold text-amber-950 truncate font-serif">
                  Gereja
                </span>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-amber-900 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <PanelLeftCloseIcon size={20} />
                </button>
              </div>
            )}
          </header>

          {/* Navigasi Menu */}
          <nav className="flex-1 py-3 space-y-2 font-serif overflow-y-auto no-scrollbar">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => {
                  if (isMobile || isSidebarOpen) setIsSidebarOpen(false);
                }}
                className={`group relative flex items-center h-12 transition-all duration-200 w-full
                  ${
                    location.pathname === item.path ||
                    location.pathname.startsWith(item.path + "/")
                      ? "bg-slate-500/30 text-amber-950 border-r-4 border-amber-900/60 font-bold shadow-sm"
                      : "text-white hover:bg-slate-300/40 hover:text-white"
                  }`}
              >
                <div className="w-20 h-full flex items-center justify-center shrink-0 z-20">
                  <item.icon
                    size={22}
                    strokeWidth={2.5}
                    className="transition-colors duration-200"
                  />
                </div>

                <div
                  className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    isSidebarOpen ? "w-auto opacity-100" : "w-0 opacity-0"
                  }`}
                >
                  <span className="font-medium">{item.text}</span>
                </div>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <footer className="border-t border-amber-300/50 py-3 shrink-0">
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="cursor-pointer group relative flex items-center h-9 w-full transition-all duration-300"
            >
              <div className="w-20 h-full flex items-center justify-center shrink-0 z-20 text-rose-900 group-hover:text-red-700">
                <LogOutIcon size={22} strokeWidth={2.5} />
              </div>

              <div
                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  isSidebarOpen ? "w-auto opacity-100" : "w-0 opacity-0"
                }`}
              >
                <span className="font-medium text-rose-900 group-hover:text-red-700">
                  Sign Out
                </span>
              </div>
            </button>
          </footer>
        </aside>

        {/* MOBILE TOP NAVBAR — hanya muncul di mobile */}
        {isMobile && (
          <header className="fixed top-0 left-0 right-0 h-14 bg-[#B38728] border-b border-amber-300/50 flex items-center px-4 z-30 shadow-md">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg text-amber-950 hover:bg-white/10 transition-colors"
            >
              <MenuIcon size={22} />
            </button>
            <div className="flex items-center gap-2 ml-3">
              <div className="h-8 w-8 overflow-hidden rounded-full border border-white/50 shadow-sm bg-white flex items-center justify-center">
                <img
                  src={StFransis}
                  alt="Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-base font-bold text-amber-950 font-serif">
                Gereja
              </span>
            </div>
          </header>
        )}

        {/* KONTEN UTAMA */}
        <main
          ref={mainRef}
          className={`
            flex-1 h-screen overflow-y-auto overflow-x-hidden transition-all duration-300
            ${isMobile ? "pl-0 pt-14" : "pl-20"}
          `}
        >
          <div className="w-full h-full">{children}</div>
        </main>

        <LogoutModal
          isOpen={isLogoutModalOpen}
          onClose={handleLogout}
          onConfirm={onLogout}
        />
      </section>
    </>
  );
}
