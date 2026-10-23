import { useMemo, useState } from "react";
import { BookOpen, Calendar, ChevronDown, FileText, Search } from "lucide-react";

const pedomanList = [
  {
    id: 1,
    title: "Tata Cara Baptis Bayi",
    category: "Sakramen",
    updatedAt: "2024-01-15",
    content:
      "Persyaratan administrasi meliputi fotokopi surat nikah gereja orang tua, kartu keluarga paroki, dan dokumen pendukung lainnya. Silakan menghubungi sekretariat untuk konfirmasi jadwal.",
  },
  {
    id: 2,
    title: "Prosedur Peminjaman Aula",
    category: "Umum",
    updatedAt: "2024-02-10",
    content:
      "Pemesanan aula dilakukan minimal satu bulan sebelum hari pelaksanaan melalui sekretariat paroki.",
  },
  {
    id: 3,
    title: "Alur Pendaftaran Krisma",
    category: "Sakramen",
    updatedAt: "2024-03-01",
    content:
      "Calon penerima Krisma minimal berusia 14 tahun atau sudah duduk di bangku SMP. Jadwal persiapan diumumkan melalui paroki.",
  },
];

const categories = ["Semua", "Sakramen", "Umum", "Liturgi", "Keuangan"];

export default function Pedoman() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [openAccordion, setOpenAccordion] = useState(null);

  const filteredPedoman = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return pedomanList.filter((item) => {
      const matchesCategory =
        selectedCategory === "Semua" || item.category === selectedCategory;
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section className="min-h-screen w-full bg-slate-50">
      <main className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6 sm:py-8">
        <header className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div>
            <p className="text-sm font-semibold text-amber-800">
              Manajemen aturan & prosedur
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Pedoman pastoral
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Pedoman iman dan tata cara pelayanan Paroki St. Fransiskus Assisi.
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 md:flex-row">
            <label className="relative block min-w-0 flex-1">
              <span className="sr-only">Cari pedoman</span>
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={17}
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Cari judul atau isi pedoman"
                className="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100"
              />
            </label>
            <div
              className="flex min-w-0 gap-2 overflow-x-auto pb-1"
              aria-label="Filter kategori"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-10 shrink-0 cursor-pointer rounded-lg border px-3 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 ${
                    selectedCategory === category
                      ? "border-amber-700 bg-amber-700 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="space-y-3" aria-label="Daftar pedoman pastoral">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-semibold text-slate-800">
              Daftar pedoman
            </h2>
            <span className="text-xs text-slate-500">
              {filteredPedoman.length.toLocaleString("id-ID")} item
            </span>
          </div>
          {filteredPedoman.length ? (
            filteredPedoman.map((item) => {
              const isOpen = openAccordion === item.id;
              const panelId = `pedoman-content-${item.id}`;

              return (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="flex items-start gap-3 p-4 sm:items-center sm:p-5">
                    <span className="shrink-0 rounded-xl bg-amber-50 p-2.5 text-amber-800">
                      <FileText size={19} aria-hidden="true" />
                    </span>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() =>
                        setOpenAccordion(isOpen ? null : item.id)
                      }
                      className="min-w-0 flex-1 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
                    >
                      <span className="block wrap-break-word text-sm font-semibold text-slate-900">
                        {item.title}
                      </span>
                      <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-700">
                          {item.category}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={13} aria-hidden="true" />
                          Diperbarui {item.updatedAt}
                        </span>
                      </span>
                    </button>
                    <button
                      type="button"
                      aria-label={isOpen ? "Tutup isi pedoman" : "Buka isi pedoman"}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() =>
                        setOpenAccordion(isOpen ? null : item.id)
                      }
                      className="shrink-0 cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
                    >
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  {isOpen && (
                    <div
                      id={panelId}
                      className="border-t border-slate-100 bg-slate-50 px-4 py-4 sm:px-5 sm:py-5"
                    >
                      <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
                        {item.content}
                      </p>
                    </div>
                  )}
                </article>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-12 text-center">
              <BookOpen
                size={27}
                className="mx-auto text-slate-400"
                aria-hidden="true"
              />
              <p className="mt-3 text-sm font-semibold text-slate-800">
                Pedoman tidak ditemukan
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Coba ubah kata pencarian atau filter kategori.
              </p>
            </div>
          )}
        </section>
      </main>
    </section>
  );
}
