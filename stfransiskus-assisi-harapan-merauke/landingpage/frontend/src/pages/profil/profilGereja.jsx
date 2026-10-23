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
    <section className="min-h-screen w-full bg-slate-50">
      <main className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6 sm:py-8">
        <header className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="px-4 py-5 sm:px-6">
            <p className="text-sm font-semibold text-amber-800">Profil paroki</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Paroki St. Fransiskus Assisi
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Kenali sejarah, visi dan misi, serta dewan pastoral paroki.
            </p>
          </div>
          <nav
            aria-label="Bagian profil paroki"
            className="overflow-x-auto border-t border-slate-200 px-3 pt-2 sm:px-5"
          >
            <div className="flex min-w-max items-center gap-1">
              {profileSubMenu.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setActiveTab(tab)}
                    className={`relative cursor-pointer whitespace-nowrap rounded-t-lg px-4 py-3 text-sm font-medium capitalize transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-600 ${
                      isActive
                        ? "text-amber-900"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {tab}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-amber-700"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        </header>
        <section className="min-h-[400px]" aria-live="polite">
          {renderContent()}
        </section>
      </main>
    </section>
  );
}
