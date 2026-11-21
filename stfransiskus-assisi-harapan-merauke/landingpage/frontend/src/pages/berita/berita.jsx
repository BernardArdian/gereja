import { useState, useMemo } from "react";
import { Search, Newspaper } from "lucide-react";

import DetailBerita from "../../component/detail/detailBerita";
import ListBerita from "../../component/berita/lsitBerita";
import Pagination from "../../component/common/Pagination";

// Halaman berita menyediakan pencarian, pagination, dan tampilan detail.
export default function Berita() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- STATE UNTUK DETAIL---
  const [selectedNews, setSelectedNews] = useState(null);

  // Contoh data lokal; daftar ini belum dimuat dari backend.
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
    // Pencarian berita mencocokkan kata kunci terhadap judul.
    return newsList.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, newsList]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  // Ambil hanya potongan data yang berada pada halaman aktif.
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleSearch = (e) => {
    // Mulai kembali dari halaman pertama saat hasil pencarian berubah.
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    // Pindah halaman lalu gulir kembali ke paling atas.
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- TAMPILAN LIST UTAMA ---
  return (
    <section className="min-h-screen w-full bg-slate-50">
      <main className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6 sm:py-8">
        <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-sm font-semibold text-amber-800">Kabar paroki</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Berita paroki
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Informasi dan kegiatan Paroki St. Fransiskus Assisi.
            </p>
          </div>
          <div className="relative w-full sm:max-w-sm">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
              aria-hidden="true"
            />
            <input
              type="search"
              aria-label="Cari berita"
              placeholder="Cari judul berita..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100"
            />
          </div>
        </header>

        {paginatedData.length > 0 ? (
          <ListBerita
            data={paginatedData}
            handler={{ showDetail: (item) => setSelectedNews(item) }}
          />
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center text-slate-500">
            <Newspaper size={36} className="mx-auto mb-4 text-slate-300" />
            <p className="text-sm font-medium">Berita tidak ditemukan</p>
            <p className="mt-1 text-xs">
              Coba gunakan kata kunci yang berbeda.
            </p>
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemCount={paginatedData.length}
            totalCount={filteredData.length}
            itemLabel="berita"
          />
        )}

        {selectedNews && (
          <DetailBerita
            title={selectedNews.title}
            content={selectedNews.content || selectedNews.excerpt}
            image={selectedNews.image}
            date={selectedNews.date}
            author={selectedNews.author}
            tags={selectedNews.tags || ["Berita"]}
            onBack={() => setSelectedNews(null)} // Tutup detail
          />
        )}
      </main>
    </section>
  );
}
