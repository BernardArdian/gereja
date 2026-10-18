import { useState, useMemo } from "react";
import {
  Newspaper,
  Plus,
  Calendar,
  User,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
} from "lucide-react";

import Detail from "../../component/detail";
import InputBerita from "../../component/berita/input_berita";
import PaginationFooter from "../../component/PaginationFooter";
import DeleteModal from "../../component/alert/deleteModal";

export default function Berita() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- STATE UNTUK DETAIL VIEW ---
  const [selectedNews, setSelectedNews] = useState(null);

  const [newsList, setNewsList] = useState([
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
  const [newsToDelete, setNewsToDelete] = useState(null);
  const confirmDeleteNews = () => {
    if (!newsToDelete) return;
    setNewsList((previous) =>
      previous.filter((item) => item.id !== newsToDelete.id),
    );
    setNewsToDelete(null);
  };

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    date: "",
    author: "",
    image: "",
    tags: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      date: "",
      author: "",
      image: "",
      tags: "",
    });
  };

  // --- LOGIC SEARCH & PAGINATION ---
  const filteredNews = useMemo(() => {
    return newsList.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, newsList]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNews = filteredNews.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- JIKA BERITA DIKLIK, TAMPILKAN DETAIL ---
  if (selectedNews) {
    return (
      <Detail
        formData={selectedNews}
        handlers={{
          onBack: () => setSelectedNews(null),
        }}
      />
    );
  }

  // --- Konten utama ---
  return (
    <section className="min-h-full w-full bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 p-4 backdrop-blur sm:px-6">
        <section className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
              Kabar paroki
            </p>
            <h1 className="truncate text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Berita & Artikel
            </h1>
          </div>

          <section className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
            <div className="relative min-w-0 flex-1 sm:w-72 sm:flex-none">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Cari judul berita..."
                value={searchQuery}
                onChange={handleSearch}
                aria-label="Cari judul berita"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100"
              />
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              type="button"
              className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 active:scale-[0.98] sm:w-auto"
            >
              <Plus size={20} />
              <span>Input Berita</span>
            </button>
          </section>
        </section>
      </header>

      <main className="mx-auto w-full max-w-7xl space-y-5 px-4 py-5 sm:px-6 sm:py-8">
        <section
          className="space-y-3"
          children={
            paginatedNews.length > 0 ? (
              paginatedNews.map((item) => (
                <section
                  key={item.id}
                  className="group flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-amber-200 hover:shadow-md sm:flex-row"
                  onClick={() => setSelectedNews(item)}
                >
                  <section className="relative aspect-video w-full shrink-0 overflow-hidden bg-slate-100 sm:aspect-auto sm:h-auto sm:w-56">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </section>

                  <section className="flex min-w-0 flex-1 flex-col justify-between p-4 sm:p-5">
                    <section className="min-w-0 cursor-pointer">
                      <section className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} aria-hidden="true" /> {item.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <User size={14} aria-hidden="true" /> {item.author}
                        </span>
                      </section>
                      <h3
                        className="mb-2 wrap-break-word text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-amber-800 sm:text-lg"
                        children={item.title}
                      />
                      <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
                        {item.excerpt}
                      </p>
                    </section>

                    <section className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
                      <button
                        type="button"
                        onClick={() => setSelectedNews(item)}
                        className="inline-flex min-h-10 cursor-pointer items-center gap-1 rounded-lg px-2 text-sm font-semibold text-amber-800 transition hover:bg-amber-50 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
                      >
                        Baca <ExternalLink size={12} />
                      </button>
                      <section
                        className="flex items-center justify-center gap-1 sm:gap-2"
                        onClick={(i) => {
                          i.stopPropagation();
                        }}
                      >
                        <button
                          type="button"
                          aria-label={`Edit ${item.title}`}
                          className="cursor-pointer rounded-lg p-2 text-amber-800 transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 sm:p-2.5"
                          onClick={(i) => {
                            i.stopPropagation();
                          }}
                        >
                          <Edit2 size={18} />
                        </button>

                        <button
                          type="button"
                          aria-label={`Hapus ${item.title}`}
                          className="cursor-pointer rounded-lg p-2 text-rose-700 transition hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 sm:p-2.5"
                          onClick={(i) => {
                            i.stopPropagation();
                            setNewsToDelete(item);
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </section>
                    </section>
                  </section>
                </section>
              ))
            ) : (
              <section className="rounded-2xl border border-dashed border-slate-300 bg-white py-14 text-center text-slate-500">
                <Newspaper size={40} className="mx-auto mb-3 text-slate-400" />
                <p className="text-sm font-semibold">Berita tidak ditemukan</p>
              </section>
            )
          }
        />

        {/* --- PAGINATION --- */}
        <PaginationFooter
          currentPage={currentPage}
          pageSize={itemsPerPage}
          totalItems={filteredNews.length}
          onPageChange={setCurrentPage}
          itemLabel="berita"
        />
      </main>
      <InputBerita
        isOpen={isModalOpen}
        editMode={""}
        formData={formData}
        isSubmitting={""}
        handlers={{
          cancel: () => {
            setIsModalOpen(false);
            resetForm();
          },
          input: handleInputChange,
          //submit: handleSubmit
        }}
      />
      <DeleteModal
        isOpen={Boolean(newsToDelete)}
        onClose={() => setNewsToDelete(null)}
        onConfirm={confirmDeleteNews}
        title="Hapus berita?"
        description="Berita yang dihapus tidak lagi tersedia pada daftar berita."
        itemName={newsToDelete?.title}
        confirmText="Ya, hapus berita"
      />
    </section>
  );
}
