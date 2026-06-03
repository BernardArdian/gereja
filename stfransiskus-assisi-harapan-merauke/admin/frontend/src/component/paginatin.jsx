import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Paginations(items, handlers) {
  return (
    <footer className="mt-10 flex items-center justify-between bg-gray-400/30 p-4 rounded-xl border border-gray-100">
      <p className="text-xs text-gray-600 font-medium">
        Menampilkan{" "}
        <span className="text-gray-700 font-bold">{items.paginatedData}</span>{" "}
        dari{" "}
        <span className="text-gray-700 font-bold">{items.filteredData}</span>{" "}
        dokumen
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={handlers.next}
          disabled={items.currentPage}
          className="cursor-pointer p-2 rounded-xl border disabled:opacity-20 hover:bg-gray-50 transition-all"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-1">
          {[...Array(items.totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={handlers.pages}
              className={`cursor-pointer w-9 h-9 rounded-xl text-[10px] font-black transition-all ${
                items.currentPage === i + 1
                  ? "bg-[#B38728] text-white"
                  : "bg-white text-gray-400 border border-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={handlers.prev}
          disabled={items.currentPage === items.totalPages}
          className="cursor-pointer p-2 rounded-xl border disabled:opacity-20 hover:bg-gray-50 transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </footer>
  );
}
