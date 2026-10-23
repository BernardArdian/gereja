import { useState, useMemo } from "react";
import {
  Search,
  Clock,
  Users,
  ChevronRight,
} from "lucide-react";
import Pagination from "../../../component/common/Pagination";
import DetailBerita from "../../../component/detail/detailBerita";

export default function Devosi() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const itemsPerPage = 6;

  const [devosiList] = useState([
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

  const filteredData = useMemo(
    () =>
      devosiList.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery, devosiList],
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
        type="devosi"
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
            backgroundImage: `url('https://algonzcollectionshop.com/wp-content/uploads/2025/05/1-1.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center 15%",
          }}
        />
        {/* <img
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `url('https://algonzcollectionshop.com/wp-content/uploads/2025/05/1-1.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
          }}
        /> */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <section className="relative z-20 flex min-h-52 flex-col justify-between gap-6 p-5 sm:flex-row sm:items-end sm:p-8">
          <section>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              Kehidupan Spiritual & Doa
            </p>
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              Devosi
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
                type="search"
                aria-label="Cari devosi"
                placeholder="Cari jadwal atau nama devosi..."
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

      {/* GRID */}
      <main className="px-1 pb-8 sm:px-2">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        children=
          {paginatedData.length === 0 && (
            <p className="col-span-full rounded-xl border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
              Tidak ada devosi yang cocok dengan pencarian.
            </p>
          ),
          paginatedData.map((item) => (
            <section
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <section className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-80" />
                <section className="absolute left-4 top-4">
                  <span className="rounded-lg border border-white/30 bg-white/20 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white backdrop-blur-md">
                    {item.category}
                  </span>
                </section>
              </section>

              <section className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="mb-4 text-lg font-bold leading-tight text-slate-900 transition-colors group-hover:text-amber-800 sm:text-xl">
                  {item.title}
                </h3>
                <section className="mb-6 space-y-3">
                  <div className="flex min-w-0 items-center gap-3 text-sm font-medium text-slate-700">
                    <div className="shrink-0 rounded-xl bg-amber-50 p-2 text-amber-800">
                      <Clock size={14} aria-hidden="true" />
                    </div>
                    <span className="break-words">{item.schedule}</span>
                  </div>
                  <div className="flex min-w-0 items-center gap-3 text-sm font-medium text-slate-700">
                    <div className="shrink-0 rounded-xl bg-amber-50 p-2 text-amber-800">
                      <Users size={14} aria-hidden="true" />
                    </div>
                    <span className="break-words">{item.members}</span>
                  </div>
                </section>
                <footer className="mt-auto border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-2 text-xs font-semibold text-amber-800 transition hover:bg-amber-50"
                  >
                    Detail Panduan <ChevronRight size={14} />
                  </button>
                </footer>
              </section>
            </section>
          ))}
        >
        </section>
      </main>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemCount={paginatedData.length}
          totalCount={filteredData.length}
          itemLabel="devosi"
          className="mt-4"
        />
      )}
    </section>
  );
}
