import { useState } from "react";

import VisiMisiGereja from "./visi-misi/visiMisi";
import SejarahGereja from "./sejarah/sejarah";
import DewanPastoralParoki from "./dewan-pastoral/dewanPastoral";

export default function ProfilGereja() {
  const [activeTab, setActiveTab] = useState("sejarah gereja");

  const renderContent = () => {
    switch (activeTab) {
      case "sejarah gereja":
        return <SejarahGereja />;
      case "visi & misi":
        return <VisiMisiGereja />;
      case "dewan pengurus":
        return <DewanPastoralParoki />;
      default:
        return null;
    }
  };

  return (
    <section className="w-full px-4">
      <main className="max-w-5xl mx-auto">
        {/* HEADER */}
        <header className="py-4 border-b border-amber-500 mb-4">
          <h2 className="font-serif text-2xl text-gray-900">
            Profil Gereja Paroki St. Fransiskus Assisi
          </h2>
          <p className="text-[12px] font-medium tracking-[0.18em] uppercase text-gray-800 mb-1">
            Arsip Sejarah, Fisi & Misi Dan Dewan Pastoral Paroki
          </p>
        </header>

        {/* TABS */}
        <nav className="flex justify-center items-center gap-0 mb-10 overflow-hidden">
          {["sejarah gereja", "visi & misi", "dewan pengurus"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`cursor-pointer px-6 py-3 text-[16px] font-serif font-medium uppercase tracking-widest whitespace-nowrap transition-colors border-b-4 -mb-px ${
                activeTab === t
                  ? "border-gray-600 text-gray-900"
                  : "border-transparent text-gray-100 hover:text-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        {/* CONTENT */}
        <section className="min-h-[400px] px-15">{renderContent()}</section>
      </main>
    </section>
  );
}
