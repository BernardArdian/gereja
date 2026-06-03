import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Plus } from "lucide-react";

import KatekeseInput from "../../component/katekese/input/inputForm";
import Devosi from "./devosi/devosi";
import Renungan from "./renungan/renungan";
import OrangKudus from "./orang-kudus/orang_kudus";
import Tradisi from "./tradisi/tradisi";

export default function Katekese() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("orang kudus");

  const navTittle = ["orang kudus", "renungan", "devosi", "tradisi gereja"];

  const renderContent = () => {
    switch (activeTab) {
      case "orang kudus":
        return <OrangKudus />;
      case "renungan":
        return <Renungan />;
      case "devosi":
        return <Devosi />;
      case "tradisi gereja":
        return <Tradisi />;
      default:
        return null;
    }
  };

  return (
    <section className="w-full pl-0.5 pr-0.5 ">
      <main className="max-w-5xl mx-auto  ">
        <section className="bg-gray-500/30 h-full p-2">
          {/* HEADER TITTLE*/}
          <header className="relative z-20 max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-5">
            <form className="flex items-center gap-4">
              <section>
                <h2 className="text-xl font-serif text-gray-900 tracking-tight">
                  Katekese Paroki St.Fransiskus Assisi.
                </h2>
                <p className="text-[10px] font-serif text-gray-900 uppercase tracking-widest">
                  Arsip Katekese Paroki
                </p>
              </section>
            </form>

            <button
              className="flex cursor-pointer items-center text-white gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-500/20 text-indigo-900 
               hover:text-blue-600 rounded-xl text-xs font-black transition-all active:scale-95 w-fit"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={18} /> Tambah Katekese
            </button>
          </header>

          {/* TABS HEADER */}
          <section className="w-full max-w-full mb-10 overflow-hidden bg-slate-500/40 rounded backdrop-blur-sm p-2">
            <nav className="flex justify-center items-center gap-2 overflow-x-auto no-scrollbar select-none relative">
              {navTittle.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`
          cursor-pointer relative px-6 py-3 text-[13px] font-serif uppercase tracking-widest rounded-xl transition-colors duration-300 
          whitespace-nowrap flex-shrink-0 z-10
          ${activeTab === t ? "text-white" : "text-black hover:text-white  hover:bg-blue-500/20"}
        `}
                >
                  {/* TEKS MENU */}
                  <span className="relative z-20">{t}</span>

                  {/* ANIMASI BACKGROUND SLIDING EFFECT */}
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
          <section className="min-h-[400px]">
            <section>{renderContent()}</section>
          </section>
        </section>
      </main>

      <KatekeseInput
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
