import { useState, useMemo } from "react";
import { Users, ChevronLeft, ChevronRight, FileText } from "lucide-react";

export default function AdministratifGereja() {
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
      (item) => item.name.toLowerCase() || item.category.toLowerCase(),
    );
  }, [adminList]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <section className="w-full min-h-screen px-4">
      <section className="max-w-5xl mx-auto">
        {/* HEADER */}
        <header className="py-4 border-b border-amber-500 mb-4">
          <h2 className="font-serif text-2xl text-gray-900">
            Administratif Paroki St. Fransiskus Assisi
          </h2>
          <p className="text-[12px] font-medium tracking-[0.18em] uppercase text-gray-800 mb-2">
            Arsip Administratif Paroki
          </p>
        </header>

        {/* TABLE */}
        <main className="max-w-5xl mx-auto px-8 py-10">
          <section className="border border-gray-100 rounded overflow-hidden ml-15 mr-15">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="font-serif border-b border-gray-100 bg-gray-50/55">
                  <th className="px-6 py-4 text-[0.70em] font-medium text-gray-800 uppercase tracking-widest">
                    Nama Dokumen
                  </th>
                  <th className="px-6 py-4 text-[0.70em] font-medium text-gray-800 uppercase tracking-widest">
                    Kategori
                  </th>
                  <th className="px-6 py-4 text-[0.70em] font-medium text-gray-800 uppercase tracking-widest">
                    PIC / Penanggung Jawab
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedData.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-gray-100/40 hover:bg-slate-200/60 cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 border border-gray-100 rounded flex items-center justify-center text-gray-600 group-hover:border-gray-200 transition-colors">
                          <FileText size={14} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800 leading-none mb-1">
                            {item.name}
                          </p>
                          <p className="text-[0.7em] text-gray-900">
                            {item.date}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 border border-gray-100 text-gray-500 text-[0.70em] font-medium rounded uppercase tracking-wider">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users size={12} className="text-gray-600" />
                        <span className="text-xs text-gray-500">
                          {item.pic}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <footer className="mt-6 flex items-center justify-between">
              <p className="text-xs text-gray-100">
                Menampilkan{" "}
                <span className="text-gray-900 font-serif font-medium">
                  {paginatedData.length}
                </span>{" "}
                dari{" "}
                <span className="text-gray-900 font-serif font-medium">
                  {filteredData.length}
                </span>{" "}
                dokumen administratif
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="cursor-pointer p-2 border border-gray-100 rounded hover:bg-gray-50 disabled:opacity-20 transition-all"
                >
                  <ChevronLeft size={14} />
                </button>
                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`cursor-pointer w-8 h-8 rounded text-[11px] font-medium transition-all ${
                        currentPage === i + 1
                          ? "bg-gray-900 text-white"
                          : "border border-gray-100 text-gray-400 hover:bg-gray-50"
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
                  className="cursor-pointer p-2 border border-gray-100 rounded hover:bg-gray-50 disabled:opacity-20 transition-all"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </footer>
          )}
        </main>
      </section>
    </section>
  );
}
