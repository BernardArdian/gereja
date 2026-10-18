import { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

import DetailPengumuman from "../../component/detail/detailPengumuman";
import ListPengumuman from "../../component/pengumuman/listPengumuman";
import CustomDropdown from "../../component/option/dropdown";

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
    <section className="w-full min-h-screen px-4">
      {/* HEADER */}
      <header className="py-4 border-b border-amber-500 rounded-b-xl mt-1 bg-[#B38728]/60 mb-4">
        <section className="max-w-5xl ml-1 mr-1 mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <section>
            <h2
              className="font-serif text-1xl text-gray-900"
              children={"Pengumuman Gereja Paroki St.Fransiskus Assisi"}
            />
            <p
              className="text-[12px] font-semibold tracking-[0.18em] uppercase text-gray-800 mb-1"
              children={"Arsip Pengumuman Geraja"}
            />
          </section>
          <section className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <section className="relative flex-1 min-w-[240px]">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                size={14}
              />
              <input
                type="text"
                placeholder="Cari nama stasi..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gray-300 transition-all bg-white"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </section>

            {/* Filter Stasi */}
            <section className="relative">
              <Filter
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                size={13}
              />
              {/* <select
                className="pl-9 pr-8 py-2 border border-gray-300 rounded text-sm text-gray-500 outline-none appearance-none cursor-pointer bg-white focus:border-gray-300 transition-all"
                value={stasiFilter}
                onChange={(e) => {
                  setStasiFilter(e.target.value);
                  setCurrentPage(1);
                }}
                children={[
                  <option value="Semua">Semua Stasi</option>,
                  stasi.map((item) => (
                    <option
                      key={item.id}
                      value={item.value}
                      children={item.label}
                    />
                  )),
                ]}
              /> */}

              <Filter
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 z-10"
                size={13}
              />

              <CustomDropdown
                value={stasiFilter}
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
            </section>
          </section>
        </section>
      </header>

      {/* GRID */}
      <main className="max-w-7xl mx-auto w-full flex-1 py-10">
        <section
          className="px-15 pb-15"
          children={
            paginatedData.length > 0 ? (
              <ListPengumuman
                data={paginatedData}
                handler={{ showDetail: handleShowDetail }}
              />
            ) : (
              <section className="flex flex-col items-center justify-center py-32 text-gray-300">
                <Search size={36} className="mb-4" />
                <p
                  className="text-xs uppercase tracking-widest"
                  children={"Data tidak ditemukan"}
                />
              </section>
            )
          }
        />

        {/* PAGINATION */}
        {totalPages > 1 && (
          <footer
            className="flex p-5 rounded-xl bg-stone-300 items-center justify-between border-t border-gray-100 "
            children={[
              <p
                className="text-xs text-gray-100"
                children={[
                  <span
                    className="text-gray-700 font-serif font-medium"
                    children={`Menampilkan ${paginatedData.length} dari`}
                  />,
                  <span
                    className="text-gray-700 font-serif font-medium"
                    children={` ${filteredData.length} pengumuman`}
                  />,
                ]}
              />,
              <div
                className="flex items-center gap-1"
                children={[
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="cursor-pointer p-2 border border-gray-100 rounded hover:bg-gray-50 disabled:opacity-20 transition-all"
                    children={<ChevronLeft size={14} />}
                  />,
                  <div
                    className="flex gap-1"
                    children={[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`cursor-pointer w-8 h-8 rounded text-[11px] font-semibold font-medium transition-all ${
                          currentPage === i + 1
                            ? "bg-gray-900 text-white"
                            : "border border-gray-100 text-gray-900 hover:bg-gray-50"
                        }`}
                        children={i + 1}
                      />
                    ))}
                  />,

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="cursor-pointer p-2 border border-gray-100 rounded hover:bg-gray-50 disabled:opacity-20 transition-all"
                    children={<ChevronRight size={14} />}
                  />,
                ]}
              />,
            ]}
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
