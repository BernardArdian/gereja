import { useState, useMemo, useEffect, useRef } from "react";
import {
  Search,
  MapPin,
  Plus,
  Trash2,
  Pencil,
  RotateCcw,
  Printer,
} from "lucide-react";

import DeleteModal from "../../alert/deleteModal.jsx";
import PaginationFooter from "../../PaginationFooter";
import Dropdown from "../../dropdown/dropdown";
import UmatDetailModal from "./umatDetailModal";
import UmatPrintPreview from "../print/umatPrintPreview";

const PAGE_SIZE = 20;
const PRINT_ROWS_PER_PAGE = 14;
const PRINT_STATUS_GROUPS = [
  { key: "belum menikah", label: "Belum menikah" },
  { key: "menikah", label: "Sudah menikah" },
  { key: "duda", label: "Duda" },
  { key: "janda", label: "Janda" },
];

function normalizeMaritalStatus(item) {
  const status = (item.statusNikah || item.status || "belum menikah")
    .toLowerCase()
    .replaceAll("_", " ");
  return status === "sudah menikah" ? "menikah" : status;
}

function isSacramentComplete(item, key) {
  const family = item.rawData?.keluarga || {};
  const candidates = [
    item[key],
    item.rawData?.[key],
    item.rawData?.single?.[key],
    item.rawData?.personal?.[key],
    family.statusSakramentSuami?.[key],
    family.statusSakramentIstri?.[key],
    ...(family.anak || []).map((child) => child[key]),
  ];

  return candidates.some((value) =>
    Array.isArray(value)
      ? value.some((entry) => entry?.status === "sudah")
      : value?.status === "sudah",
  );
}

export default function TableUmat({
  umatList = [],
  onEdit,
  onDelete,
  onAdd,
  loading = false,
  deleteError = "",
  currentPage = 1,
  onPageChange = () => {},
  highlightedUmatId = null,
  onHighlightComplete,
}) {
  const tableRef = useRef(null);
  const [stasiFilter, setStasiFilter] = useState("");
  const [statusNikahFilter, setStatusNikahFilter] = useState("");
  const [sakramenFilter, setSakramenFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const hasDropdownFilter = Boolean(
    stasiFilter || statusNikahFilter || sakramenFilter,
  );
  const clearFilters = () => {
    setSearchQuery("");
    setStatusNikahFilter("");
    setStasiFilter("");
    setSakramenFilter("");
    onPageChange(1);
  };
  useEffect(() => {
    if (!highlightedUmatId) return undefined;

    tableRef.current
      ?.querySelector(
        `[data-umat-id="${CSS.escape(String(highlightedUmatId))}"]`,
      )
      ?.scrollIntoView({ behavior: "smooth", block: "center" });

    const timeoutId = window.setTimeout(() => {
      onHighlightComplete?.();
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [highlightedUmatId, onHighlightComplete]);

  const filteredUmat = useMemo(() => {
    return (umatList || []).filter((item) => {
      const query = searchQuery.trim().toLowerCase();
      const status = normalizeMaritalStatus(item);
      const stasi = item.stasiKeluarga || item.lingkungan || "Tanpa Stasi";
      const matchesSearch =
        !query ||
        item.name?.toLowerCase().includes(query) ||
        item.noKk?.toLowerCase().includes(query);
      const matchesStatus =
        !statusNikahFilter ||
        status ===
          (statusNikahFilter === "lajang"
            ? "belum menikah"
            : statusNikahFilter);
      const matchesStasi = !stasiFilter || stasi === stasiFilter;
      const matchesSacrament =
        !sakramenFilter ||
        (sakramenFilter === "Perkawinan"
          ? status === "menikah"
          : isSacramentComplete(
              item,
              sakramenFilter === "Komuni Pertama"
                ? "komuni"
                : sakramenFilter.toLowerCase(),
            ));

      return matchesSearch && matchesStatus && matchesStasi && matchesSacrament;
    });
  }, [searchQuery, statusNikahFilter, stasiFilter, sakramenFilter, umatList]);

  const totalPages = Math.ceil(filteredUmat.length / PAGE_SIZE);
  const activePage = Math.min(currentPage, Math.max(totalPages, 1));
  const paginatedUmat = filteredUmat.slice(
    (activePage - 1) * PAGE_SIZE,
    activePage * PAGE_SIZE,
  );
  const stasiOptions = [
    ...new Set(
      umatList
        .map((item) => item.stasiKeluarga || item.lingkungan)
        .filter(Boolean),
    ),
  ].sort((a, b) => a.localeCompare(b, "id"));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedUmat, setSelectedUmat] = useState(null);
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);
  const printPages = useMemo(
    () =>
      PRINT_STATUS_GROUPS.flatMap((group) => {
        const rows = filteredUmat.filter(
          (item) => normalizeMaritalStatus(item) === group.key,
        );
        const pageCount = Math.ceil(rows.length / PRINT_ROWS_PER_PAGE);
        return Array.from({ length: pageCount }, (_, pageIndex) => ({
          ...group,
          rows: rows.slice(
            pageIndex * PRINT_ROWS_PER_PAGE,
            (pageIndex + 1) * PRINT_ROWS_PER_PAGE,
          ),
          pageIndex,
          pageCount,
          totalRows: rows.length,
        }));
      }),
    [filteredUmat],
  );
  const reportDate = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
  }).format(new Date());

  const openDeleteModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    return onDelete?.(selectedId);
  };

  return (
    <main className="w-full space-y-6 antialiased">
      {/* SEARCH BAR - Modern Floating Style */}
      <header className="mx-auto max-w-6xl">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-semibold text-slate-900">
            Daftar umat{" "}
            <span className="text-sm font-normal text-slate-500">
              ({filteredUmat.length.toLocaleString("id-ID")})
            </span>
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPrintPreviewOpen(true)}
              disabled={loading || filteredUmat.length === 0}
              className="inline-flex min-h-10 w-fit cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Printer size={16} aria-hidden="true" />
              Cetak daftar
            </button>
            <button
              type="button"
              onClick={onAdd}
              className="inline-flex min-h-10 w-fit cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-700 px-3.5 text-sm font-semibold text-white transition hover:bg-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
            >
              <Plus size={16} aria-hidden="true" />
              Tambah umat
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <section className="relative min-w-0">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              aria-label="Cari nama atau nomor kartu keluarga"
              placeholder="Cari Nama atau No. KK..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onPageChange(1);
              }}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all"
            />
          </section>
          <Dropdown
            ariaLabel="Filter status pernikahan"
            value={statusNikahFilter}
            onChange={(value) => {
              setStatusNikahFilter(value);
              onPageChange(1);
            }}
            className="md:w-44"
            options={[
              { value: "", label: "Semua status" },
              { value: "lajang", label: "Belum menikah" },
              { value: "menikah", label: "Sudah menikah" },
              { value: "janda", label: "Janda" },
              { value: "duda", label: "Duda" },
            ]}
          />
          <Dropdown
            ariaLabel="Filter stasi"
            value={stasiFilter}
            onChange={(value) => {
              setStasiFilter(value);
              onPageChange(1);
            }}
            className="md:w-44"
            options={[
              { value: "", label: "Semua stasi" },
              ...stasiOptions.map((stasi) => ({
                value: stasi,
                label: stasi,
              })),
            ]}
          />

          <Dropdown
            ariaLabel="Filter sakramen"
            value={sakramenFilter}
            onChange={(value) => {
              setSakramenFilter(value);
              onPageChange(1);
            }}
            className="md:w-44"
            options={[
              { value: "", label: "Semua sakramen" },
              { value: "Baptis", label: "Baptis" },
              { value: "Komuni Pertama", label: "Komuni Pertama" },
              { value: "Krisma", label: "Krisma" },
              { value: "Perkawinan", label: "Perkawinan" },
            ]}
          />
        </div>
        {hasDropdownFilter && (
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={clearFilters}
              aria-label="Hapus semua filter dan pencarian"
              className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
            >
              <RotateCcw size={15} aria-hidden="true" />
              Clear filter
            </button>
          </div>
        )}
      </header>

      {/* TABEL DATA  */}
      <section
        ref={tableRef}
        className="bg-white rounded border border-gray-100 overflow-x-auto"
      >
        <table className="w-full text-left border-separate border-spacing-0 min-w-150 md:min-w-full">
          <thead>
            <tr className="text-gray-900 text-center font-serif">
              <th className="px-4 md:px-8 py-5 text-[11px] uppercase tracking-[0.15em] border-b border-gray-400">
                Data Umat & KK
              </th>
              {/* Sembunyikan kolom tertentu di mobile jika perlu, atau biarkan overflow-x-auto menangani */}
              <th className="px-4 md:px-6 py-5 text-[11px] uppercase tracking-[0.15em] border-b border-gray-400">
                Status Nikah
              </th>
              <th className="px-4 md:px-6 py-5 text-[11px] uppercase tracking-[0.15em] border-b border-gray-400">
                Sakramen
              </th>
              <th className="px-4 md:px-8 py-5 text-[11px] uppercase tracking-[0.15em] border-b border-gray-400">
                Kelola
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-12 text-center text-sm text-slate-500"
                >
                  Memuat data umat…
                </td>
              </tr>
            ) : paginatedUmat.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-12 text-center text-sm text-slate-500"
                >
                  Tidak ada data umat yang sesuai dengan pencarian atau filter.
                </td>
              </tr>
            ) : (
              paginatedUmat.map((item) => (
                <tr
                  key={item.id}
                  data-umat-id={item.id}
                  tabIndex={0}
                  aria-label={`Lihat detail umat ${item.name}`}
                  onClick={() => setSelectedUmat(item)}
                  onKeyDown={(event) => {
                    if (
                      event.target === event.currentTarget &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      setSelectedUmat(item);
                    }
                  }}
                  className={`group cursor-pointer transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-600 ${
                    item.id === highlightedUmatId
                      ? "umat-row-highlight"
                      : item.statusHidup === "meninggal"
                        ? "bg-black/20"
                        : ""
                  }`}
                >
                  {/* INFO UTAMA */}
                  <td className="px-4 md:px-8 py-5">
                    <div className="flex flex-col items-center md:items-start">
                      <span
                        className={`text-center md:text-left text-base font-bold tracking-tight ${item.statusHidup === "meninggal" ? "text-slate-800" : ""}`}
                      >
                        {item.name} {item.statusHidup === "meninggal" && "†"}
                      </span>
                      <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 text-[11px] font-medium text-slate-600 mt-1 uppercase tracking-wide">
                        <div className="flex items-center gap-1">
                          <MapPin size={12} />
                          {item.stasiKeluarga ||
                            item.lingkungan ||
                            "Tanpa Stasi"}
                        </div>
                        <span className="hidden sm:inline">•</span>
                        <span>KK: {item.noKk || "-"}</span>
                      </div>
                    </div>
                  </td>

                  {/* STATUS NIKAH */}
                  <td
                    className="px-4 md:px-6 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <section className="flex items-center justify-center gap-2">
                      <span
                        className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border transition-all ${
                          (item.statusNikah || item.status) === "menikah"
                            ? "bg-indigo-50 border-indigo-100 text-indigo-600"
                            : (item.statusNikah || item.status) === "janda" ||
                                (item.statusNikah || item.status) === "duda"
                              ? "bg-amber-50 border-amber-100 text-amber-600"
                              : "bg-blue-50 border-slate-100 text-gray-900"
                        }`}
                      >
                        {item.statusNikah || item.status || "belum menikah"}
                      </span>
                    </section>
                  </td>

                  {/* SAKRAMEN */}
                  <td className="px-4 md:px-6 py-4 text-center">
                    <div className="flex justify-center gap-1.5">
                      {["baptis", "komuni", "krisma"].map((s) => {
                        const isDone = isSacramentComplete(item, s);
                        if (!isDone) return null;
                        return (
                          <div
                            key={s}
                            className="w-7 h-7 md:w-8 md:h-8 rounded-xl flex items-center justify-center text-[9px] md:text-[10px] font-bold uppercase transition-all border bg-emerald-50 border-emerald-100  text-slate-900"
                          >
                            {s === "krisma" ? s[0] + s[1] : s[0] + s[2]}
                          </div>
                        );
                      })}
                    </div>
                  </td>

                  {/* AKSI */}
                  <td
                    className="px-4 md:px-8 py-4 text-right relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <section className="flex flex-col sm:flex-row items-center justify-center gap-1 md:gap-2">
                      <button
                        type="button"
                        aria-label={`Edit data ${item.name}`}
                        className="flex w-full cursor-pointer items-center justify-center gap-1 rounded-xl p-2 text-amber-800 transition-colors hover:bg-amber-100 sm:w-auto"
                        title="Edit Data Umat"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(item);
                        }}
                      >
                        <Pencil size={18} />
                        <span className="text-[10px] font-bold uppercase md:hidden lg:inline">
                          edit
                        </span>
                      </button>
                      <button
                        type="button"
                        aria-label={`Hapus data ${item.name}`}
                        className="flex w-full cursor-pointer items-center justify-center gap-1 rounded-xl p-2 text-rose-700 transition-colors hover:bg-rose-50 sm:w-auto"
                        title="Hapus Data Umat"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(item.id);
                        }}
                      >
                        <Trash2 size={18} />
                        <span className="text-[10px] font-bold uppercase md:hidden lg:inline">
                          hapus
                        </span>
                      </button>
                    </section>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <PaginationFooter
        currentPage={activePage}
        pageSize={PAGE_SIZE}
        totalItems={filteredUmat.length}
        onPageChange={onPageChange}
        itemLabel="umat"
      />

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedId(null);
        }}
        onConfirm={confirmDelete}
        title="Hapus Data Umat?"
        description="Data umat yang dihapus tidak dapat dipulihkan."
        itemName={umatList.find((item) => item.id === selectedId)?.name}
        confirmText="Ya, hapus data umat"
        errorMessage={deleteError}
      />
      <UmatDetailModal
        umat={selectedUmat}
        onClose={() => setSelectedUmat(null)}
      />
    </main>
  );
}
