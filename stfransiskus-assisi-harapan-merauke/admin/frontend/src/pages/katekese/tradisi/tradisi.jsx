import { useState, useMemo } from "react";
import {
  BookOpen,
  Search,
  History,
  Calendar,
  ArrowRight,
  MoreVertical,
  Trash2,
  Edit2,
} from "lucide-react";

import Detail from "../../../component/detail";
import PaginationFooter from "../../../component/PaginationFooter";
import DeleteModal from "../../../component/alert/deleteModal";

export default function Tradisi() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  //const [_isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 6;

  // Data dummy tradisi
  const [tradisiData, setTradisiData] = useState([
    {
      id: 1,
      title: "Perarakan Patung Maria",
      location: "Gereja Pusat",
      period: "Mei & Oktober",
      description:
        "Tradisi doa Rosario keliling lingkungan setiap malam di bulan Maria.",
      image: "https://picsum.photos/seed/maria/800/600",
      category: "LITURGI",
    },
    {
      id: 2,
      title: "Pesta Pelindung Paroki",
      location: "Pusat Paroki",
      period: "15 Agustus",
      description: "Perayaan syukur pelindung paroki dengan pesta rakyat.",
      image: "https://picsum.photos/seed/pesta/800/600",
      category: "BUDAYA",
    },
    {
      id: 3,
      title: "Misa Inkulturasi",
      location: "Stasi Kurik",
      period: "Acara Khusus",
      description: "Perpaduan tata gerak musik tradisional dalam Ekaristi.",
      image: "https://picsum.photos/seed/culture/800/600",
      category: "BUDAYA",
    },
    {
      id: 4,
      title: "Visualisasi Jalan Salib",
      location: "Pusat Paroki",
      period: "Jumat Agung",
      description: "Tablo kisah sengsara Yesus Kristus oleh OMK.",
      image: "https://picsum.photos/seed/salib/800/600",
      category: "LITURGI",
    },
    {
      id: 5,
      title: "Pemberkatan Benih",
      location: "Stasi Harapan",
      period: "Musim Tanam",
      description: "Syukur atas hasil bumi dan pemberkatan bibit tani.",
      image: "https://picsum.photos/seed/seed/800/600",
      category: "SOSIAL",
    },
    {
      id: 6,
      title: "Api Unggun Paskah",
      location: "Seluruh Stasi",
      period: "Vigili Paskah",
      description: "Tradisi penyalaan lilin Paskah dari api suci.",
      image: "https://picsum.photos/seed/fire/800/600",
      category: "LITURGI",
    },

    {
      id: 7,
      title: "Perarakan Patung Maria",
      location: "Gereja Pusat",
      period: "Mei & Oktober",
      description:
        "Tradisi doa Rosario keliling lingkungan setiap malam di bulan Maria.",
      image: "https://picsum.photos/seed/maria/800/600",
      category: "LITURGI",
    },
    {
      id: 8,
      title: "Pesta Pelindung Paroki",
      location: "Pusat Paroki",
      period: "15 Agustus",
      description: "Perayaan syukur pelindung paroki dengan pesta rakyat.",
      image: "https://picsum.photos/seed/pesta/800/600",
      category: "BUDAYA",
    },
    {
      id: 9,
      title: "Misa Inkulturasi",
      location: "Stasi Kurik",
      period: "Acara Khusus",
      description: "Perpaduan tata gerak musik tradisional dalam Ekaristi.",
      image: "https://picsum.photos/seed/culture/800/600",
      category: "BUDAYA",
    },
    {
      id: 10,
      title: "Visualisasi Jalan Salib",
      location: "Pusat Paroki",
      period: "Jumat Agung",
      description: "Tablo kisah sengsara Yesus Kristus oleh OMK.",
      image: "https://picsum.photos/seed/salib/800/600",
      category: "LITURGI",
    },
    {
      id: 11,
      title: "Pemberkatan Benih",
      location: "Stasi Harapan",
      period: "Musim Tanam",
      description: "Syukur atas hasil bumi dan pemberkatan bibit tani.",
      image: "https://picsum.photos/seed/seed/800/600",
      category: "SOSIAL",
    },
    {
      id: 12,
      title: "Api Unggun Paskah",
      location: "Seluruh Stasi",
      period: "Vigili Paskah",
      description: "Tradisi penyalaan lilin Paskah dari api suci.",
      image: "https://picsum.photos/seed/fire/800/600",
      category: "LITURGI",
    },
  ]);

  const filteredTradisi = useMemo(() => {
    return tradisiData.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, tradisiData]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTradisi = filteredTradisi.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Jika ada item yang dipilih, render halaman Detail secara Fullscreen
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
      <header className="relative w-full overflow-hidden rounded-2xl px-5 py-10 sm:px-8 sm:py-14">
        {/* LAYER GAMBAR  */}
        <section
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `url('https://katedraljakarta.or.id/_astro/interior.CfU15dnr_Z1CCVS0.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* LAYER OVERLAY  */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* LAYER KONTEN  */}
        <section className="relative z-20 max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-[10px] uppercase tracking-widest mb-2">
              <History size={14} /> Warisan Budaya & Iman
            </div>
            <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Tradisi Gereja
            </h1>
          </div>
        </section>

        {/* ICON DEKORATIF */}
        <section className="absolute top-0 right-0 opacity-20 transform translate-x-10 text-amber-500 -translate-y-5 pointer-events-none z-10">
          <BookOpen size={180} className="sm:h-75 sm:w-75" />
        </section>
      </header>

      {/* STICKY SEARCH BAR */}
      <section className="sticky top-0 z-40 -mt-5 px-1 sm:-mt-7 sm:px-6">
        <div className="max-w-3xl mx-auto py-2">
          <div className="bg-white p-2 rounded-2xl shadow-xl shadow-indigo-950/5 border border-gray-100 flex items-center">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Cari nama tradisi..."
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
      </section>

      {/* MAIN CONTENT */}
      <main className="mx-auto mt-6 w-full max-w-6xl px-0 sm:mt-10 sm:px-2">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedTradisi.length === 0 && (
            <p className="col-span-full rounded-xl border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
              Tidak ada tradisi yang cocok dengan pencarian.
            </p>
          )}
          {paginatedTradisi.map((item) => (
            <section
              key={item.id}
              onClick={() =>
                setSelectedItem({
                  ...item,
                  title: item.title,
                  content: item.description,
                })
              }
              className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <section className="relative aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/40 backdrop-blur-md text-[9px] font-black text-white rounded-lg tracking-widest uppercase border border-white/10">
                    {item.category}
                  </span>
                </div>
              </section>

              <section className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-amber-800">
                  <Calendar size={12} /> {item.period}
                </div>
                <h3 className="mb-2 wrap-break-word text-lg font-bold leading-tight text-slate-900 transition-colors group-hover:text-amber-800 sm:text-xl">
                  {item.title}
                </h3>
                <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>

                <footer className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedItem({
                        ...item,
                        title: item.title,
                        content: item.description,
                      })
                    }
                    className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-2 text-xs font-semibold text-amber-800 transition hover:bg-amber-50"
                  >
                    Baca <ArrowRight size={14} />
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
                </footer>
              </section>
            </section>
          ))}
        </section>
      </main>
      <PaginationFooter
        currentPage={currentPage}
        pageSize={itemsPerPage}
        totalItems={filteredTradisi.length}
        onPageChange={setCurrentPage}
        itemLabel="tradisi gereja"
      />
      <DeleteModal
        isOpen={Boolean(itemToDelete)}
        onClose={() => setItemToDelete(null)}
        onConfirm={() => {
          setTradisiData((previous) =>
            previous.filter((entry) => entry.id !== itemToDelete?.id),
          );
          setItemToDelete(null);
        }}
        title="Hapus tradisi gereja?"
        description="Tradisi yang dihapus tidak lagi tersedia di daftar."
        itemName={itemToDelete?.title}
        confirmText="Ya, hapus tradisi"
      />
    </section>
  );
}
