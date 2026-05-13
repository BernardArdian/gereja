import { useState, useMemo } from "react";
import {
  Newspaper,
  Plus,
  Calendar,
  User,
  Search,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Trash2,
  ExternalLink,
} from "lucide-react";

import Detail from "../../component/detail";
import InputBerita from "../../component/berita/input_berita";

export default function Berita() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- STATE UNTUK DETAIL VIEW ---
  const [selectedNews, setSelectedNews] = useState(null);

  const [newsList] = useState([
    {
      id: 1,
      title: "Pembangunan Gedung Serbaguna Stasi Harapan Memasuki Tahap Akhir",
      excerpt: "Proses pembangunan kini sudah mencapai 90%...",
      content:
        "Isi lengkap berita pembangunan gedung serbaguna... (Data ini harusnya dari database)",
      date: "02 Feb 2026",
      author: "Admin",
      image: "https://picsum.photos/seed/n1/800/600",
      tags: ["Pembangunan", "Stasi Harapan"],
    },
    {
      id: 2,
      title: "Latihan Gabungan Koor Paroki Persiapan Paskah",
      excerpt: "Seluruh anggota koor berkumpul di Gereja Pusat...",
      content: "Menyambut hari raya Paskah, tim liturgi mengadakan latihan...",
      date: "01 Feb 2026",
      author: "Liturgi",
      image: "https://picsum.photos/seed/n2/800/600",
      tags: ["Liturgi", "Paskah"],
    },
    {
      id: 3,
      title: "Pembangunan Gedung Serbaguna Stasi Harapan Memasuki Tahap Akhir",
      excerpt: "Proses pembangunan kini sudah mencapai 90%...",
      content:
        "Isi lengkap berita pembangunan gedung serbaguna... (Data ini harusnya dari database)",
      date: "02 Feb 2026",
      author: "Admin",
      image: "https://picsum.photos/seed/n1/800/600",
      tags: ["Pembangunan", "Stasi Harapan"],
    },
    {
      id: 4,
      title: "Latihan Gabungan Koor Paroki Persiapan Paskah",
      excerpt: "Seluruh anggota koor berkumpul di Gereja Pusat...",
      content: "Menyambut hari raya Paskah, tim liturgi mengadakan latihan...",
      date: "01 Feb 2026",
      author: "Liturgi",
      image: "https://picsum.photos/seed/n2/800/600",
      tags: ["Liturgi", "Paskah"],
    },
    {
      id: 5,
      title: "Pembangunan Gedung Serbaguna Stasi Harapan Memasuki Tahap Akhir",
      excerpt: "Proses pembangunan kini sudah mencapai 90%...",
      content:
        "Isi lengkap berita pembangunan gedung serbaguna... (Data ini harusnya dari database)",
      date: "02 Feb 2026",
      author: "Admin",
      image: "https://picsum.photos/seed/n1/800/600",
      tags: ["Pembangunan", "Stasi Harapan"],
    },
    {
      id: 6,
      title: "Latihan Gabungan Koor Paroki Persiapan Paskah",
      excerpt: "Seluruh anggota koor berkumpul di Gereja Pusat...",
      content: "Menyambut hari raya Paskah, tim liturgi mengadakan latihan...",
      date: "01 Feb 2026",
      author: "Liturgi",
      image: "https://picsum.photos/seed/n2/800/600",
      tags: ["Liturgi", "Paskah"],
    },
    {
      id: 7,
      title: "Pembangunan Gedung Serbaguna Stasi Harapan Memasuki Tahap Akhir",
      excerpt: "Proses pembangunan kini sudah mencapai 90%...",
      content:
        "Isi lengkap berita pembangunan gedung serbaguna... (Data ini harusnya dari database)",
      date: "02 Feb 2026",
      author: "Admin",
      image: "https://picsum.photos/seed/n1/800/600",
      tags: ["Pembangunan", "Stasi Harapan"],
    },
    {
      id: 8,
      title: "Latihan Gabungan Koor Paroki Persiapan Paskah",
      excerpt: "Seluruh anggota koor berkumpul di Gereja Pusat...",
      content: "Menyambut hari raya Paskah, tim liturgi mengadakan latihan...",
      date: "01 Feb 2026",
      author: "Liturgi",
      image: "https://picsum.photos/seed/n2/800/600",
      tags: ["Liturgi", "Paskah"],
    },
    {
      id: 9,
      title: "Pembangunan Gedung Serbaguna Stasi Harapan Memasuki Tahap Akhir",
      excerpt: "Proses pembangunan kini sudah mencapai 90%...",
      content:
        "Isi lengkap berita pembangunan gedung serbaguna... (Data ini harusnya dari database)",
      date: "02 Feb 2026",
      author: "Admin",
      image: "https://picsum.photos/seed/n1/800/600",
      tags: ["Pembangunan", "Stasi Harapan"],
    },
    {
      id: 10,
      title: "Latihan Gabungan Koor Paroki Persiapan Paskah",
      excerpt: "Seluruh anggota koor berkumpul di Gereja Pusat...",
      content: "Menyambut hari raya Paskah, tim liturgi mengadakan latihan...",
      date: "01 Feb 2026",
      author: "Liturgi",
      image: "https://picsum.photos/seed/n2/800/600",
      tags: ["Liturgi", "Paskah"],
    },
    {
      id: 11,
      title: "Pembangunan Gedung Serbaguna Stasi Harapan Memasuki Tahap Akhir",
      excerpt: "Proses pembangunan kini sudah mencapai 90%...",
      content:
        "Isi lengkap berita pembangunan gedung serbaguna... (Data ini harusnya dari database)",
      date: "02 Feb 2026",
      author: "Admin",
      image: "https://picsum.photos/seed/n1/800/600",
      tags: ["Pembangunan", "Stasi Harapan"],
    },
    {
      id: 12,
      title: "Latihan Gabungan Koor Paroki Persiapan Paskah",
      excerpt: "Seluruh anggota koor berkumpul di Gereja Pusat...",
      content: "Menyambut hari raya Paskah, tim liturgi mengadakan latihan...",
      date: "01 Feb 2026",
      author: "Liturgi",
      image: "https://picsum.photos/seed/n2/800/600",
      tags: ["Liturgi", "Paskah"],
    },
  ]);

  // --- LOGIC SEARCH & PAGINATION ---
  const filteredNews = useMemo(() => {
    return newsList.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, newsList]);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNews = filteredNews.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // --- JIKA BERITA DIKLIK, TAMPILKAN DETAIL ---
  if (selectedNews) {
    return (
      <Detail
        title={selectedNews.title}
        content={selectedNews.content || selectedNews.excerpt}
        image={selectedNews.image}
        date={selectedNews.date}
        author={selectedNews.author}
        tags={selectedNews.tags || ["Berita"]}
        onBack={() => setSelectedNews(null)} // Tutup detail
        onEdit={() => {
          console.log("Edit:", selectedNews.id);
          setIsModalOpen(true);
        }}
      />
    );
  }

  // --- Konten utama ---
  return (
    <section className="min-h-screen pr-0.5 pl-0.5">
      <header className="bg-gray-300 border-b px-8 py-2 top-0 z-30">
        <section className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <section className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
              <Newspaper size={24} />
            </div>
            <div>
              <h2 className="text-xl font-serif text-gray-900 tracking-tight">
                Berita Paroki St.Fransiskus Assisi.
              </h2>
              <p className="text-[10px] font-serif text-gray-900 uppercase tracking-widest">
                Arsip Berita & Artikel
              </p>
            </div>
          </section>

          <section className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Cari judul berita..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-2.5 cursor-pointer bg-blue-500 hover:bg-blue-500/50 text-white rounded-2xl active:scale-95 transition-all"
            >
              <Plus size={20} />
            </button>
          </section>
        </section>
      </header>

      <main className="max-w-5xl bg-gray-500/30 shadow-sm mx-auto px-6 py-10">
        <section className="space-y-0.5">
          {paginatedNews.length > 0 ? (
            paginatedNews.map((item) => (
              <section
                key={item.id}
                className="flex flex-col md:flex-row gap-6 py-8 border border-gray-100  group cursor-pointer bg-gray-100/50 hover:bg-slate-200/60 "
                onClick={() => setSelectedNews(item)}
              >
                <section className="md:w-56 h-40 md:h-auto relative overflow-hidden flex-shrink-0 cursor-pointer">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </section>

                <section className="p-6 flex-1 flex flex-col justify-between">
                  <section
                    className="cursor-pointer"
                    onClick={() => setSelectedNews(item)}
                  >
                    <section className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={12} /> {item.author}
                      </span>
                    </section>
                    <h3 className="text-lg font-bold text-gray-800 leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                  </section>

                  <section className="flex items-center justify-between mt-4">
                    <button
                      onClick={() => setSelectedNews(item)}
                      className="text-indigo-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:underline"
                    >
                      Detail <ExternalLink size={12} />
                    </button>
                    <section className="flex gap-2">
                      <section className="flex items-center justify-center gap-2 ">
                        <button className="flex flex-row gap-1 text-center cursor-pointer p-2 text-center text-yellow-500 hover:text-amber-500 hover:bg-amber-100 rounded-xl transition-colors">
                          <Edit2 size={20} />
                          <span>edit</span>
                        </button>
                        <button className="flex flex-row gap-1 text-center cursor-pointer text-center p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                          <Trash2 size={20} />
                          <span>hapus</span>
                        </button>
                      </section>
                    </section>
                  </section>
                </section>
              </section>
            ))
          ) : (
            <section className="text-center py-20 opacity-30">
              <Newspaper size={48} className="mx-auto mb-4" />
              <p className="font-black uppercase text-sm tracking-widest">
                Berita tidak ditemukan
              </p>
            </section>
          )}
        </section>

        {/* --- PAGINATION --- */}
        {totalPages > 1 && (
          <section className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`cursor-pointer p-2 rounded-xl border transition-all ${currentPage === 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-indigo-600 hover:text-white"}`}
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`cursor-pointer w-10 h-10 rounded-xl text-xs font-black transition-all ${currentPage === i + 1 ? "bg-[#B38728] text-white shadow-lg" : "bg-white text-gray-400 border"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`cursor-pointer p-2 rounded-xl border transition-all ${currentPage === totalPages ? "opacity-30 cursor-not-allowed" : "hover:bg-indigo-600 hover:text-white"}`}
            >
              <ChevronRight size={20} />
            </button>
          </section>
        )}
      </main>
      <InputBerita isOpen={isModalOpen} onClose={setIsModalOpen(false)} />
    </section>
  );
}
