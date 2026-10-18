import { useState, useMemo } from "react";
import {
  Search,
  MoreVertical,
  Star,
  ShieldCheck,
  ArrowRight,
  Trash2,
  Edit2,
  Users2,
} from "lucide-react";

import Detail from "../../../component/detail";
import PaginationFooter from "../../../component/PaginationFooter";
import DeleteModal from "../../../component/alert/deleteModal";

export default function OrangKudus() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const itemsPerPage = 6;

  const [saintsList, setSaintsList] = useState([
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

    {
      id: 7,
      name: "St. Fransiskus Asisi",
      feastDay: "04 Okt",
      patronOf: "Hewan & Lingkungan",
      summary:
        "Dikenal karena cintanya pada kemiskinan dan persaudaraan dengan alam semesta.",
      image: "https://picsum.photos/seed/saints1/400/400",
    },
    {
      id: 8,
      name: "St. Teresa dari Kalkuta",
      feastDay: "05 Sep",
      patronOf: "Orang Miskin",
      summary:
        "Pendiri Misionaris Kasih yang melayani orang yang paling miskin di antara yang miskin.",
      image: "https://picsum.photos/seed/saints2/400/400",
    },
    {
      id: 9,
      name: "St. Yohanes Paulus II",
      feastDay: "22 Okt",
      patronOf: "Keluarga & Kaum Muda",
      summary:
        "Paus yang membawa gereja memasuki milenium baru dengan semangat dialog.",
      image: "https://picsum.photos/seed/saints3/400/400",
    },
    {
      id: 10,
      name: "St. Antonius Padua",
      feastDay: "13 Jun",
      patronOf: "Barang Hilang",
      summary:
        "Pujangga Gereja yang dikenal sebagai pengkhotbah ulung dan pembuat mukjizat.",
      image: "https://picsum.photos/seed/saints4/400/400",
    },
    {
      id: 11,
      name: "St. Monika",
      feastDay: "27 Ags",
      patronOf: "Ibu & Istri",
      summary:
        "Teladan kesabaran doa seorang ibu bagi pertobatan anaknya, St. Agustinus.",
      image: "https://picsum.photos/seed/saints5/400/400",
    },
    {
      id: 12,
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

  const paginatedData = filteredSaints.slice(
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
      <header className="relative w-full overflow-hidden rounded-2xl px-5 py-10 sm:px-8 sm:py-14">
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
            <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Orang Kudus
            </h1>
          </div>
        </div>
        <div className="absolute top-0 right-0 opacity-20 text-amber-500 transform translate-x-10 -translate-y-5 pointer-events-none z-10">
          <Users2 size={180} className="sm:h-75 sm:w-75" />
        </div>
      </header>

      {/* SEARCH */}
      <section className="sticky top-0 z-40 -mt-5 px-1 sm:-mt-7 sm:px-6">
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
                  e.stopPropagation();
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none transition-all"
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
            onClick={() =>
              setSelectedItem({
                ...item,
                title: item.name,
                content: item.summary,
              })
            }
            className="group flex cursor-pointer items-center gap-3 border-b border-slate-100 bg-white p-3 transition hover:bg-slate-50 sm:gap-5 sm:p-5"
          >
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-24 sm:w-24">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2 sm:gap-3">
                <h3 className="min-w-0 text-sm font-bold text-slate-900 sm:text-lg">
                  {item.name}
                </h3>
                <span className="shrink-0 rounded-md bg-amber-50 px-2 py-0.5 text-[9px] font-bold uppercase text-amber-800">
                  {item.feastDay}
                </span>
              </div>
              <div className="mb-1 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500 sm:mb-2 sm:text-[10px]">
                <Star
                  size={10}
                  className="text-amber-400"
                  fill="currentColor"
                />
                Pelindung {item.patronOf}
              </div>
              <p className="line-clamp-2 text-[11px] leading-relaxed text-slate-600 sm:text-xs">
                {item.summary}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <button
                type="button"
                aria-label={`Lihat detail ${item.name}`}
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedItem({
                    ...item,
                    title: item.name,
                    content: item.summary,
                  });
                }}
                className="rounded-lg p-2 text-amber-800 transition hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 sm:px-3 sm:py-2"
              >
                <span className="hidden text-xs font-semibold sm:inline">
                  Detail
                </span>
                <ArrowRight size={16} className="sm:hidden" />
                <ArrowRight size={14} className="hidden sm:inline" />
              </button>
              <section className="flex items-center justify-end gap-1 sm:gap-2">
                <button
                  type="button"
                  aria-label={`Edit ${item.name}`}
                  className="cursor-pointer rounded-lg p-2 text-amber-800 transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 sm:p-2.5"
                  onClick={(i) => {
                    i.stopPropagation();
                  }}
                  children={<Edit2 size={18} />}
                />

                <button
                  type="button"
                  aria-label={`Hapus ${item.name}`}
                  className="cursor-pointer rounded-lg p-2 text-rose-700 transition hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 sm:p-2.5"
                  onClick={(i) => {
                    i.stopPropagation();
                    setItemToDelete(item);
                  }}
                  children={<Trash2 size={18} />}
                />
              </section>
            </div>
          </section>
        ))}
      </main>
      <PaginationFooter
        currentPage={currentPage}
        pageSize={itemsPerPage}
        totalItems={filteredSaints.length}
        onPageChange={setCurrentPage}
        itemLabel="orang kudus"
      />
      <DeleteModal
        isOpen={Boolean(itemToDelete)}
        onClose={() => setItemToDelete(null)}
        onConfirm={() => {
          setSaintsList((previous) =>
            previous.filter((entry) => entry.id !== itemToDelete?.id),
          );
          setItemToDelete(null);
        }}
        title="Hapus orang kudus?"
        description="Profil yang dihapus tidak lagi tersedia di daftar orang kudus."
        itemName={itemToDelete?.name}
        confirmText="Ya, hapus profil"
      />
    </section>
  );
}
