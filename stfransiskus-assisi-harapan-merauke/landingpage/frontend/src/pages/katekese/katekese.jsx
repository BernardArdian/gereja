import { useState } from "react";

import OrangKudus from "./orang-kudus/orangKudus";
import Renungan from "./renungan/renungan";
import TradisiGereja from "./tradisi/tradisiGreja";
import Devosi from "./devosi/devosi";

export default function Katekese() {
  const [activeTab, setActiveTab] = useState("orang kudus");

  const renderContent = () => {
    switch (activeTab) {
      case "orang kudus":
        return <OrangKudus />;
      case "renungan":
        return <Renungan />;
      case "devosi":
        return <Devosi />;
      case "tradisi gereja":
        return <TradisiGereja />;
      default:
        return null;
    }
  };

  const katekeseSubMenu = [
    "orang kudus",
    "renungan",
    "devosi",
    "tradisi gereja",
  ];

  return (
    <section className="min-h-screen w-full bg-slate-50">
      <main className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6 sm:py-8">
        <header className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="px-4 py-5 sm:px-6">
            <p className="text-sm font-semibold text-amber-800">
              Pembinaan iman
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Katekese paroki
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Materi orang kudus, renungan, devosi, dan tradisi gereja.
            </p>
          </div>
          <nav
            aria-label="Kategori katekese"
            className="overflow-x-auto border-t border-slate-200 px-3 pt-2 sm:px-5"
          >
            <div className="flex min-w-max items-center gap-1">
              {katekeseSubMenu.map((tab) => {
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
