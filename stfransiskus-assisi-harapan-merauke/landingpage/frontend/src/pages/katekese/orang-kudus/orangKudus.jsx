import { useState, useMemo } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

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

    {
      id: 7,
      name: "St. Fransiskus Asisi",
      postDay: "04 Okt",
      patronOf: "Hewan & Lingkungan",
      summary:
        "Dikenal karena cintanya pada kemiskinan dan persaudaraan dengan alam semesta.",
      image: "https://picsum.photos/seed/saints1/400/400",
    },
    {
      id: 8,
      name: "St. Teresa dari Kalkuta",
      postDay: "05 Sep",
      patronOf: "Orang Miskin",
      summary:
        "Pendiri Misionaris Kasih yang melayani orang yang paling miskin di antara yang miskin.",
      image: "https://picsum.photos/seed/saints2/400/400",
    },
    {
      id: 9,
      name: "St. Yohanes Paulus II",
      postDay: "22 Okt",
      patronOf: "Keluarga & Kaum Muda",
      summary:
        "Paus yang membawa gereja memasuki milenium baru dengan semangat dialog.",
      image: "https://picsum.photos/seed/saints3/400/400",
    },
    {
      id: 10,
      name: "St. Antonius Padua",
      postDay: "13 Jun",
      patronOf: "Barang Hilang",
      summary:
        "Pujangga Gereja yang dikenal sebagai pengkhotbah ulung dan pembuat mukjizat.",
      image: "https://picsum.photos/seed/saints4/400/400",
    },
    {
      id: 11,
      name: "St. Monika",
      postDay: "27 Ags",
      patronOf: "Ibu & Istri",
      summary:
        "Teladan kesabaran doa seorang ibu bagi pertobatan anaknya, St. Agustinus.",
      image: "https://picsum.photos/seed/saints5/400/400",
    },
    {
      id: 12,
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
    <section className="w-full min-w-0 pb-8 sm:pb-12">
      {/* HERO */}
      <header className="relative mb-6 min-h-52 w-full overflow-hidden rounded-2xl sm:mb-8">
        <img
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `url('https://t4.ftcdn.net/jpg/09/49/96/61/360_F_949966181_f3ALgQU8qGS9vemZ8kg3MY4wCCBBqsXg.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <section className="relative z-20 flex min-h-52 flex-col justify-between gap-6 p-5 sm:flex-row sm:items-end sm:p-8">
          <section>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              Perjalanan Iman
            </p>
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              Orang Kudus
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
                type="text"
                aria-label="Cari orang kudus"
                placeholder="Cari nama tokoh..."
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
      <main className="px-1 pb-8 sm:px-2">
        <section className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        children=
          {paginatedData.length === 0 && (
            <p className="py-10 text-center text-sm text-slate-500">
              Tidak ada hasil ditemukan.
            </p>
          ),
          paginatedData.map((item) => (
            <section
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group flex cursor-pointer items-center gap-3 border-b border-slate-100 bg-white p-3 transition hover:bg-slate-50 sm:gap-5 sm:p-5"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-24 sm:w-24">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover grayscale-[0.5] transition-all duration-500 group-hover:grayscale-0"
                />
              </div>

              <section className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2 sm:gap-3">
                  <h3
                    className="min-w-0 text-sm font-bold text-slate-900 sm:text-lg"
                    children={item.name}
                  />
                  <span
                    className="shrink-0 rounded-md bg-amber-50 px-2 py-0.5 text-[9px] font-bold uppercase text-amber-800"
                    children={item.postDay}
                  />
                </div>
                <p
                  className="mb-1 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500 sm:mb-2 sm:text-[10px]"
                  children={`Pelindung ${item.patronOf}`}
                />
                <p
                  className="line-clamp-2 text-[11px] leading-relaxed text-slate-600 sm:text-xs"
                  children={item.summary}
                />
              </section>

              <button
                type="button"
                aria-label={`Lihat detail ${item.name}`}
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedItem(item);
                }}
                className="shrink-0 rounded-lg p-2 text-amber-800 transition hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 sm:px-3 sm:py-2"
              >
                <span className="hidden text-xs font-semibold sm:inline">
                  Detail
                </span>
                <ArrowRight size={16} className="sm:hidden" />
                <ArrowRight size={14} className="hidden sm:inline" />
              </button>
            </section>
          ))}
        />
      </main>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <footer className="mt-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            Menampilkan {paginatedData.length} dari {filteredData.length} orang kudus
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Halaman sebelumnya"
              className="cursor-pointer rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={14} />
            </button>
            <div
              className="flex gap-1"
              children={[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  aria-current={currentPage === i + 1 ? "page" : undefined}
                  className={`h-9 min-w-9 cursor-pointer rounded-lg px-2 text-xs font-semibold transition ${currentPage === i + 1 ? "bg-amber-700 text-white" : "border border-slate-200 text-slate-700 hover:bg-slate-50"}`}
                  children={i + 1}
                />
              ))}
            />
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Halaman berikutnya"
              className="cursor-pointer rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
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
