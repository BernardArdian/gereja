import { useState, useMemo } from "react";
import {
  Quote,
  Search,
  Calendar,
  BookOpen,
  ArrowRight,
  Trash2,
  Edit2,
} from "lucide-react";

import Detail from "../../../component/detail";
import PaginationFooter from "../../../component/PaginationFooter";
import DeleteModal from "../../../component/alert/deleteModal";

export default function Renungan() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const itemsPerPage = 5;

  const [renunganList, setRenunganList] = useState([
    {
      id: 1,
      date: "03 Feb 2026",
      title: "Menemukan Kedamaian dalam Badai",
      verse: "Matius 8:26",
      excerpt:
        "Mengapa kamu takut, kamu yang kurang percaya? Lalu bangunlah Yesus menghardik angin dan danau itu...",
      author: "Rm. Yohanes, Pr",
      category: "Harian",
      image: "https://picsum.photos/seed/1/1200/600",
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
      image: "https://picsum.photos/seed/2/1200/600",
    },
    {
      id: 3,
      date: "01 Feb 2026",
      title: "Kasih yang Memulihkan",
      verse: "1 Korintus 13:4",
      excerpt:
        "Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong...",
      author: "Rm. Markus, SVD",
      category: "Mingguan",
      image: "https://picsum.photos/seed/3/1200/600",
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
      image: "https://picsum.photos/seed/4/1200/600",
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
      image: "https://picsum.photos/seed/5/1200/600",
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
      image: "https://picsum.photos/seed/6/1200/600",
    },
  ]);

  const filteredRenungan = useMemo(() => {
    return renunganList.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.verse.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, renunganList]);

  const paginatedData = filteredRenungan.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (selectedItem) {
    return (
      <Detail
        formData={selectedItem}
        handlers={{
          onBack: () => setSelectedItem(null),
        }}
      />
    );
  }

  return (
    <section className="w-full min-w-0 pb-8 sm:pb-12">
      {/* HERO */}
      <section className="relative w-full overflow-hidden rounded-2xl px-5 py-10 sm:px-8 sm:py-14">
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `url('https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2022/07/23/2269233148.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="relative z-20 max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-[10px] uppercase tracking-widest mb-2">
              <BookOpen size={14} /> Santapan Rohani Harian
            </div>
            <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Renungan
            </h1>
          </div>
        </div>

        <div className="absolute top-0 right-0 opacity-20 transform translate-x-10 -translate-y-5 text-white pointer-events-none z-10">
          <Quote size={180} className="sm:h-[300px] sm:w-[300px]" />
        </div>
      </section>

      {/* SEARCH */}
      <section className="sticky top-0 z-40 -mt-5 px-1 sm:-mt-8 sm:px-6">
        <div className="max-w-3xl mx-auto py-2">
          <div className="bg-white p-2 rounded-2xl shadow-xl shadow-indigo-950/5 border border-gray-100 flex items-center">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Cari judul atau ayat Alkitab..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-[1.6rem] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* LIST */}
      <main className="mx-auto mt-6 w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:mt-10">
        {paginatedData.length === 0 && (
          <p className="text-center text-gray-400 py-10">
            Tidak ada hasil ditemukan.
          </p>
        )}

        {paginatedData.map((item) => (
          <section
            key={item.id}
            onClick={() => setSelectedItem({ ...item, content: item.excerpt })}
            className="group relative cursor-pointer overflow-hidden border-b border-slate-100 bg-white p-4 transition hover:bg-slate-50 sm:p-6"
          >
            <section className="absolute top-0 right-0">
              <span className="rounded-bl-xl bg-amber-50 px-3 py-1.5 text-[9px] font-bold uppercase text-amber-900 sm:px-5">
                {item.category}
              </span>
            </section>

            <section className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <div className="flex h-fit w-fit min-w-20 flex-row items-center gap-2 rounded-xl bg-slate-50 p-3 sm:min-w-24 sm:flex-col sm:gap-0 sm:p-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  {item.date.split(" ")[1]}
                </span>
                <span className="text-2xl font-black leading-none text-amber-900 sm:my-1 sm:text-3xl">
                  {item.date.split(" ")[0]}
                </span>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                  {item.date.split(" ")[2]}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <span className="flex items-center gap-2 text-indigo-500 font-semibold text-[10px] uppercase mb-2">
                  <BookOpen size={12} /> {item.verse}
                </span>
                <h3 className="mb-3 break-words text-lg font-bold text-slate-900 transition-colors group-hover:text-amber-800 sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600 sm:mb-6">
                  "{item.excerpt}"
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-600">
                      {item.author}
                    </span>
                  </div>
                  <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:justify-end sm:gap-4">
                    <button
                      type="button"
                      className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-amber-800 transition hover:gap-2"
                    >
                      Baca Selengkapnya <ArrowRight size={14} />
                    </button>
                    <section className="flex items-center justify-end gap-1 sm:gap-2">
                      <button
                        type="button"
                        aria-label={`Edit ${item.title}`}
                        className="cursor-pointer rounded-lg p-2 text-amber-800 transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 sm:p-2.5"
                        onClick={(i) => {
                          i.stopPropagation();
                        }}
                        children={<Edit2 size={18} />}
                      />

                      <button
                        type="button"
                        aria-label={`Hapus ${item.title}`}
                        className="cursor-pointer rounded-lg p-2 text-rose-700 transition hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 sm:p-2.5"
                        onClick={(i) => {
                          i.stopPropagation();
                          setItemToDelete(item);
                        }}
                        children={<Trash2 size={18} />}
                      />
                    </section>
                  </div>
                </div>
              </div>
            </section>
          </section>
        ))}
      </main>

      <PaginationFooter
        currentPage={currentPage}
        pageSize={itemsPerPage}
        totalItems={filteredRenungan.length}
        onPageChange={setCurrentPage}
        itemLabel="renungan"
      />
      <DeleteModal
        isOpen={Boolean(itemToDelete)}
        onClose={() => setItemToDelete(null)}
        onConfirm={() => {
          setRenunganList((previous) =>
            previous.filter((entry) => entry.id !== itemToDelete?.id),
          );
          setItemToDelete(null);
        }}
        title="Hapus renungan?"
        description="Renungan yang dihapus tidak lagi tersedia di daftar."
        itemName={itemToDelete?.title}
        confirmText="Ya, hapus renungan"
      />
    </section>
  );
}
