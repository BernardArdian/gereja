import { useMemo, useState } from "react";
import { Edit2, FileText, Plus, Search, Trash2, Users } from "lucide-react";

import InputAdministratif from "../../component/administratif/input_administratif";
import PaginationFooter from "../../component/PaginationFooter";
import DeleteModal from "../../component/alert/deleteModal";
import Dropdown from "../../component/dropdown/dropdown";

const initialDocuments = [
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
];

const PAGE_SIZE = 7;

export default function AdministratifGereja() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredDocuments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return documents.filter((document) => {
      const matchesSearch =
        !query ||
        document.name.toLowerCase().includes(query) ||
        document.category.toLowerCase().includes(query) ||
        document.pic.toLowerCase().includes(query);
      return (
        matchesSearch &&
        (!categoryFilter || document.category === categoryFilter)
      );
    });
  }, [categoryFilter, documents, searchQuery]);

  const pageCount = Math.ceil(filteredDocuments.length / PAGE_SIZE);
  const page = Math.min(currentPage, Math.max(1, pageCount));
  const paginatedDocuments = filteredDocuments.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const handleSave = (formData) => {
    const date =
      editingDocument?.date ||
      new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date());

    if (editingDocument) {
      setDocuments((previous) =>
        previous.map((document) =>
          document.id === editingDocument.id
            ? { ...document, ...formData, date }
            : document,
        ),
      );
    } else {
      setDocuments((previous) => [
        { ...formData, date, id: Date.now() },
        ...previous,
      ]);
      setCurrentPage(1);
    }
    setEditingDocument(null);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (!documentToDelete) return;
    setDocuments((previous) =>
      previous.filter((item) => item.id !== documentToDelete.id),
    );
    setDocumentToDelete(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDocument(null);
  };

  return (
    <section className="min-h-full w-full bg-slate-50">
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-amber-700">
              Arsip dan dokumen
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Administratif gereja
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Kelola dokumen administratif Paroki St. Fransiskus Assisi.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingDocument(null);
              setIsModalOpen(true);
            }}
            className="inline-flex min-h-11 w-fit cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
          >
            <Plus size={18} aria-hidden="true" />
            Tambah dokumen
          </button>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Cari dokumen administratif"
                placeholder="Cari nama dokumen, kategori, atau penanggung jawab"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100"
              />
            </div>
            <Dropdown
              value={categoryFilter}
              onChange={(value) => {
                setCategoryFilter(value);
                setCurrentPage(1);
              }}
              ariaLabel="Filter kategori dokumen"
              placeholder="Semua kategori"
              className="sm:w-56"
              options={[
                { value: "", label: "Semua kategori" },
                ...[...new Set(documents.map((item) => item.category))]
                  .sort()
                  .map((category) => ({ value: category, label: category })),
              ]}
            />
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="border-b border-slate-200 px-4 py-4 sm:px-6">
            <h2 className="font-semibold text-slate-900">Daftar dokumen</h2>
            <p className="mt-1 text-xs text-slate-500">
              {filteredDocuments.length.toLocaleString("id-ID")} dokumen
            </p>
          </header>
          <div className="overflow-x-auto">
            <table className="w-full min-w-170 border-collapse text-left">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th
                    scope="col"
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6"
                  >
                    Nama dokumen
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6"
                  >
                    Kategori
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6"
                  >
                    Penanggung jawab
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6"
                  >
                    Kelola
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedDocuments.length ? (
                  paginatedDocuments.map((document) => (
                    <tr
                      key={document.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-4 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <span className="rounded-lg bg-amber-50 p-2 text-amber-800">
                            <FileText size={17} aria-hidden="true" />
                          </span>
                          <div className="min-w-0">
                            <p className="wrap-break-word text-sm font-semibold text-slate-900">
                              {document.name}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {document.date}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 sm:px-6">
                        <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                          {document.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                        <span className="inline-flex items-center gap-2">
                          <Users
                            size={15}
                            className="text-slate-400"
                            aria-hidden="true"
                          />
                          {document.pic}
                        </span>
                      </td>
                      <td className="px-4 py-4 sm:px-6">
                        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                          {document.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            aria-label={`Edit ${document.name}`}
                            onClick={() => {
                              setEditingDocument(document);
                              setIsModalOpen(true);
                            }}
                            className="cursor-pointer rounded-lg p-2 text-amber-800 transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
                          >
                            <Edit2 size={17} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            aria-label={`Hapus ${document.name}`}
                            onClick={() => setDocumentToDelete(document)}
                            className="cursor-pointer rounded-lg p-2 text-rose-700 transition hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
                          >
                            <Trash2 size={17} aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      Tidak ada dokumen yang sesuai dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <PaginationFooter
          currentPage={page}
          pageSize={PAGE_SIZE}
          totalItems={filteredDocuments.length}
          onPageChange={setCurrentPage}
          itemLabel="dokumen"
        />
      </main>
      {isModalOpen && (
        <InputAdministratif
          initialData={editingDocument}
          onClose={closeModal}
          onSubmit={handleSave}
        />
      )}
      <DeleteModal
        isOpen={Boolean(documentToDelete)}
        onClose={() => setDocumentToDelete(null)}
        onConfirm={handleDelete}
        title="Hapus dokumen administratif?"
        description="Dokumen yang dihapus tidak dapat dipulihkan."
        itemName={documentToDelete?.name}
        confirmText="Ya, hapus dokumen"
      />
    </section>
  );
}
