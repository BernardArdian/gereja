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

  const profileSubMenu = ["sejarah gereja", "visi & misi", "dewan pengurus"];

  return (
    <section className="w-full px-4">
      {/* HEADER */}
      <header className="flex items-center justify-between  gap-4 py-4 border-b border-amber-500 mb-4">
        <section
          children={
            <>
              <h2 className="font-serif text-1xl text-gray-900">
                Porfil Paroki St. Fransiskus Assisi
              </h2>
              <p className="text-[12px] font-semibold tracking-[0.18em] uppercase text-gray-800 mb-1">
                Arsip sejarah, visi & misi dan dewan pastoral
              </p>
            </>
          }
        />

        <section>
          {/* TABS */}
          <nav
            className="flex justify-center items-center gap-0 overflow-hidden"
            onWheel={(e) => e.preventDefault()}
            children={profileSubMenu.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`cursor-pointer px-6 py-3 text-[12px] font-serif font-medium uppercase tracking-widest whitespace-nowrap transition-colors border-b-4 -mb-px ${
                  activeTab === t
                    ? "border-gray-600 text-gray-900"
                    : "border-transparent text-gray-100 hover:text-gray-700"
                }`}
                children={t}
              />
            ))}
          />
        </section>
      </header>
      <main className="max-w-5xl mx-auto">
        {/* CONTENT */}
        <section className="min-h-[400px] px-15" children={renderContent()} />
      </main>
    </section>
  );
}
