import { useState, useMemo } from "react";
import {
  Search,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Pagination from "../../../component/common/Pagination";
import DetailBerita from "../../../component/detail/detailBerita";

export default function TradisiGereja() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const itemsPerPage = 6;

  const [tradisiData] = useState([
    {
      id: 1,
      title: "Perarakan Patung Maria",
      location: "Gereja Pusat",
      period: "Mei & Oktober",
      description:
        "Tradisi doa Rosario keliling lingkungan setiap malam di bulan Maria.",
      image: "https://picsum.photos/seed/maria/800/600",
      category: "LITURGI",
    },
    {
      id: 2,
      title: "Pesta Pelindung Paroki",
      location: "Pusat Paroki",
      period: "15 Agustus",
      description: "Perayaan syukur pelindung paroki dengan pesta rakyat.",
      image: "https://picsum.photos/seed/pesta/800/600",
      category: "BUDAYA",
    },
    {
      id: 3,
      title: "Misa Inkulturasi",
      location: "Stasi Kurik",
      period: "Acara Khusus",
      description: "Perpaduan tata gerak musik tradisional dalam Ekaristi.",
      image: "https://picsum.photos/seed/culture/800/600",
      category: "BUDAYA",
    },
    {
      id: 4,
      title: "Visualisasi Jalan Salib",
      location: "Pusat Paroki",
      period: "Jumat Agung",
      description: "Tablo kisah sengsara Yesus Kristus oleh OMK.",
      image: "https://picsum.photos/seed/salib/800/600",
      category: "LITURGI",
    },
    {
      id: 5,
      title: "Pemberkatan Benih",
      location: "Stasi Harapan",
      period: "Musim Tanam",
      description: "Syukur atas hasil bumi dan pemberkatan bibit tani.",
      image: "https://picsum.photos/seed/seed/800/600",
      category: "SOSIAL",
    },
    {
      id: 6,
      title: "Api Unggun Paskah",
      location: "Seluruh Stasi",
      period: "Vigili Paskah",
      description: "Tradisi penyalaan lilin Paskah dari api suci.",
      image: "https://picsum.photos/seed/fire/800/600",
      category: "LITURGI",
    },
    {
      id: 7,
      title: "Perarakan Patung Maria",
      location: "Gereja Pusat",
      period: "Mei & Oktober",
      description:
        "Tradisi doa Rosario keliling lingkungan setiap malam di bulan Maria.",
      image: "https://picsum.photos/seed/maria/800/600",
      category: "LITURGI",
    },
    {
      id: 8,
      title: "Pesta Pelindung Paroki",
      location: "Pusat Paroki",
      period: "15 Agustus",
      description: "Perayaan syukur pelindung paroki dengan pesta rakyat.",
      image: "https://picsum.photos/seed/pesta/800/600",
      category: "BUDAYA",
    },
    {
      id: 9,
      title: "Misa Inkulturasi",
      location: "Stasi Kurik",
      period: "Acara Khusus",
      description: "Perpaduan tata gerak musik tradisional dalam Ekaristi.",
      image: "https://picsum.photos/seed/culture/800/600",
      category: "BUDAYA",
    },
    {
      id: 10,
      title: "Visualisasi Jalan Salib",
      location: "Pusat Paroki",
      period: "Jumat Agung",
      description: "Tablo kisah sengsara Yesus Kristus oleh OMK.",
      image: "https://picsum.photos/seed/salib/800/600",
      category: "LITURGI",
    },
    {
      id: 11,
      title: "Pemberkatan Benih",
      location: "Stasi Harapan",
      period: "Musim Tanam",
      description: "Syukur atas hasil bumi dan pemberkatan bibit tani.",
      image: "https://picsum.photos/seed/seed/800/600",
      category: "SOSIAL",
    },
    {
      id: 12,
      title: "Api Unggun Paskah",
      location: "Seluruh Stasi",
      period: "Vigili Paskah",
      description: "Tradisi penyalaan lilin Paskah dari api suci.",
      image: "https://picsum.photos/seed/fire/800/600",
      category: "LITURGI",
    },
  ]);

  const filteredData = useMemo(
    () =>
      tradisiData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery, tradisiData],
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (selectedItem) {
    return (
      <DetailBerita
        item={selectedItem}
        type="tradisi"
        onBack={() => setSelectedItem(null)}
      />
    );
  }

  return (
    <section className="w-full min-w-0 pb-8 sm:pb-12">
      {/* HERO */}
      <header className="relative mb-6 min-h-52 w-full overflow-hidden rounded-2xl sm:mb-8">
        <img
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `url('https://katedraljakarta.or.id/_astro/interior.CfU15dnr_Z1CCVS0.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <section className="relative z-20 flex min-h-52 flex-col justify-between gap-6 p-5 sm:flex-row sm:items-end sm:p-8">
          <section>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              Warisan Budaya & Iman
            </p>
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              Tradisi Gereja
            </h2>
          </section>

          {/* SEARCH */}
          <section className="w-full sm:max-w-sm">
            <div className="relative">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Cari tradisi gereja"
                placeholder="Cari nama tradisi..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl border border-white/70 bg-white/95 py-2.5 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-300 focus:ring-2 focus:ring-amber-100"
              />
            </div>
          </section>
        </section>
      </header>

      {/* GRID */}
      <main className="px-1 pb-8 sm:px-2">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        children=
          {paginatedData.length === 0 && (
            <p className="col-span-full rounded-xl border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
              Tidak ada tradisi yang cocok dengan pencarian.
            </p>
          ),
          paginatedData.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <section className="relative aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4">
                  <span className="rounded-lg border border-white/10 bg-black/40 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white backdrop-blur-md">
                    {item.category}
                  </span>
                </div>
              </section>
              <section className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-amber-800">
                  <Calendar size={12} aria-hidden="true" /> {item.period}
                </div>
                <h3 className="mb-2 break-words text-lg font-bold leading-tight text-slate-900 transition-colors group-hover:text-amber-800 sm:text-xl">
                  {item.title}
                </h3>
                <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
                <footer className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-2 text-xs font-semibold text-amber-800 transition hover:bg-amber-50"
                  >
                    Baca <ArrowRight size={14} />
                  </button>
                </footer>
              </section>
            </div>
          ))}
        >
        </section>
      </main>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemCount={paginatedData.length}
          totalCount={filteredData.length}
          itemLabel="tradisi gereja"
          className="mt-4"
        />
      )}
    </section>
  );
}
