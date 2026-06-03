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
    <section className="w-full min-h-screen px-4">
      <header className="flex items-center justify-between  gap-4 py-4 border-b border-amber-500 mb-4">
        <section
          children={
            <>
              <h2 className="font-serif text-1xl text-gray-900">
                Katekese Paroki St.Fransiskus Assisi
              </h2>
              <p className="text-[12px] font-semibold tracking-[0.18em] uppercase text-gray-800 mb-1">
                Arsip Orang kudus, Devosi, Renugan dan Tradisi Gereja
              </p>
            </>
          }
        />

        <section>
          {/* TABS */}
          <nav
            className="flex justify-center items-center gap-0 overflow-hidden"
            onWheel={(e) => e.preventDefault()}
            children={katekeseSubMenu.map((t) => (
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
        {/* Main content */}
        <section className="min-h-[400px]" children={renderContent()} />
      </main>
    </section>
  );
}
