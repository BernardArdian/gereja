import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function TradisiGereja() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [setSelectedItem] = useState(null);
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

  return (
    <section className="min-h-screen pb-12">
      {/* HERO */}
      <header className="relative w-full h-48 overflow-hidden rounded mb-8">
        <img
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `url('https://katedraljakarta.or.id/_astro/interior.CfU15dnr_Z1CCVS0.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <section className="h-full flex flex-row justify-between">
          <section className="relative z-20 h-full flex flex-col justify-end p-8">
            <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-white/50 mb-1">
              Warisan Budaya & Iman
            </p>
            <h1 className="font-serif text-3xl text-white">Tradisi Gereja</h1>
          </section>

          {/* SEARCH */}
          <section className="relative z-20 h-full flex flex-col justify-end p-8">
            <form className="relative border rounded border-gray-100">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                size={14}
              />
              <input
                type="text"
                placeholder="Cari nama tradisi..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 border border-gray-100 rounded text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gray-300 transition-all bg-white"
              />
            </form>
          </section>
        </section>
      </header>

      {/* GRID */}
      <section className="px-15">
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 border border-gray-100 rounded overflow-hidden">
          {paginatedData.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-gray-100/50 hover:bg-slate-200/60 transition-colors cursor-pointer flex flex-col group overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-2 py-1 bg-black/40 backdrop-blur-sm text-[9px] font-medium text-white uppercase tracking-widest">
                  {item.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">
                  {item.period}
                </p>
                <h3 className="font-serif text-lg text-gray-900 leading-snug mb-2 group-hover:text-gray-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light line-clamp-2 flex-1">
                  {item.description}
                </p>
                <div className="mt-6 text-[10px] text-gray-300 uppercase tracking-widest group-hover:text-gray-500 transition-colors">
                  Detail →
                </div>
              </div>
            </div>
          ))}
        </main>
      </section>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <footer className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
          <p className="text-xs text-gray-100">
            Menampilkan{" "}
            <span className="text-gray-700 font-serif font-medium">
              {paginatedData.length}
            </span>{" "}
            dari{" "}
            <span className="text-gray-700 font-serif font-medium">
              {filteredData.length}
            </span>{" "}
            tardisi gereja
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="cursor-pointer p-2 border border-gray-100 rounded hover:bg-gray-50 disabled:opacity-20 transition-all"
            >
              <ChevronLeft size={14} />
            </button>
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`cursor-pointer w-8 h-8 rounded text-[11px] font-medium transition-all ${currentPage === i + 1 ? "bg-gray-900 text-white" : "border border-gray-100 text-gray-400 hover:bg-gray-50"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="cursor-pointer p-2 border border-gray-100 rounded hover:bg-gray-50 disabled:opacity-20 transition-all"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </footer>
      )}
    </section>
  );
}

// Jika ada item yang dipilih, render halaman Detail secara Fullscreen
//   if (selectedItem) {
//     return (
//       <div className="fixed top-0 bottom-0 right-0 left-[80px] overflow-y-auto">
//         <Detail
//           title={selectedItem.title}
//           content={selectedItem.description} // PAKAI DESCRIPTION
//           image={selectedItem.image}
//           date={selectedItem.period} // PAKAI PERIOD
//           author="Admin Paroki"
//           onBack={() => setSelectedItem(null)}
//           onEdit={() => setIsModalOpen(true)}
//         />
//       </div>
//     );
//   }
