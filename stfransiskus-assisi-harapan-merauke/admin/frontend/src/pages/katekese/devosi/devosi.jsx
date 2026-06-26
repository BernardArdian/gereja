import { useState, useMemo } from "react";
import {
  Heart,
  Search,
  BookOpen,
  Clock,
  Users,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Trash2,
  Edit2,
  Circle,
} from "lucide-react";

import Detail from "../../../component/detail";

export default function Devosi() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 6; // Menampilkan 6 kartu per halaman

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

  // --- LOGIC SEARCH & PAGINATION ---
  const filteredDevosi = useMemo(() => {
    return devosiList.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, devosiList]);

  const totalPages = Math.ceil(filteredDevosi.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredDevosi.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Kembali ke halaman 1 saat mencari
  };

  // Jika ada item yang dipilih, render halaman Detail secara Fullscreen
  if (selectedItem) {
    return (
      <div className="absolute inset-0 left-[80px] overflow-y-auto bg-white z-50 min-h-screen">
        <Detail
          formData={selectedItem}
          handlers={{
            onBack: () => setSelectedItem(null),
          }}
        />
      </div>
    );
  }

  return (
    <section className="min-h-screen pb-20">
      {/* COMPACT HERO SECTION */}
      <header className="relative w-full pt-16 pb-24 px-8 overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `url('https://algonzcollectionshop.com/wp-content/uploads/2025/05/1-1.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center-top",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="relative z-20 max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-[10px] uppercase tracking-widest mb-2">
              <BookOpen size={14} /> Kehidupan Spiritual & Doa
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
              Devosi
            </h1>
          </div>
        </div>
        <div className="absolute top-0 right-0 opacity-20 transform translate-x-10 -translate-y-5 text-rose-500 pointer-events-none z-10">
          <Heart size={300} />
        </div>
      </header>

      {/* STICKY SEARCH BAR */}
      <div className="sticky top-0 z-40 -mt-8 px-6">
        <div className="max-w-4xl mx-auto py-2">
          <div className="bg-white p-2 rounded-2xl shadow-xl shadow-indigo-950/5 border border-gray-100 flex items-center">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Cari jadwal atau nama devosi..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-[1.6rem] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <main className="max-w-6xl mx-auto px-6 mt-12">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {paginatedData.map((item) => (
            <section
              key={item.id}
              onClick={() =>
                setSelectedItem({ ...item, content: item.schedule })
              }
              className="group cursor-pointer bg-slate-500 rounded border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
            >
              <section className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
                <section className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-[9px] font-black text-white rounded-lg tracking-widest uppercase">
                    {item.category}
                  </span>
                </section>
              </section>

              <section className="p-7 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 leading-tight mb-4 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>

                <section className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-900 font-medium">
                    <div className="p-2 bg-gray-50 rounded-xl text-indigo-600">
                      <Clock size={14} />
                    </div>
                    {item.schedule}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-900 font-medium">
                    <div className="p-2 bg-gray-50 rounded-xl text-indigo-600">
                      <Users size={14} />
                    </div>
                    {item.members}
                  </div>
                </section>

                <footer className="flex items-center justify-between pt-5 border-t border-gray-50 mt-auto">
                  <button className="flex items-center gap-2 text-indigo-600 text-[10px] font-black uppercase tracking-[0.15em] hover:gap-3 transition-all">
                    Detail Panduan <ArrowRight size={14} />
                  </button>
                  <section className="flex items-center justify-end gap-3">
                    <button
                      className="cursor-pointer p-3 bg-slate-200 rounded text-yellow-700 hover:bg-amber-600 hover:text-white transition-all active:scale-90"
                      onClick={(i) => {
                        i.stopPropagation();
                      }}
                      children={<Edit2 size={18} />}
                    />

                    <button
                      className="cursor-pointer p-3 bg-slate-200 rounded text-rose-400 hover:bg-red-600 hover:text-white transition-all active:scale-90"
                      onClick={(i) => {
                        i.stopPropagation();
                      }}
                      children={<Trash2 size={18} />}
                    />
                  </section>
                </footer>
              </section>
            </section>
          ))}
        </section>

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && (
          <footer className="mt-10 flex items-center justify-between bg-gray-400/30 p-4 rounded-xl border border-gray-100">
            <p className="text-xs text-gray-600 font-medium">
              Menampilkan{" "}
              <span className="text-gray-700 font-bold">
                {paginatedData.length}
              </span>{" "}
              dari{" "}
              <span className="text-gray-700 font-bold">
                {filteredDevosi.length}
              </span>{" "}
              devosi
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="cursor-pointer p-2 rounded-xl border border-blue-500 disabled:opacity-20 hover:bg-blue-400 text-white hover:text-black transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <div
                className="flex gap-1"
                children={[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`cursor-pointer w-9 h-9 rounded-xl text-[16px] font-black transition-all ${
                      currentPage === i + 1
                        ? "bg-blue-500/30 text-black"
                        : "bg-white text-gray-400 border border-gray-50"
                    }`}
                    children={i + 1}
                  />
                ))}
              ></div>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="cursor-pointer p-2 rounded-xl border border-blue-500 disabled:opacity-20 hover:bg-blue-400 text-white hover:text-black transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </footer>
        )}
      </main>
    </section>
  );
}
