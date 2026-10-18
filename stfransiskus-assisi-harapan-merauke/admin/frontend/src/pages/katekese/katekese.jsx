import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import KatekeseInput from "../../component/katekese/input/inputForm";
import Devosi from "./devosi/devosi";
import Renungan from "./renungan/renungan";
import OrangKudus from "./orang-kudus/orang_kudus";
import Tradisi from "./tradisi/tradisi";

const katekeseTabs = [
  { label: "Orang kudus", slug: "orang-kudus", content: OrangKudus },
  { label: "Renungan", slug: "renungan", content: Renungan },
  { label: "Devosi", slug: "devosi", content: Devosi },
  { label: "Tradisi gereja", slug: "tradisi-gereja", content: Tradisi },
];

export default function Katekese() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { tab } = useParams();
  const activeTab =
    katekeseTabs.find(
      (item) =>
        item.slug === tab ||
        item.label.toLowerCase() ===
          tab?.replace(/-/g, " ").toLowerCase(),
    ) ?? katekeseTabs[0];
  const ActiveContent = activeTab.content;

  return (
    <section className="min-h-full w-full bg-slate-50">
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-amber-700">
              Pembinaan iman
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Katekese paroki
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Kelola materi orang kudus, renungan, devosi, dan tradisi gereja.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex w-fit cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 active:scale-[0.98]"
          >
            <Plus size={18} aria-hidden="true" />
            Tambah Katekese
          </button>
        </header>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <nav
            aria-label="Kategori katekese"
            className="overflow-x-auto border-b border-slate-200 px-3 pt-3 sm:px-5"
          >
            <div className="flex min-w-max items-center gap-1">
              {katekeseTabs.map((item) => {
                const isActive = activeTab.slug === item.slug;

                return (
                  <button
                    key={item.slug}
                    type="button"
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => navigate(`/katekese/${item.slug}`)}
                    className={`relative cursor-pointer whitespace-nowrap rounded-t-lg px-4 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-600 ${
                      isActive
                        ? "text-amber-900"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <Motion.span
                        layoutId="katekese-active-tab"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-t-lg bg-amber-50"
                        transition={{
                          type: "spring",
                          bounce: 0.15,
                          duration: 0.35,
                        }}
                      />
                    )}
                    {isActive && (
                      <Motion.span
                        layoutId="katekese-active-indicator"
                        aria-hidden="true"
                        className="absolute inset-x-3 bottom-0 z-20 h-0.5 rounded-full bg-amber-700"
                        transition={{
                          type: "spring",
                          bounce: 0.15,
                          duration: 0.35,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          <section
            aria-label={activeTab.label}
            className="min-h-72 p-4 sm:p-6"
          >
            <ActiveContent />
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
