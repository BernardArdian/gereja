import { ChevronRight, ChevronLeft } from "lucide-react";

export default function Paginations(items, actions) {
  return (
    <footer className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
      <p className="text-xs text-gray-100">
        Menampilkan{" "}
        <span className="text-gray-700 font-serif font-medium">
          {items.paginateData}
        </span>
        {"  "}
        dari{"  "}
        <span className="text-gray-700 font-serif font-medium">
          {items.filteredData}{" "}
        </span>
        {"  "}
        renungan
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={actions.onClick}
          disabled={items.currentPage}
          className="cursor-pointer p-2 border border-gray-100 rounded hover:bg-gray-50 disabled:opacity-20 transition-all"
        >
          <ChevronLeft size={14} />
        </button>
        <div className="flex gap-1">
          {[...Array(items.totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={actions.onClick}
              className={`cursor-pointer w-8 h-8 rounded text-[11px] font-medium transition-all ${items.currentPage === i + 1 ? "bg-gray-900 text-white" : "border border-gray-100 text-gray-400 hover:bg-gray-50"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={actions.onClick}
          disabled={items.currentPage === items.totalPages}
          className="cursor-pointer p-2 border border-gray-100 rounded hover:bg-gray-50 disabled:opacity-20 transition-all"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </footer>
  );
}
