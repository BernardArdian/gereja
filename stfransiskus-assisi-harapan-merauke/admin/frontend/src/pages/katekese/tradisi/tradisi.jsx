import { useState, useMemo } from "react";
import {
  BookOpen,
  Search,
  History,
  Calendar,
  ArrowRight,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Edit2,
} from "lucide-react";

import Detail from "../../../component/detail";

export default function Tradisi() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 6;

  // Data dummy tradisi
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
  ]);

  const filteredTradisi = useMemo(() => {
    return tradisiData.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, tradisiData]);

  const totalPages = Math.ceil(filteredTradisi.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTradisi = filteredTradisi.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Jika ada item yang dipilih, render halaman Detail secara Fullscreen
  if (selectedItem) {
    return (
      <div className="fixed top-0 bottom-0 right-0 left-[80px] overflow-y-auto">
        <Detail
          title={selectedItem.title}
          content={selectedItem.description} // PAKAI DESCRIPTION
          image={selectedItem.image}
          date={selectedItem.period} // PAKAI PERIOD
          author="Admin Paroki"
          onBack={() => setSelectedItem(null)}
          onEdit={() => setIsModalOpen(true)}
        />
      </div>
    );
  }

  return (
    <section className="min-h-screen pb-20">
      <header className="relative w-full pt-16 pb-24 px-8 overflow-hidden rounded-2xl">
        {/* LAYER GAMBAR  */}
        <section
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `url('https://katedraljakarta.or.id/_astro/interior.CfU15dnr_Z1CCVS0.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* LAYER OVERLAY  */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* LAYER KONTEN  */}
        <section className="relative z-20 max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-[10px] uppercase tracking-widest mb-2">
              <History size={14} /> Warisan Budaya & Iman
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
              Tradisi Gereja
            </h1>
          </div>
        </section>

        {/* ICON DEKORATIF */}
        <section className="absolute top-0 right-0 opacity-20 transform translate-x-10 -translate-y-5 text-white pointer-events-none z-10">
          <BookOpen size={300} />
        </section>
      </header>

      {/* STICKY SEARCH BAR */}
      <section className="sticky top-0 z-40 -mt-8 px-6 transition-all duration-300">
        <div className="max-w-4xl mx-auto py-2">
          <div className="bg-white p-2 rounded-2xl shadow-xl shadow-indigo-950/5 border border-gray-100 flex items-center">
            <div className="relative felx-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Cari nama tradisi..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 mt-12">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {paginatedTradisi.map((item) => (
            <section
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer bg-yellow-800/60 rounded border border-gray-100 hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col"
            >
              <section className="relative aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/40 backdrop-blur-md text-[9px] font-black text-white rounded-lg tracking-widest uppercase border border-white/10">
                    {item.category}
                  </span>
                </div>
              </section>

              <section className="p-7 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-[0.8em] font-bold text-white uppercase mb-2">
                  <Calendar size={12} /> {item.period}
                </div>
                <h3 className="text-xl font-bold text-gray-800 leading-tight mb-2 group-hover:text-indigo-600/70 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-white line-clamp-2 mb-6 leading-relaxed">
                  {item.description}
                </p>

                <footer className="flex items-center justify-between pt-5 border-t border-gray-50 mt-auto">
                  <button className="cursor-pointer text-black text-[0.6em] font-black uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                    Baca <ArrowRight size={14} />
                  </button>
                  <section className="flex items-center justify-end gap-3">
                    <button
                      className="cursor-pointer p-3 bg-slate-200 rounded text-yellow-700 hover:bg-amber-600 hover:text-white transition-all active:scale-75"
                      onClick={(i) => {
                        i.stopPropagation();
                      }}
                    >
                      <Edit2 size={18} />
                    </button>

                    <button
                      className="cursor-pointer p-3 bg-slate-200 rounded text-rose-400 hover:bg-red-600 hover:text-white transition-all active:scale-75"
                      onClick={(i) => {
                        i.stopPropagation();
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </section>
                </footer>
              </section>
            </section>
          ))}
        </section>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <footer className="mt-16 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border bg-white disabled:opacity-20 hover:bg-gray-50 transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <section className="flex gap-1.5">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                      : "bg-white text-gray-400 border border-gray-100 hover:border-indigo-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </section>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2.5 rounded-xl border bg-white disabled:opacity-20 hover:bg-gray-50 transition-all shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </footer>
        )}
      </main>
    </section>
  );
}
