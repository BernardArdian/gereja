import { useEffect, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Filter,
  Images,
  MapPin,
  Maximize2,
  Search,
  X,
} from "lucide-react";
import CustomDropdown from "../../component/option/dropdown";

const galleryItems = [
  {
    id: 3,
    url: "https://picsum.photos/seed/gal1/1000/1000",
    title: "Misa Minggu",
    date: "20 Jan 2024",
    stasi: "Harapan",
  },
  {
    id: 4,
    url: "https://picsum.photos/seed/gal2/1000/1000",
    title: "Kegiatan OMK",
    date: "15 Jan 2024",
    stasi: "Kurik",
  },
  {
    id: 5,
    url: "https://picsum.photos/seed/gal3/1000/1000",
    title: "Bakti Sosial",
    date: "10 Jan 2024",
    stasi: "Harapan",
  },
  {
    id: 6,
    url: "https://picsum.photos/seed/gal4/1000/1000",
    title: "Pembangunan Gereja",
    date: "05 Jan 2024",
    stasi: "Kurik",
  },
  {
    id: 7,
    url: "https://picsum.photos/seed/gal5/1000/1000",
    title: "Kegiatan Umat",
    date: "02 Jan 2024",
    stasi: "Candra",
  },
];

const stasiOptions = [
  { value: "Semua", label: "Semua stasi" },
  { value: "Harapan", label: "Paroki Harapan" },
  { value: "Kurik", label: "Stasi Kurik" },
  { value: "Candra", label: "Stasi Candra" },
];

export default function GalleryGereja() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [stasiFilter, setStasiFilter] = useState(
    () => localStorage.getItem("galleryStasiFilter") || "Semua",
  );
  const itemsPerPage = 6;

  useEffect(() => {
    localStorage.setItem("galleryStasiFilter", stasiFilter);
  }, [stasiFilter]);

  useEffect(() => {
    if (!selectedImage) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  const query = searchQuery.trim().toLowerCase();
  const filteredData = galleryItems.filter((item) => {
    const matchesStasi = stasiFilter === "Semua" || item.stasi === stasiFilter;
    const matchesSearch =
      !query ||
      `${item.title} ${item.stasi} ${item.date}`.toLowerCase().includes(query);
    return matchesStasi && matchesSearch;
  });
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const page = Math.min(currentPage, Math.max(totalPages, 1));
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  return (
    <section className="min-h-screen w-full bg-slate-50">
      <main className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6 sm:py-8">
        <header className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800">
              <Images size={17} aria-hidden="true" />
              Arsip visual paroki
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Galeri kegiatan
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
              Momen perayaan dan pelayanan umat di Paroki St. Fransiskus Assisi.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-xl">
            <label className="relative min-w-0 flex-1">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Cari foto galeri"
                placeholder="Cari kegiatan atau stasi..."
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100"
              />
            </label>
            <div className="relative flex items-center">
              <Filter
                className="pointer-events-none absolute left-3 z-10 text-slate-400"
                size={16}
                aria-hidden="true"
              />
              <CustomDropdown
                value={stasiFilter}
                onChange={(value) => {
                  setStasiFilter(value);
                  setCurrentPage(1);
                }}
                options={stasiOptions}
              />
            </div>
          </div>
        </header>

        <section className="flex items-center justify-between px-1">
          <h2 className="text-sm font-semibold text-slate-800">
            Foto dan kegiatan
          </h2>
          <p className="text-xs text-slate-500">
            {filteredData.length} {filteredData.length === 1 ? "foto" : "foto"}
          </p>
        </section>

        {paginatedData.length > 0 ? (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedData.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-lg"
              >
                <button
                  type="button"
                  onClick={() => setSelectedImage(item)}
                  aria-label={`Perbesar foto: ${item.title}`}
                  className="relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-slate-100 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-600"
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-slate-950/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                    Stasi {item.stasi}
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-lg bg-white/90 p-2 text-slate-800 opacity-0 shadow transition group-hover:opacity-100">
                    <Maximize2 size={16} aria-hidden="true" />
                  </span>
                </button>
                <div className="p-4 sm:p-5">
                  <h3 className="text-base font-semibold text-slate-900 transition group-hover:text-amber-900">
                    {item.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={14} aria-hidden="true" />
                      {item.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} aria-hidden="true" />
                      {item.stasi}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-500">
            <Search size={36} className="mx-auto mb-3 text-slate-300" />
            <h2 className="text-sm font-semibold text-slate-700">
              Foto tidak ditemukan
            </h2>
            <p className="mt-1 text-xs">
              Ubah kata kunci pencarian atau filter stasi.
            </p>
          </section>
        )}

        {totalPages > 1 && (
          <footer className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">
              Menampilkan {paginatedData.length} dari {filteredData.length} foto
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentPage((current) => Math.max(1, current - 1))}
                disabled={page === 1}
                aria-label="Halaman sebelumnya"
                className="cursor-pointer rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={15} />
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setCurrentPage(pageNumber)}
                    aria-current={page === pageNumber ? "page" : undefined}
                    className={`h-9 min-w-9 cursor-pointer rounded-lg px-2 text-xs font-semibold transition ${
                      page === pageNumber
                        ? "bg-amber-700 text-white"
                        : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ),
              )}
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((current) => Math.min(totalPages, current + 1))
                }
                disabled={page === totalPages}
                aria-label="Halaman berikutnya"
                className="cursor-pointer rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </footer>
        )}
      </main>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={() => setSelectedImage(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label={`Foto ${selectedImage.title}`}
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              aria-label="Tutup foto"
              className="absolute right-3 top-3 z-10 rounded-xl bg-slate-950/60 p-2.5 text-white transition hover:bg-slate-950/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X size={20} />
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-h-[78vh] w-full bg-slate-950 object-contain"
            />
            <div className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <h2 className="font-semibold text-slate-900">
                {selectedImage.title}
              </h2>
              <p className="text-sm text-slate-500">
                {selectedImage.date} · Stasi {selectedImage.stasi}
              </p>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
