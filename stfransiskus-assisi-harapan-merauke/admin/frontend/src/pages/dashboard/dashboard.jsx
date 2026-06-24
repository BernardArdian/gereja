import { useState } from "react";
import KontakDanLokasi from "./kontak-dan-lokasi/kontak-dan-lokasi";
import Pengumuman from "./pengumuman/pengumuman";
import Thumbnail from "./thumbnail/thumbnail";
import SejarahGereja from "./sejarah/sejarahgereja";
import VisiMisi from "./visi-dan-misi/visimisi";
import Pedoman from "./pedoman/pedoman";
import CalendarPage from "./kalender/kalender";
import { motion as Motion } from "framer-motion";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("thumbnail & gallery");

  const navTitle = [
    "thumbnail & gallery",
    "sejarah gereja",
    "visi & misi",
    "pedoman pastoral",
    "pengumuman",
    "alamat, kontak & lokasi",
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "thumbnail & gallery":
        return <Thumbnail />;
      case "sejarah gereja":
        return <SejarahGereja />;
      case "visi & misi":
        return <VisiMisi />;
      case "pengumuman":
        return <Pengumuman />;
      case "pedoman pastoral":
        return <Pedoman />;
      case "alamat, kontak & lokasi":
        return <KontakDanLokasi />;
      default:
        return null;
    }
  };

  return (
    <section className="w-full min-h-screen pl-0.5 pr-0.5 ">
      <main className="max-w-5xl mx-auto">
        <div className="bg-gray-500/30 shadow-sm h-full p-2">
          {/* HEADER TITTLE*/}
          <header className="mb-5">
            <section className="flex items-center gap-4">
              <div>
                <h2 className="text-xl font-serif text-gray-900 tracking-tight">
                  Dashboard Paroki St.Fransiskus Assisi.
                </h2>
                <p className="text-[10px] font-serif text-gray-900 uppercase tracking-widest">
                  Thumbnail, Gallery, Sejarah, Visi Misi, Pedoman Pasotral,
                  Pengumuman, Alamat & kontak
                </p>
              </div>
            </section>
          </header>

          {/* TABS HEADER */}
          <section className="w-full max-w-full mb-10 overflow-hidden bg-slate-500/40 rounded backdrop-blur-sm p-2">
            <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar select-none relative">
              {navTitle.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`
          cursor-pointer relative px-6 py-3 text-[13px] font-serif uppercase tracking-widest rounded-xl transition-colors duration-300 
          whitespace-nowrap flex-shrink-0 z-10
          ${activeTab === t ? "text-white" : "text-gray-900 hover:bg-blue-500/20 hover:text-white"}
        `}
                >
                  {/* TEKS MENU */}
                  <span className="relative z-20">{t}</span>

                  {/* ANIMASI BACKGROUND PUTIH (SLIDING EFFECT) */}
                  {activeTab === t && (
                    <Motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-500/70 rounded-xl z-10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </section>
          {/* AREA KONTEN */}
          <section className="min-h-screen">
            <section>{renderContent()}</section>
          </section>
        </div>
      </main>
    </section>
  );
}
