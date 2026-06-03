import { useState, useMemo } from "react";
import {
  Search,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BookOpen,
  PlayCircle,
} from "lucide-react";

export default function Renungan() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [setSelectedItem] = useState(null);
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

  return (
    <section className="min-h-screen pb-12">
      {/* HERO */}
      <header className="relative w-full h-55 overflow-hidden rounded mb-8">
        <img
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2022/07/23/2269233148.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <section className="h-full flex flex-row justify-between">
          <section className="relative z-20 h-full flex flex-col justify-end p-8">
            <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-white/50 mb-1">
              Santapan Rohani
            </p>
            <h1 className="font-serif text-3xl text-white">Renungan</h1>
          </section>

          {/* SEARCH */}
          <section className="flex flex-row  items-center">
            <section className="relative z-20 h-full flex flex-col items-center justify-end p-8">
              <div className="flex w-10 h-10 justify-center text-white items-center bg-rose-500 relative border rounded-3xl border-red-600">
                <button
                  className="cursor-pointer"
                  onClick={""}
                  children={<PlayCircle size={30} />}
                />
              </div>
            </section>
            <section className="relative z-20 h-full flex flex-col justify-end p-8">
              <section className="relative border rounded border-gray-100">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                  size={14}
                />
                <input
                  type="text"
                  placeholder="Cari judul atau ayat Alkitab..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-9 pr-4 py-2 border border-gray-100 rounded text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gray-300 transition-all bg-white"
                />
              </section>
            </section>
          </section>
        </section>
      </header>

      {/* LIST */}
      <main className="px-15">
        <section className="divide-y divide-gray-100 rounded">
          {paginatedData.length === 0 && (
            <section className="flex w-full items-center justify-center">
              <span className="text-center text-gray-300 text-xl uppercase tracking-widest py-12">
                Katekese belum di inputkan atau judul yang anda cari tidak ada.
              </span>
            </section>
          )}
          {paginatedData.map((item) => (
            <section
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="flex gap-6 p-6 md:p-8 bg-gray-100/50 hover:bg-slate-200/60 mb-1 rounded border border-gray-100 transition-colors cursor-pointer group relative overflow-hidden"
            >
              <section className="absolute top-0 right-0">
                <span className="px-6 py-1.5 bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase rounded-bl-2xl">
                  {item.category}
                </span>
              </section>
              {/* DATE BLOCK */}
              <section className="flex flex-col items-center justify-center p-4 bg-gray-50/30 rounded-2xl min-w-[100px] h-fit">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  {item.date.split(" ")[1]}
                </span>
                <span className="text-3xl font-black text-indigo-900 leading-none my-1">
                  {item.date.split(" ")[0]}
                </span>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                  {item.date.split(" ")[2]}
                </span>
              </section>

              <div className="w-px bg-gray-100 flex-shrink-0" />

              {/* CONTENT */}
              <section className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="flex items-center gap-2 text-[10px] text-gray-900 font-semibold uppercase tracking-widest mb-2">
                    <BookOpen size={16} /> {item.verse}
                  </span>
                  <h3 className="font-serif text-lg text-gray-900 mb-2 group-hover:text-gray-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-900 leading-relaxed font-light italic line-clamp-2">
                    "{item.excerpt}"
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-900 font-semibold">
                    {item.author}
                  </span>
                  <span className="text-[10px] text-gray-600 uppercase tracking-widest group-hover:text-gray-500 transition-colors flex items-center gap-1">
                    Baca selengkapnya <ArrowRight size={10} />
                  </span>
                </div>
              </section>
            </section>
          ))}
        </section>
      </main>

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
            renungan
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

//   if (selectedItem) {
//     return (
//       <div className="fixed top-0 bottom-0 right-0 left-[80px] overflow-y-auto">
//         <Detail
//           title={selectedItem.title}
//           content={selectedItem.excerpt}
//           image={selectedItem.image}
//           date={selectedItem.date}
//           author={selectedItem.author}
//           onBack={() => setSelectedItem(null)}
//         />
//       </div>
//     );
//   }
