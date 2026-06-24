import { useState, useMemo } from "react";
import {
  Search,
  PlusCircle,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  FileText,
  Users,
  Download,
  Filter,
  CheckCircle2,
  Trash2,
  Edit2,
} from "lucide-react";

import Input_Administratif from "../../component/administratif/input_administratif";
import Paginations from "../../component/paginatin";

export default function AdministraifGereja() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const [adminList] = useState([
    {
      id: 1,
      name: "Struktur DPP 2024-2027",
      category: "Organisasi",
      date: "02 Feb 2026",
      status: "Aktif",
      pic: "Sekretariat",
    },
    {
      id: 2,
      name: "Data Umat Lingkungan St. Maria",
      category: "Kependudukan",
      date: "01 Feb 2026",
      status: "Update",
      pic: "Ketua Lingkungan",
    },
    {
      id: 3,
      name: "Laporan Keuangan Tahunan",
      category: "Keuangan",
      date: "28 Jan 2026",
      status: "Final",
      pic: "Bendahara",
    },
    {
      id: 4,
      name: "SOP Penggunaan Aula",
      category: "Prosedur",
      date: "25 Jan 2026",
      status: "Aktif",
      pic: "Pastoral",
    },
    {
      id: 5,
      name: "Jadwal Petugas Liturgi Feb",
      category: "Liturgi",
      date: "24 Jan 2026",
      status: "Draft",
      pic: "Koor. Liturgi",
    },
    {
      id: 6,
      name: "Akta Notaris Yayasan",
      category: "Legal",
      date: "20 Jan 2026",
      status: "Arsip",
      pic: "Sekretariat",
    },
    {
      id: 7,
      name: "Database Inventaris Paroki",
      category: "Aset",
      date: "15 Jan 2026",
      status: "Aktif",
      pic: "Sarpras",
    },
    {
      id: 8,
      name: "MoU Kerjasama Vendor",
      category: "Legal",
      date: "10 Jan 2026",
      status: "Arsip",
      pic: "Sekretariat",
    },
  ]);

  const filteredData = useMemo(() => {
    return adminList.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, adminList]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <section className="w-full min-h-screen pl-0.5 pr-0.5">
      <main className="max-w-5xl mx-auto">
        <section className="bg-gray-500/30 h-full shadow-sm p-2">
          <header className="relative z-20 max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-5">
            <form className="flex items-center gap-4">
              <div>
                <h2 className="text-xl font-serif text-gray-900 tracking-tight">
                  Administratif Paroki St.Fransiskus Assisi.
                </h2>
                <p className="text-[10px] font-serif text-gray-900 uppercase tracking-widest">
                  Dokumen Administratif Gereja
                </p>
              </div>
            </form>

            <button
              className="flex cursor-pointer items-center text-white gap-2 px-6 py-3 text-indigo-900 
              rounded-xl text-xs font-black bg-blue-500 hover:bg-blue-500/20 hover:text-blue-500 transition-all active:scale-95 w-fit"
              onClick={(i) => {
                i.stopPropagation();
                setIsModalOpen("input");
              }}
            >
              <PlusCircle size={18} /> Tambah Dokumen
            </button>
          </header>

          <section className="w-full sticky top-0 z-30 max-w-full mb-10 overflow-hidden bg-black/5 rounded-2xl backdrop-blur-sm p-2">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white p-2 rounded-2xl border border-gray-100 flex items-center">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Cari dokumen atau pengurus..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-12 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none transition-all"
                  />
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-500 rounded-xl text-xs font-bold hover:bg-gray-100 transition-all">
                  <Filter size={16} /> Filter
                </button>
              </div>
            </div>
          </section>

          {/* TABLE CONTENT */}
          <main className="max-w-6xl mx-auto px-6 mt-5">
            <form className="border border-gray-100 rounded overflow-hidden ml-15 mr-15">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 font-serif text-center  text-gray-900 border-b border-gray-100">
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">
                      Nama Dokumen
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">
                      Kategori
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">
                      PIC / Penanggung Jawab
                    </th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">
                      Kelola
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paginatedData.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-indigo-50/30 cursor-pointer transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-white transition-colors">
                            <FileText size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-800 leading-none mb-1">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-gray-400 font-medium">
                              {item.date}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Users size={14} className="text-gray-300" />
                          <span className="text-xs text-gray-600 font-medium">
                            {item.pic}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <section className="flex items-center justify-center gap-2">
                          <button
                            className="cursor-pointer p-3 bg-slate-200 rounded text-yellow-700 hover:bg-amber-600 hover:text-white transition-all active:scale-75"
                            onClick={(i) => {
                              i.stopPropagation();
                            }}
                          >
                            <Edit2 size={18} />
                          </button>

                          <button
                            className="cursor-pointer p-3 bg-slate-200 rounded text-rose-400 hover:bg-red-600 hover:text-white transition-all active:scale-75"
                            onClick={(i) => {
                              i.stopPropagation();
                            }}
                          >
                            <Trash2 size={18} />
                          </button>
                        </section>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <footer className="mt-10 flex items-center justify-between bg-gray-400/30 p-4 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-600 font-medium">
                  Menampilkan{" "}
                  <span className="text-gray-700 font-bold">
                    {paginatedData.length}
                  </span>{" "}
                  dari{" "}
                  <span className="text-gray-700 font-bold">
                    {filteredData.length}
                  </span>{" "}
                  dokumen
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="cursor-pointer p-2 rounded-xl border disabled:opacity-20 hover:bg-gray-50 transition-all"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <div className="flex gap-1">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`cursor-pointer w-9 h-9 rounded-xl text-[10px] font-black transition-all ${
                          currentPage === i + 1
                            ? "bg-[#B38728] text-white"
                            : "bg-white text-gray-400 border border-gray-50"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="cursor-pointer p-2 rounded-xl border disabled:opacity-20 hover:bg-gray-50 transition-all"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </footer>

              // <Paginations totalPages={totalPages} />
            )}
          </main>
        </section>
      </main>
      {isModalOpen === "input" && (
        <Input_Administratif onClose={setIsModalOpen(null)} />
      )}
    </section>
  );
}
