import { useState, useMemo } from "react";
import {
  Search,
  Newspaper,
  ChevronLeft,
  ChevronRight,
  User,
  Calendar,
  ExternalLink,
} from "lucide-react";

import DetailBerita from "../../component/detail/detailBerita";
import { Form } from "react-router-dom";
import ListBerita from "../../component/berita/lsitBerita";

export default function Berita() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- STATE UNTUK DETAIL---
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
      title: "Latihan Gabungan Koor Paroki Persiapan Paskah",
      excerpt: "Seluruh anggota koor berkumpul di Gereja Pusat...",
      content: "Menyambut hari raya Paskah, tim liturgi mengadakan latihan...",
      date: "01 Feb 2026",
      author: "Liturgi",
      image: "https://picsum.photos/seed/n2/800/600",
      tags: ["Liturgi", "Paskah"],
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
      title: "Latihan Gabungan Koor Paroki Persiapan Paskah",
      excerpt: "Seluruh anggota koor berkumpul di Gereja Pusat...",
      content: "Menyambut hari raya Paskah, tim liturgi mengadakan latihan...",
      date: "01 Feb 2026",
      author: "Liturgi",
      image: "https://picsum.photos/seed/n2/800/600",
      tags: ["Liturgi", "Paskah"],
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
  const filteredData = useMemo(() => {
    return newsList.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, newsList]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
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
      <DetailBerita
        title={selectedNews.title}
        content={selectedNews.content || selectedNews.excerpt}
        image={selectedNews.image}
        date={selectedNews.date}
        author={selectedNews.author}
        tags={selectedNews.tags || ["Berita"]}
        onBack={() => setSelectedNews(null)} // Tutup detail
      />
    );
  }

  // --- TAMPILAN LIST UTAMA ---
  return (
    <section className="w-full min-h-screen px-4">
      {/* HEADER */}
      <header className="py-4 border-b border-amber-500 mb-4 rounded-b-xl mt-1 bg-[#B38728]/60 ">
        <section className="max-w-5xl mx-auto ml-1 mr-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="font-serif text-1xl text-gray-900">
              Berita Paroki St.Fransiskus Assisi
            </h2>
            <p className="text-[12px] font-smibold tracking-[0.18em] uppercase text-gray-800 mb-1">
              Arsip Berita Paroki
            </p>
          </div>

          <section className="relative w-full md:w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
              size={14}
            />
            <input
              type="text"
              placeholder="Cari judul berita..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-9 pr-4 py-2 border border-gray-100 rounded text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gray-300 transition-all bg-white"
            />
          </section>
        </section>
      </header>

      {/* MAIN */}
      <main className="max-w-5xl mx-auto px-8 py-10">
        <section
          className="px-15 pb-15"
          children={
            paginatedData.length > 0 ? (
              <ListBerita
                data={newsList.slice(0, 3)}
                handler={{ showDetail: (item) => setSelectedNews(item) }}
              />
            ) : (
              <div className="text-center py-24 text-gray-300">
                <Newspaper size={36} className="mx-auto mb-4" />
                <p className="text-xs uppercase tracking-widest">
                  Berita tidak ditemukan
                </p>
              </div>
            )
          }
        />

        {/* PAGINATION */}
        {totalPages > 1 && (
          <footer className="flex p-5 rounded-xl bg-stone-300 items-center justify-between border-t border-gray-100 ">
            <p className="text-xs text-gray-100">
              <span
                className="text-gray-700 font-serif font-medium"
                children={`Menanpilkan ${paginatedData.length} dari`}
              />
              <span
                className="text-gray-700 font-serif font-medium"
                children={` ${filteredData.length} berita`}
              />
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="cursor-pointer p-2 border border-gray-100 rounded hover:bg-gray-50 disabled:opacity-20 transition-all"
              >
                <ChevronLeft size={14} />
              </button>
              <div
                className="flex gap-1"
                children={[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`cursor-pointer w-8 h-8 rounded text-[11px] font-semibold font-medium transition-all ${currentPage === i + 1 ? "bg-gray-900 text-white" : "border border-gray-100 text-gray-900 hover:bg-gray-50"}`}
                    children={i + 1}
                  />
                ))}
              />
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="cursor-pointer p-2 border border-gray-100 rounded hover:bg-gray-50 disabled:opacity-20 transition-all"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </footer>
        )}
      </main>
    </section>
  );
}
