import { useState, useMemo } from "react";
import {
  Search,
  ArrowRight,
} from "lucide-react";
import Pagination from "../../../component/common/Pagination";
import DetailBerita from "../../../component/detail/detailBerita";

export default function OrangKudus() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
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

  if (selectedItem) {
    return (
      <DetailBerita
        item={selectedItem}
        type="orang-kudus"
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemCount={paginatedData.length}
          totalCount={filteredData.length}
          itemLabel="orang kudus"
          className="mt-4"
        />
      )}
    </section>
  );
}
