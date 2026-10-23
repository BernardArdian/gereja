import { useState, useMemo } from "react";
import {
  Heart,
  Search,
  BookOpen,
  Clock,
  Users,
  MoreVertical,
  ArrowRight,
  Trash2,
  Edit2,
  Circle,
} from "lucide-react";

import Detail from "../../../component/detail";
import PaginationFooter from "../../../component/PaginationFooter";
import DeleteModal from "../../../component/alert/deleteModal";

export default function Devosi() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  //const [_isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 6; // Menampilkan 6 kartu per halaman

  const [devosiList, setDevosiList] = useState([
    {
      id: 1,
      title: "Doa Koronka",
      schedule: "Setiap Jam 15.00",
      location: "Kapel Adorasi",
      members: "45 Orang",
      category: "Rutin",
      image: "https://picsum.photos/seed/pray1/800/600",
    },
    {
      id: 2,
      title: "Novena Tiga Salam Maria",
      schedule: "9 Hari Berturut",
      location: "Gereja Pusat",
      members: "Umum",
      category: "Khusus",
      image: "https://picsum.photos/seed/pray2/800/600",
    },
    {
      id: 3,
      title: "Legio Mariae",
      schedule: "Setiap Sabtu 16.00",
      location: "Aula Paroki",
      members: "20 Orang",
      category: "Grup",
      image: "https://picsum.photos/seed/pray3/800/600",
    },
    {
      id: 4,
      title: "Adorasi Sakramen Mahakudus",
      schedule: "Kamis Pertama",
      location: "Gereja Utama",
      members: "Seluruh Umat",
      category: "Rutin",
      image: "https://picsum.photos/seed/pray4/800/600",
    },
    {
      id: 5,
      title: "Devosi Hati Kudus Yesus",
      schedule: "Jumat Pertama",
      location: "Gereja Utama",
      members: "Umum",
      category: "Rutin",
      image: "https://picsum.photos/seed/pray5/800/600",
    },
    {
      id: 6,
      title: "Kelompok Doa Karismatik",
      schedule: "Setiap Rabu Malam",
      location: "Aula Stasi",
      members: "35 Orang",
      category: "Grup",
      image: "https://picsum.photos/seed/pray6/800/600",
    },
    {
      id: 7,
      title: "Doa Rosario Lingkungan",
      schedule: "Senin & Kamis",
      location: "Lingkungan",
      members: "Warga",
      category: "Rutin",
      image: "https://picsum.photos/seed/pray7/800/600",
    },
  ]);

  // --- LOGIC SEARCH & PAGINATION ---
  const filteredDevosi = useMemo(() => {
    return devosiList.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, devosiList]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredDevosi.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Kembali ke halaman 1 saat mencari
  };

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
      {/* COMPACT HERO SECTION */}
      <header className="relative w-full overflow-hidden rounded-2xl px-5 py-10 sm:px-8 sm:py-14">
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `url('https://algonzcollectionshop.com/wp-content/uploads/2025/05/1-1.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center-top",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="relative z-20 max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-[10px] uppercase tracking-widest mb-2">
              <BookOpen size={14} /> Kehidupan Spiritual & Doa
            </div>
            <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Devosi
            </h1>
          </div>
        </div>
        <div className="absolute top-0 right-0 opacity-20 transform translate-x-10 -translate-y-5 text-rose-500 pointer-events-none z-10">
          <Heart size={180} className="sm:h-75 sm:w-75" />
        </div>
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
                placeholder="Cari jadwal atau nama devosi..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <main className="mx-auto mt-6 w-full max-w-6xl px-0 sm:mt-10 sm:px-2">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedData.length === 0 && (
            <p className="col-span-full rounded-xl border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
              Tidak ada devosi yang cocok dengan pencarian.
            </p>
          )}
          {paginatedData.map((item) => (
            <section
              key={item.id}
              onClick={() =>
                setSelectedItem({ ...item, content: item.schedule })
              }
              className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <section className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-80"></div>
                <section className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-[9px] font-black text-white rounded-lg tracking-widest uppercase">
                    {item.category}
                  </span>
                </section>
              </section>

              <section className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="mb-4 wrap-break-word text-lg font-bold leading-tight text-slate-900 transition-colors group-hover:text-amber-800 sm:text-xl">
                  {item.title}
                </h3>

                <section className="space-y-3 mb-6">
                  <div className="flex min-w-0 items-center gap-3 text-sm font-medium text-slate-700">
                    <div className="shrink-0 rounded-xl bg-amber-50 p-2 text-amber-800">
                      <Clock size={14} />
                    </div>
                    <span className="wrap-break-word">{item.schedule}</span>
                  </div>
                  <div className="flex min-w-0 items-center gap-3 text-sm font-medium text-slate-700">
                    <div className="shrink-0 rounded-xl bg-amber-50 p-2 text-amber-800">
                      <Users size={14} />
                    </div>
                    <span className="wrap-break-word">{item.members}</span>
                  </div>
                </section>

                <footer className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedItem({ ...item, content: item.schedule })
                    }
                    className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-2 text-xs font-semibold text-amber-800 transition hover:bg-amber-50"
                  >
                    Detail Panduan <ArrowRight size={14} />
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
        totalItems={filteredDevosi.length}
        onPageChange={setCurrentPage}
        itemLabel="devosi"
      />
      <DeleteModal
        isOpen={Boolean(itemToDelete)}
        onClose={() => setItemToDelete(null)}
        onConfirm={() => {
          setDevosiList((previous) =>
            previous.filter((entry) => entry.id !== itemToDelete?.id),
          );
          setItemToDelete(null);
        }}
        title="Hapus devosi?"
        description="Devosi yang dihapus tidak lagi tersedia di daftar."
        itemName={itemToDelete?.title}
        confirmText="Ya, hapus devosi"
      />
    </section>
  );
}
