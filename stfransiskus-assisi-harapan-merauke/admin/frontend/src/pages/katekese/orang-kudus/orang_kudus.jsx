import { useState, useMemo } from "react";
import {
  Search,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Star,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import Detail from "../../../component/detail";

export default function OrangKudus() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  const itemsPerPage = 6;

  const [saintsList] = useState([
    {
      id: 1,
      name: "St. Fransiskus Asisi",
      feastDay: "04 Okt",
      patronOf: "Hewan & Lingkungan",
      summary:
        "Dikenal karena cintanya pada kemiskinan dan persaudaraan dengan alam semesta.",
      image: "https://picsum.photos/seed/saints1/400/400",
    },
    {
      id: 2,
      name: "St. Teresa dari Kalkuta",
      feastDay: "05 Sep",
      patronOf: "Orang Miskin",
      summary:
        "Pendiri Misionaris Kasih yang melayani orang yang paling miskin di antara yang miskin.",
      image: "https://picsum.photos/seed/saints2/400/400",
    },
    {
      id: 3,
      name: "St. Yohanes Paulus II",
      feastDay: "22 Okt",
      patronOf: "Keluarga & Kaum Muda",
      summary:
        "Paus yang membawa gereja memasuki milenium baru dengan semangat dialog.",
      image: "https://picsum.photos/seed/saints3/400/400",
    },
    {
      id: 4,
      name: "St. Antonius Padua",
      feastDay: "13 Jun",
      patronOf: "Barang Hilang",
      summary:
        "Pujangga Gereja yang dikenal sebagai pengkhotbah ulung dan pembuat mukjizat.",
      image: "https://picsum.photos/seed/saints4/400/400",
    },
    {
      id: 5,
      name: "St. Monika",
      feastDay: "27 Ags",
      patronOf: "Ibu & Istri",
      summary:
        "Teladan kesabaran doa seorang ibu bagi pertobatan anaknya, St. Agustinus.",
      image: "https://picsum.photos/seed/saints5/400/400",
    },
    {
      id: 6,
      name: "St. Sebastianus",
      feastDay: "20 Jan",
      patronOf: "Olahragawan",
      summary:
        "Martir gereja perdana yang menunjukkan keberanian iman yang luar biasa.",
      image: "https://picsum.photos/seed/saints6/400/400",
    },
  ]);

  const filteredSaints = useMemo(() => {
    return saintsList.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, saintsList]);

  const totalPages = Math.ceil(filteredSaints.length / itemsPerPage);
  const paginatedData = filteredSaints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (selectedItem) {
    return (
      <div className="fixed top-0 bottom-0 right-0 left-[80px] overflow-y-auto bg-white">
        <Detail
          title={selectedItem.name}
          content={selectedItem.summary}
          image={selectedItem.image}
          date={selectedItem.feastDay}
          author="Admin Paroki"
          onBack={() => setSelectedItem(null)}
        />
      </div>
    );
  }

  return (
    <section className="min-h-screen pb-20">
      {/* HERO */}
      <div className="relative w-full pt-16 pb-24 px-8 overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `url('https://t4.ftcdn.net/jpg/09/49/96/61/360_F_949966181_f3ALgQU8qGS9vemZ8kg3MY4wCCBBqsXg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="relative z-20 max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-[10px] uppercase tracking-widest mb-2">
              <ShieldCheck size={14} /> Arsip Digital
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
              Orang Kudus
            </h1>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="sticky top-0 z-40 -mt-7 px-6">
        <div className="max-w-3xl mx-auto py-2">
          <div className="bg-white p-2 rounded-2xl shadow-xl shadow-indigo-950/5 border border-gray-100 flex items-center">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={18}
              />
              <input
                type="text"
                placeholder="Cari nama tokoh..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none transition-all"
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
            className="group cursor-pointer bg-white border border-gray-100 p-4 hover:shadow-lg hover:border-indigo-100 transition-all duration-300 flex items-center"
          >
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-bold text-gray-800 truncate">
                  {item.name}
                </h3>
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase rounded-md">
                  {item.feastDay}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">
                <Star
                  size={10}
                  className="text-amber-400"
                  fill="currentColor"
                />
                Pelindung {item.patronOf}
              </div>
              <p className="text-xs text-gray-500 line-clamp-1 leading-relaxed italic">
                {item.summary}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="hidden md:flex items-center gap-1.5 px-4 py-2 text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 rounded-lg transition-all">
                Detail <ArrowRight size={14} />
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="p-2 text-gray-300 hover:text-gray-600"
              >
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
        ))}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2.5 rounded-xl border bg-white disabled:opacity-20 hover:bg-gray-50 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 rounded-xl text-[10px] font-black transition-all ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white"
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
              className="p-2.5 rounded-xl border bg-white disabled:opacity-20 hover:bg-gray-50 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </main>
    </section>
  );
}
