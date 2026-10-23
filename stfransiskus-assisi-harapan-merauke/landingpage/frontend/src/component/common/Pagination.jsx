import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemCount,
  totalCount,
  itemLabel,
  className = "",
}) {
  return (
    <footer
      className={`flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <p className="text-sm text-slate-600">
        Menampilkan {itemCount} dari {totalCount} {itemLabel}
      </p>
      <nav
        aria-label="Navigasi halaman"
        className="flex items-center gap-1 overflow-x-auto"
      >
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label="Halaman sebelumnya"
          className="cursor-pointer rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={14} aria-hidden="true" />
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              aria-current={currentPage === pageNumber ? "page" : undefined}
              aria-label={`Halaman ${pageNumber}`}
              className={`h-9 min-w-9 cursor-pointer rounded-lg px-2 text-xs font-semibold transition ${
                currentPage === pageNumber
                  ? "bg-amber-700 text-white"
                  : "border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {pageNumber}
            </button>
          ),
        )}
        <button
          type="button"
          onClick={() =>
            onPageChange(Math.min(totalPages, currentPage + 1))
          }
          disabled={currentPage === totalPages}
          aria-label="Halaman berikutnya"
          className="cursor-pointer rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={14} aria-hidden="true" />
        </button>
      </nav>
    </footer>
  );
}
