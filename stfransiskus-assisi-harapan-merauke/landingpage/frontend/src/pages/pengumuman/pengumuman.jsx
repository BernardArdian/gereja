import { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Search,
  Filter,
} from "lucide-react";

import DetailPengumuman from "../../component/detail/detailPengumuman";
import ListPengumuman from "../../component/pengumuman/listPengumuman";
import CustomDropdown from "../../component/common/CustomDropdown";
import Pagination from "../../component/common/Pagination";

export default function Pengumuman() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleShowDetail = (item) => {
    setSelectedDetail(item);
    setIsDetailOpen(true);
  };

  const [announcements] = useState([
    {
      id: 1,
      stasi: "Harapan",
      status: "pernikahan",
      waktu: "10:00",
      description: "Pernikahan keluarga besar Yohanes.",
      pernikahanData: {
        namaPria: "Yohanes Andre",
        namaWanita: "Maria Clara",
        tanggalPernikahan: "2024-05-20",
        tempat: "Gereja Katedral",
      },
    },
    {
      id: 2,
      stasi: "Kurik",
      status: "misa",
      waktu: "08:00",
      tanggal: "2024-05-15",
      description: "Misa syukur pembukaan bulan Maria.",
    },
    {
      id: 3,
      stasi: "Harapan",
      status: "pernikahan",
      waktu: "10:00",
      description: "Pernikahan keluarga besar Yohanes.",
      pernikahanData: {
        namaPria: "Yohanes Andre",
        namaWanita: "Maria Clara",
        tanggalPernikahan: "2024-05-20",
        tempat: "Gereja Katedral",
      },
    },
    {
      id: 4,
      stasi: "Kurik",
      status: "misa",
      waktu: "08:00",
      tanggal: "2024-05-15",
      description: "Misa syukur pembukaan bulan Maria.",
    },
    {
      id: 5,
      stasi: "Harapan",
      status: "pernikahan",
      waktu: "10:00",
      description: "Pernikahan keluarga besar Yohanes.",
      pernikahanData: {
        namaPria: "Yohanes Andre",
        namaWanita: "Maria Clara",
        tanggalPernikahan: "2024-05-20",
        tempat: "Gereja Katedral",
      },
    },
    {
      id: 6,
      stasi: "Kurik",
      status: "misa",
      waktu: "08:00",
      tanggal: "2024-05-15",
      description: "Misa syukur pembukaan bulan Maria.",
    },
    {
      id: 7,
      stasi: "Harapan",
      status: "pernikahan",
      waktu: "10:00",
      description: "Pernikahan keluarga besar Yohanes.",
      pernikahanData: {
        namaPria: "Yohanes Andre",
        namaWanita: "Maria Clara",
        tanggalPernikahan: "2024-05-20",
        tempat: "Gereja Katedral",
      },
    },
    {
      id: 8,
      stasi: "Kurik",
      status: "misa",
      waktu: "08:00",
      tanggal: "2024-05-15",
      description: "Misa syukur pembukaan bulan Maria.",
    },
    {
      id: 9,
      stasi: "Harapan",
      status: "pernikahan",
      waktu: "10:00",
      description: "Pernikahan keluarga besar Yohanes.",
      pernikahanData: {
        namaPria: "Yohanes Andre",
        namaWanita: "Maria Clara",
        tanggalPernikahan: "2024-05-20",
        tempat: "Gereja Katedral",
      },
    },
    {
      id: 10,
      stasi: "Kurik",
      status: "misa",
      waktu: "08:00",
      tanggal: "2024-05-15",
      description: "Misa syukur pembukaan bulan Maria.",
    },
    {
      id: 11,
      stasi: "Harapan",
      status: "pernikahan",
      waktu: "10:00",
      description: "Pernikahan keluarga besar Yohanes.",
      pernikahanData: {
        namaPria: "Yohanes Andre",
        namaWanita: "Maria Clara",
        tanggalPernikahan: "2024-05-20",
        tempat: "Gereja Katedral",
      },
    },
    {
      id: 12,
      stasi: "Kurik",
      status: "misa",
      waktu: "08:00",
      tanggal: "2024-05-15",
      description: "Misa syukur pembukaan bulan Maria.",
    },
    {
      id: 13,
      stasi: "candra",
      status: "misa",
      waktu: "08:00",
      tanggal: "2024-05-15",
      description: "Misa syukur pembukaan bulan Maria.",
    },
  ]);

  const stasi = [
    { id: 1, value: "Harapan", label: "Paroki Harapan" },
    { id: 2, value: "Kurik", label: "Stasi Kurik" },
    { id: 3, value: "candra", label: "Stasi candra" },
  ];

  const [stasiFilter, setStasiFilter] = useState(
    () => localStorage.getItem("stasiFilter") || "Semua",
  );

  useEffect(() => {
    localStorage.setItem("stasiFilter", stasiFilter);
  }, [stasiFilter]);

  // --- FILTER & SEARCH ---
  const filteredData = announcements.filter((item) => {
    const matchesStasi = stasiFilter === "Semua" || item.stasi === stasiFilter;
    const contentToSearch = `
      ${item.description} 
      ${item.pernikahanData?.namaPria || ""} 
      ${item.pernikahanData?.namaWanita || ""} 
      ${item.status}
    `.toLowerCase();
    const matchesSearch = contentToSearch.includes(searchQuery.toLowerCase());
    return matchesStasi && matchesSearch;
  });

  // --- PAGINATION ---
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <section className="min-h-screen w-full bg-slate-50">
      <main className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6 sm:py-8">
        <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-amber-800">
              Informasi umat
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Pengumuman paroki
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Jadwal misa, pernikahan, dan informasi dari setiap stasi.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-0 flex-1 sm:min-w-60">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Cari pengumuman"
                placeholder="Cari pengumuman..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="relative flex items-center">
              <Filter
                className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                size={16}
                aria-hidden="true"
              />
              <CustomDropdown
                value={stasiFilter}
                ariaLabel="Filter berdasarkan stasi"
                onChange={(val) => {
                  setStasiFilter(val);
                  setCurrentPage(1);
                }}
                options={[
                  { value: "Semua", label: "Semua Stasi" },
                  ...stasi.map((item) => ({
                    value: item.value,
                    label: item.label,
                  })),
                ]}
              />
            </div>
          </div>
        </header>

        {paginatedData.length > 0 ? (
          <ListPengumuman
            data={paginatedData}
            handler={{ showDetail: handleShowDetail }}
          />
        ) : (
          <section className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 text-slate-500">
            <Search size={36} className="mb-4 text-slate-300" />
            <p className="text-sm font-medium">Pengumuman tidak ditemukan</p>
            <p className="mt-1 text-xs">Ubah kata kunci atau filter stasi.</p>
          </section>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemCount={paginatedData.length}
            totalCount={filteredData.length}
            itemLabel="pengumuman"
          />
        )}
      </main>

      <DetailPengumuman
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        data={selectedDetail}
      />
    </section>
  );
}
