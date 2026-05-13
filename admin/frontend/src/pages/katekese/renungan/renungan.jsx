import { useState, useMemo } from "react";
import {
  Quote,
  Search,
  Calendar,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

import Detail from "../../../component/detail";

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

  const totalPages = Math.ceil(filteredRenungan.length / itemsPerPage);
  const paginatedData = filteredRenungan.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (selectedItem) {
    return (
      <div className="fixed top-0 bottom-0 right-0 left-[80px] overflow-y-auto">
        <Detail
          title={selectedItem.title}
          content={selectedItem.excerpt}
          image={selectedItem.image}
          date={selectedItem.date}
          author={selectedItem.author}
          onBack={() => setSelectedItem(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* HERO */}
      <div className="relative w-full pt-16 pb-24 px-8 overflow-hidden rounded-2xl">
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
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
              Renungan
            </h1>
          </div>
        </div>

        <div className="absolute top-0 right-0 opacity-20 transform translate-x-10 -translate-y-5 text-white pointer-events-none z-10">
          <Quote size={300} />
        </div>
      </div>

      {/* SEARCH */}
      <div className="sticky top-0 z-40 -mt-8 px-6">
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
      </div>

      {/* LIST */}
      <main className="border border-gray-400 rounded overflow-hidden ml-15 mr-15 mt-10">
        {paginatedData.length === 0 && (
          <p className="text-center text-gray-400 py-10">
            Tidak ada hasil ditemukan.
          </p>
        )}

        {paginatedData.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group cursor-pointer bg-white border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0">
              <span className="px-6 py-1.5 bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase rounded-bl-2xl">
                {item.category}
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl min-w-[100px] h-fit">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  {item.date.split(" ")[1]}
                </span>
                <span className="text-3xl font-black text-indigo-900 leading-none my-1">
                  {item.date.split(" ")[0]}
                </span>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                  {item.date.split(" ")[2]}
                </span>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 text-indigo-500 font-bold text-[10px] uppercase mb-2">
                  <Calendar size={12} /> {item.verse}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 italic mb-6">
                  "{item.excerpt}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-[10px] font-bold">
                      {item.author.charAt(3)}
                    </div>
                    <span className="text-xs font-bold text-gray-600">
                      {item.author}
                    </span>
                  </div>
                  <button className="flex items-center gap-1 text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:gap-3 transition-all">
                    Baca Selengkapnya <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {totalPages > 1 && (
        <div className="pt-10 flex items-center justify-center gap-3">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-3 rounded-2xl bg-white border border-gray-100 shadow-sm disabled:opacity-30 hover:bg-indigo-600 hover:text-white transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-11 h-11 rounded-2xl text-xs font-black transition-all ${
                  currentPage === i + 1
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "bg-white text-gray-400 border border-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-3 rounded-2xl bg-white border border-gray-100 shadow-sm disabled:opacity-30 hover:bg-indigo-600 hover:text-white transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
