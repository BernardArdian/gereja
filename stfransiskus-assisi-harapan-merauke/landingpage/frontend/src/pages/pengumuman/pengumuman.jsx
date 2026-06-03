import { useState } from "react";
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

export default function Pengumuman() {
  const [stasiFilter, setStasiFilter] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Handler untuk buka detail
  const handleShowDetail = (item) => {
    setSelectedDetail(item);
    setIsDetailOpen(true);
  };

  // Data Dummy (Simulasi data yang sudah ada)
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
  ]);

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
      <header className="py-4 border-b border-amber-500 mb-4">
        <section className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
              <select
                className="pl-9 pr-8 py-2 border border-gray-300 rounded text-sm text-gray-500 outline-none appearance-none cursor-pointer bg-white focus:border-gray-300 transition-all"
                value={stasiFilter}
                onChange={(e) => {
                  setStasiFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="Semua">Semua Stasi</option>
                <option value="Harapan">Stasi Harapan</option>
                <option value="Kurik">Stasi Kurik</option>
              </select>
            </section>
          </section>
        </section>
      </header>

      {/* GRID */}
      <main className="max-w-7xl mx-auto w-full flex-1 py-10">
        <section className="px-15">
          {paginatedData.length > 0 ? (
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 divide-gray-100 divide-x gap-1 rounded overflow-hidden">
              {paginatedData.map((item) => (
                <form
                  key={item.id}
                  onClick={() => handleShowDetail(item)}
                  className="bg-gray-100/50 hover:bg-slate-200/50 border border-gray-100 rounded transition-colors cursor-pointer flex flex-col p-8 group"
                >
                  {/* BADGE */}
                  <span
                    className={`self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border mb-6 ${
                      item.status === "pernikahan"
                        ? "border-red-500 text-red-600"
                        : "border-gray-300 text-gray-800"
                    }`}
                    children={item.status}
                  ></span>

                  {/* TITLE */}
                  <h3
                    className="font-serif text-lg text-gray-900 leading-snug mb-3 group-hover:text-gray-500 transition-colors"
                    children={
                      item.status === "pernikahan" ? (
                        <span
                          className="italic"
                          children={`${item.pernikahanData.namaPria} & ${item.pernikahanData.namaWanita}`}
                        />
                      ) : (
                        `Pengumuman ${item.status}`
                      )
                    }
                  />

                  <p
                    className="text-xs text-gray-900 leading-relaxed font-light line-clamp-3 flex-1"
                    children={item.description}
                  />

                  {/* FOOTER */}
                  <footer className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-2">
                    <form className="flex items-center gap-2 text-[10px] text-gray-900 uppercase tracking-widest">
                      <MapPin size={11} />
                      <span children={`Stasi ${item.stasi}`} />
                    </form>
                    <section className="flex justify-between text-[10px] text-gray-900 uppercase tracking-widest">
                      <div
                        className="flex items-center gap-1.5"
                        children={
                          <>
                            <Calendar size={11} />

                            {item.status === "pernikahan"
                              ? item.pernikahanData.tanggalPernikahan
                              : item.tanggal}
                          </>
                        }
                      />
                      <div
                        className="flex items-center gap-1.5"
                        children={
                          <>
                            <Clock size={11} />
                            {item.waktu} WITA
                          </>
                        }
                      />
                    </section>
                  </footer>
                </form>
              ))}
            </section>
          ) : (
            <section className="flex flex-col items-center justify-center py-32 text-gray-300">
              <Search size={36} className="mb-4" />
              <p
                className="text-xs uppercase tracking-widest"
                children={"Data tidak ditemukan"}
              />
            </section>
          )}
        </section>
        {/* PAGINATION */}
        {totalPages > 1 && (
          <footer className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
            <p className="text-xs text-gray-100">
              Menampilkan{" "}
              <span
                className="text-gray-700 font-serif font-medium"
                children={paginatedData.length}
              />{" "}
              dari{" "}
              <span
                className="text-gray-700 font-serif font-medium"
                children={filteredData.length}
              />{" "}
              pengumuman
            </p>
            <div
              className="flex items-center gap-1"
              children={
                <>
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="cursor-pointer p-2 border border-gray-100 rounded hover:bg-gray-50 disabled:opacity-20 transition-all"
                    children={<ChevronLeft size={14} />}
                  />
                  <div
                    className="flex gap-1"
                    children={[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`cursor-pointer w-8 h-8 rounded text-[11px] font-medium transition-all ${
                          currentPage === i + 1
                            ? "bg-gray-900 text-white"
                            : "border border-gray-100 text-gray-400 hover:bg-gray-50"
                        }`}
                        children={i + 1}
                      />
                    ))}
                  />

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="cursor-pointer p-2 border border-gray-100 rounded hover:bg-gray-50 disabled:opacity-20 transition-all"
                    children={<ChevronRight size={14} />}
                  />
                </>
              }
            />
          </footer>
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

{
  /* MODAL COMPONENT */
}
{
  /* <PengumumanComponent
        isOpen={isModalOpen}
        editMode={editMode}
        formData={formData}
        selectedStatus={selectedStatus}
        isSubmitting={isSubmitting}
        previews={{ pria: previewPria, wanita: previewWanita }}
        validation={() =>
          selectedStatus && formData.stasi && formData.description
        }
        handlers={{
          cancel: () => {
            setIsModalOpen(false);
            resetForm();
          },
          submit: handleSubmit,
          input: handleInputChange,
          status: handleStatusChange,
          pernikahan: (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
              ...prev,
              pernikahanData: { ...prev.pernikahanData, [name]: value },
            }));
          },
          pranikah: (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
              ...prev,
              dataPranikah: { ...prev.dataPranikah, [name]: value },
            }));
          },
          foto: handleFotoChange,
        }}
      /> */
}
