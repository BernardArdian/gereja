import { ChevronLeft, ChevronRight } from "lucide-react";

function getVisiblePages(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const first = Math.max(1, Math.min(currentPage - 1, totalPages - 3));
  const last = Math.min(totalPages, first + 3);
  const pages = new Set([1, ...Array.from({ length: last - first + 1 }, (_, i) => first + i), totalPages]);
  return [...pages].sort((a, b) => a - b);
}

export default function PaginationFooter({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  itemLabel = "item",
}) {
  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <footer className="mt-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:p-4">
      <p className="text-xs font-medium text-slate-600">
        Menampilkan{" "}
        <span className="font-semibold text-slate-900">
          {startItem.toLocaleString("id-ID")}–{endItem.toLocaleString("id-ID")}
        </span>{" "}
        dari{" "}
        <span className="font-semibold text-slate-900">
          {totalItems.toLocaleString("id-ID")}
        </span>{" "}
        {itemLabel}
      </p>

      <nav
        aria-label="Navigasi halaman"
        className="flex items-center justify-between gap-1 sm:justify-end"
      >
        <button
          type="button"
          aria-label="Halaman sebelumnya"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={17} aria-hidden="true" />
        </button>

        <div className="flex items-center gap-1">
          {pages.map((page, index) => {
            const previousPage = pages[index - 1];
            return (
              <span key={page} className="flex items-center gap-1">
                {previousPage && page - previousPage > 1 && (
                  <span
                    aria-hidden="true"
                    className="px-1 text-xs text-slate-400"
                  >
                    …
                  </span>
                )}
                <button
                  type="button"
                  aria-label={`Halaman ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                  onClick={() => onPageChange(page)}
                  className={`h-9 min-w-9 cursor-pointer rounded-lg px-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 ${
                    currentPage === page
                      ? "bg-amber-700 text-white"
                      : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              </span>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Halaman berikutnya"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={17} aria-hidden="true" />
        </button>
      </nav>
    </footer>
  );
}
