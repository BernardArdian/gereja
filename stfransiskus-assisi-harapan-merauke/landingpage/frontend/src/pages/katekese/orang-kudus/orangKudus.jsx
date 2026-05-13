import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function OrangKudus() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [setSelectedItem] = useState(null);
  const itemsPerPage = 6;

  const [saintsList] = useState([
    {
      id: 1,
      name: "St. Fransiskus Asisi",
      postDay: "04 Okt",
      patronOf: "Hewan & Lingkungan",
      summary:
        "Dikenal karena cintanya pada kemiskinan dan persaudaraan dengan alam semesta.",
      image: "https://picsum.photos/seed/saints1/400/400",
    },
    {
      id: 2,
      name: "St. Teresa dari Kalkuta",
      postDay: "05 Sep",
      patronOf: "Orang Miskin",
      summary:
        "Pendiri Misionaris Kasih yang melayani orang yang paling miskin di antara yang miskin.",
      image: "https://picsum.photos/seed/saints2/400/400",
    },
    {
      id: 3,
      name: "St. Yohanes Paulus II",
      postDay: "22 Okt",
      patronOf: "Keluarga & Kaum Muda",
      summary:
        "Paus yang membawa gereja memasuki milenium baru dengan semangat dialog.",
      image: "https://picsum.photos/seed/saints3/400/400",
    },
    {
      id: 4,
      name: "St. Antonius Padua",
      postDay: "13 Jun",
      patronOf: "Barang Hilang",
      summary:
        "Pujangga Gereja yang dikenal sebagai pengkhotbah ulung dan pembuat mukjizat.",
      image: "https://picsum.photos/seed/saints4/400/400",
    },
    {
      id: 5,
      name: "St. Monika",
      postDay: "27 Ags",
      patronOf: "Ibu & Istri",
      summary:
        "Teladan kesabaran doa seorang ibu bagi pertobatan anaknya, St. Agustinus.",
      image: "https://picsum.photos/seed/saints5/400/400",
    },
    {
      id: 6,
      name: "St. Sebastianus",
      postDay: "20 Jan",
      patronOf: "Olahragawan",
      summary:
        "Martir gereja perdana yang menunjukkan keberanian iman yang luar biasa.",
      image: "https://picsum.photos/seed/saints6/400/400",
    },
  ]);

  const filteredData = useMemo(
    () =>
      saintsList.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery, saintsList],
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <section className="min-h-screen pb-12">
      {/* HERO */}
      <section className="relative w-full h-48 overflow-hidden rounded mb-8">
        <img
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://t4.ftcdn.net/jpg/09/49/96/61/360_F_949966181_f3ALgQU8qGS9vemZ8kg3MY4wCCBBqsXg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <section className="h-full flex flex-row justify-between">
          <section className="relative z-20 h-full flex flex-col justify-end p-8">
            <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-white/50 mb-1">
              Perjalanan Iman
            </p>
            <h1 className="font-serif text-3xl text-white">Orang Kudus</h1>
          </section>

          {/* SEARCH */}
          <section className="relative z-20 h-full flex flex-col justify-end p-8">
            <form className="relative border rounded border-gray-100">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                size={14}
              />
              <input
                type="text"
                placeholder="Cari nama tokoh..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 border border-gray-100 rounded text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gray-300 transition-all bg-white"
              />
            </form>
          </section>
        </section>
      </section>

      {/* LIST */}
      <section className="px-15">
        <main className="divide-y divide-gray-100 border border-gray-100 rounded overflow-hidden">
          {paginatedData.length === 0 && (
            <p className="text-center text-gray-300 text-xs uppercase tracking-widest py-12">
              Tidak ada hasil ditemukan.
            </p>
          )}
          {paginatedData.map((item) => (
            <section
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-gray-100/50 hover:bg-slate-200/60 flex items-center gap-6 p-6 transition-colors cursor-pointer group"
            >
              <form className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </form>

              <section className="flex-1 min-w-0">
                <form className="flex items-center gap-3 mb-1">
                  <h3 className="font-serif text-base text-gray-900 truncate group-hover:text-gray-500 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-[10px] text-gray-800 border border-gray-100 px-2 py-0.5 rounded flex-shrink-0">
                    {item.postDay}
                  </span>
                </form>
                <p className="text-[10px] text-gray-800 uppercase tracking-widest mb-1">
                  Pelindung {item.patronOf}
                </p>
                <p className="text-xs text-white font-light line-clamp-1 group-hover:text-gray-500">
                  {item.summary}
                </p>
              </section>

              <div className="text-gray-300 group-hover:text-gray-500 transition-colors text-sm flex-shrink-0">
                →
              </div>
            </section>
          ))}
        </main>
      </section>

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
            orang Kudus
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
//       <div className="fixed top-0 bottom-0 right-0 left-[80px] overflow-y-auto bg-white">
//         <Detail
//           title={selectedItem.name}
//           content={selectedItem.summary}
//           image={selectedItem.image}
//           date={selectedItem.feastDay}
//           author="Admin Paroki"
//           onBack={() => setSelectedItem(null)}
//         />
//       </div>
//     );
//   }
