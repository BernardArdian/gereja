import { useState, useMemo } from "react";
import { Search, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react";

export default function Devosi() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [setSelectedItem] = useState(null);
  const itemsPerPage = 6;

  const [devosiList] = useState([
    {
      id: 1,
      title: "Doa Koronka",
      schedule: "Setiap Jam 15.00",
      location: "Kapel Adorasi",
      members: "45 Orang",
      category: "Rutin",
      image: "https://picsum.photos/seed/pray1/800/600",
    },
    {
      id: 2,
      title: "Novena Tiga Salam Maria",
      schedule: "9 Hari Berturut",
      location: "Gereja Pusat",
      members: "Umum",
      category: "Khusus",
      image: "https://picsum.photos/seed/pray2/800/600",
    },
    {
      id: 3,
      title: "Legio Mariae",
      schedule: "Setiap Sabtu 16.00",
      location: "Aula Paroki",
      members: "20 Orang",
      category: "Grup",
      image: "https://picsum.photos/seed/pray3/800/600",
    },
    {
      id: 4,
      title: "Adorasi Sakramen Mahakudus",
      schedule: "Kamis Pertama",
      location: "Gereja Utama",
      members: "Seluruh Umat",
      category: "Rutin",
      image: "https://picsum.photos/seed/pray4/800/600",
    },
    {
      id: 5,
      title: "Devosi Hati Kudus Yesus",
      schedule: "Jumat Pertama",
      location: "Gereja Utama",
      members: "Umum",
      category: "Rutin",
      image: "https://picsum.photos/seed/pray5/800/600",
    },
    {
      id: 6,
      title: "Kelompok Doa Karismatik",
      schedule: "Setiap Rabu Malam",
      location: "Aula Stasi",
      members: "35 Orang",
      category: "Grup",
      image: "https://picsum.photos/seed/pray6/800/600",
    },
    {
      id: 7,
      title: "Doa Rosario Lingkungan",
      schedule: "Senin & Kamis",
      location: "Lingkungan",
      members: "Warga",
      category: "Rutin",
      image: "https://picsum.photos/seed/pray7/800/600",
    },
  ]);

  const filteredData = useMemo(
    () =>
      devosiList.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery, devosiList],
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
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://algonzcollectionshop.com/wp-content/uploads/2025/05/1-1.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <section className="h-full flex flex-row justify-between">
          <section className="relative z-20 h-full flex flex-col justify-end p-8">
            <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-white/50 mb-1">
              Kehidupan Spiritual & Doa
            </p>
            <h1 className="font-serif text-3xl text-white">Devosi</h1>
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
                placeholder="Cari jadwal atau nama devosi..."
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
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 border border-gray-100 rounded overflow-hidden">
          {paginatedData.map((item) => (
            <form
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-gray-100/60 hover:bg-slate-200/50 transition-colors cursor-pointer flex flex-col group overflow-hidden"
            >
              <div className="relative h-40 overflow-hidden">
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
                <h3 className="font-serif text-lg text-gray-900 leading-snug mb-4 group-hover:text-gray-500 transition-colors">
                  {item.title}
                </h3>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-light">
                    <Clock size={11} className="flex-shrink-0" />{" "}
                    {item.schedule}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-light">
                    <Users size={11} className="flex-shrink-0" /> {item.members}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 text-[10px] text-gray-300 uppercase tracking-widest group-hover:text-gray-500 transition-colors">
                  Detail Panduan →
                </div>
              </div>
            </form>
          ))}
        </section>
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
            devosi
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
