import { useState, useMemo } from "react";
import {
  Search,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import Pagination from "../../../component/common/Pagination";
import DetailBerita from "../../../component/detail/detailBerita";

export default function Renungan() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const itemsPerPage = 5;

  const [renunganList] = useState([
    {
      id: 1,
      date: "03 Feb 2026",
      title: "Menemukan Kedamaian dalam Badai",
      verse: "Matius 8:26",
      excerpt:
        "Mengapa kamu takut, kamu yang kurang percaya? Lalu bangunlah Yesus menghardik angin dan danau itu...",
      author: "Rm. Yohanes, Pr",
      category: "Harian",
    },
    {
      id: 2,
      date: "02 Feb 2026",
      title: "Setia dalam Perkara Kecil",
      verse: "Lukas 16:10",
      excerpt:
        "Barangsiapa setia dalam perkara-perkara kecil, ia setia juga dalam perkara-perkara besar...",
      author: "Rm. Petrus, Pr",
      category: "Harian",
    },
    {
      id: 3,
      date: "01 Feb 2026",
      title: "Kasih yang Memulihkan",
      verse: "1 Korintus 13:4",
      excerpt: "Kasih itu sabar; kasih itu murah hati; ia tidak cemburu...",
      author: "Rm. Markus, SVD",
      category: "Mingguan",
    },
    {
      id: 4,
      date: "31 Jan 2026",
      title: "Garam dan Terang Dunia",
      verse: "Matius 5:13-14",
      excerpt:
        "Kamu adalah garam dunia. Jika garam itu menjadi tawar, dengan apakah ia diasinkan?...",
      author: "Rm. Andreas, Pr",
      category: "Harian",
    },
    {
      id: 5,
      date: "30 Jan 2026",
      title: "Memikul Salib Setiap Hari",
      verse: "Lukas 9:23",
      excerpt:
        "Setiap orang yang mau mengikut Aku, ia harus menyangkal dirinya, memikul salibnya setiap hari...",
      author: "Rm. Stefanus, Pr",
      category: "Khusus",
    },
    {
      id: 6,
      date: "29 Jan 2026",
      title: "Roti Hidup yang Turun dari Surga",
      verse: "Yohanes 6:35",
      excerpt:
        "Akulah roti hidup; barangsiapa datang kepada-Ku, ia tidak akan lapar lagi...",
      author: "Rm. Thomas, Pr",
      category: "Harian",
    },
  ]);

  const filteredData = useMemo(
    () =>
      renunganList.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.verse.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery, renunganList],
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
        type="renungan"
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
            backgroundImage: `url('https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2022/07/23/2269233148.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <section className="relative z-20 flex min-h-52 flex-col justify-between gap-6 p-5 sm:flex-row sm:items-end sm:p-8">
          <section>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              Santapan Rohani
            </p>
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              Renungan
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
                aria-label="Cari renungan"
                placeholder="Cari judul atau ayat Alkitab..."
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

      {/* LIST */}
      <main className="mx-auto mt-6 w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:mt-10">
        {paginatedData.length === 0 && (
          <p className="py-10 text-center text-sm text-slate-500">
            Tidak ada hasil ditemukan.
          </p>
        )}
        {paginatedData.map((item) => (
          <section
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative cursor-pointer overflow-hidden border-b border-slate-100 bg-white p-4 transition hover:bg-slate-50 sm:p-6"
          >
            <section className="absolute right-0 top-0">
              <span className="rounded-bl-xl bg-amber-50 px-3 py-1.5 text-[9px] font-bold uppercase text-amber-900 sm:px-5">
                {item.category}
              </span>
            </section>
            <section className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <div className="flex h-fit w-fit min-w-20 flex-row items-center gap-2 rounded-xl bg-slate-50 p-3 sm:min-w-24 sm:flex-col sm:gap-0 sm:p-4">
                <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-400">
                  {item.date.split(" ")[1]}
                </span>
                <span className="text-2xl font-black leading-none text-amber-900 sm:my-1 sm:text-3xl">
                  {item.date.split(" ")[0]}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                  {item.date.split(" ")[2]}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <span className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase text-indigo-500">
                  <BookOpen size={12} aria-hidden="true" /> {item.verse}
                </span>
                <h3 className="mb-3 break-words text-lg font-bold text-slate-900 transition-colors group-hover:text-amber-800 sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600 sm:mb-6">
                  "{item.excerpt}"
                </p>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <span className="text-xs font-semibold text-gray-600">
                    {item.author}
                  </span>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedItem(item);
                    }}
                    className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-amber-800 transition hover:gap-2"
                  >
                    Baca Selengkapnya <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </section>
          </section>
        ))}
      </main>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemCount={paginatedData.length}
          totalCount={filteredData.length}
          itemLabel="renungan"
          className="mt-4"
        />
      )}
    </section>
  );
}
