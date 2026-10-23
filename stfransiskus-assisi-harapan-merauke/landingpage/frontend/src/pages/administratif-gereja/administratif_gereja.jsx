import { useState, useMemo } from "react";
import { Users, FileText } from "lucide-react";
import Pagination from "../../component/common/Pagination";

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
    {
      id: 9,
      name: "Struktur DPP 2024-2027",
      category: "Organisasi",
      date: "02 Feb 2026",
      status: "Aktif",
      pic: "Sekretariat",
    },
    {
      id: 10,
      name: "Data Umat Lingkungan St. Maria",
      category: "Kependudukan",
      date: "01 Feb 2026",
      status: "Update",
      pic: "Ketua Lingkungan",
    },
    {
      id: 11,
      name: "Laporan Keuangan Tahunan",
      category: "Keuangan",
      date: "28 Jan 2026",
      status: "Final",
      pic: "Bendahara",
    },
    {
      id: 12,
      name: "SOP Penggunaan Aula",
      category: "Prosedur",
      date: "25 Jan 2026",
      status: "Aktif",
      pic: "Pastoral",
    },
    {
      id: 13,
      name: "Jadwal Petugas Liturgi Feb",
      category: "Liturgi",
      date: "24 Jan 2026",
      status: "Draft",
      pic: "Koor. Liturgi",
    },
    {
      id: 14,
      name: "Akta Notaris Yayasan",
      category: "Legal",
      date: "20 Jan 2026",
      status: "Arsip",
      pic: "Sekretariat",
    },
    {
      id: 15,
      name: "Database Inventaris Paroki",
      category: "Aset",
      date: "15 Jan 2026",
      status: "Aktif",
      pic: "Sarpras",
    },
    {
      id: 16,
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
    <section className="min-h-screen w-full bg-slate-50">
      <main className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6 sm:py-8">
        <header>
          <p className="text-sm font-semibold text-amber-700">
            Arsip dan dokumen
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Administratif gereja
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Dokumen administratif Paroki St. Fransiskus Assisi.
          </p>
        </header>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="border-b border-slate-200 px-4 py-4 sm:px-6">
            <h2 className="font-semibold text-slate-900">Daftar dokumen</h2>
            <p className="mt-1 text-xs text-slate-500">
              {filteredData.length.toLocaleString("id-ID")} dokumen
            </p>
          </header>
          <div className="overflow-x-auto">
            <table className="w-full min-w-170 border-collapse text-left">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                    Nama Dokumen
                  </th>
                  <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                    Kategori
                  </th>
                  <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                    PIC / Penanggung Jawab
                  </th>
                  <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedData.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-4 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-amber-50 p-2 text-amber-800">
                          <FileText size={17} aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <p className="wrap-break-word text-sm font-semibold text-slate-900">
                            {item.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {item.date}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                      <span className="inline-flex items-center gap-2">
                        <Users
                          size={15}
                          className="text-slate-400"
                          aria-hidden="true"
                        />
                        {item.pic}
                      </span>
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemCount={paginatedData.length}
              totalCount={filteredData.length}
              itemLabel="dokumen"
            />
          )}
        </section>
      </main>
    </section>
  );
}
