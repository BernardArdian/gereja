import {
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  Users,
} from "lucide-react";

// Baris orang kudus (layout list).
export function SaintCard({ item, onOpen }) {
  return (
    <section
      onClick={() => onOpen(item)}
      className="group flex cursor-pointer items-center gap-3 border-b border-slate-100 bg-white p-3 transition hover:bg-slate-50 sm:gap-5 sm:p-5"
    >
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-24 sm:w-24">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover grayscale-[0.5] transition-all duration-500 group-hover:grayscale-0"
        />
      </div>

      <section className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2 sm:gap-3">
          <h3
            className="min-w-0 text-sm font-bold text-slate-900 sm:text-lg"
            children={item.name}
          />
          <span
            className="shrink-0 rounded-md bg-amber-50 px-2 py-0.5 text-[9px] font-bold uppercase text-amber-800"
            children={item.postDay}
          />
        </div>
        <p
          className="mb-1 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500 sm:mb-2 sm:text-[10px]"
          children={`Pelindung ${item.patronOf}`}
        />
        <p
          className="line-clamp-2 text-[11px] leading-relaxed text-slate-600 sm:text-xs"
          children={item.summary}
        />
      </section>

      <button
        type="button"
        aria-label={`Lihat detail ${item.name}`}
        onClick={(event) => {
          event.stopPropagation();
          onOpen(item);
        }}
        className="shrink-0 rounded-lg p-2 text-amber-800 transition hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 sm:px-3 sm:py-2"
      >
        <span className="hidden text-xs font-semibold sm:inline">Detail</span>
        <ArrowRight size={16} className="sm:hidden" />
        <ArrowRight size={14} className="hidden sm:inline" />
      </button>
    </section>
  );
}

// Baris renungan (layout list).
export function RenunganCard({ item, onOpen }) {
  return (
    <section
      onClick={() => onOpen(item)}
      className="group relative cursor-pointer overflow-hidden border-b border-slate-100 bg-white p-4 transition hover:bg-slate-50 sm:p-6"
    >
      <section className="absolute right-0 top-0">
        <span className="rounded-bl-xl bg-amber-50 px-3 py-1.5 text-[9px] font-bold uppercase text-amber-900 sm:px-5">
          {item.category}
        </span>
      </section>
      <section className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <div className="flex h-fit w-fit min-w-20 flex-row items-center gap-2 rounded-xl bg-slate-50 p-3 sm:min-w-24 sm:flex-col sm:gap-0 sm:p-4">
          <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-400">
            {item.date.split(" ")[1]}
          </span>
          <span className="text-2xl font-black leading-none text-amber-900 sm:my-1 sm:text-3xl">
            {item.date.split(" ")[0]}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
            {item.date.split(" ")[2]}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <span className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase text-indigo-500">
            <BookOpen size={12} aria-hidden="true" /> {item.verse}
          </span>
          <h3 className="mb-3 wrap-break-word text-lg font-bold text-slate-900 transition-colors group-hover:text-amber-800 sm:text-2xl">
            {item.title}
          </h3>
          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600 sm:mb-6">
            "{item.excerpt}"
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <span className="text-xs font-semibold text-gray-600">
              {item.author}
            </span>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onOpen(item);
              }}
              className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-amber-800 transition hover:gap-2"
            >
              Baca Selengkapnya <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}

// Kartu devosi (layout grid).
export function DevosiCard({ item, onOpen }) {
  return (
    <section
      onClick={() => onOpen(item)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <section className="relative aspect-16/10 overflow-hidden bg-slate-100">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-80" />
        <section className="absolute left-4 top-4">
          <span className="rounded-lg border border-white/30 bg-white/20 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white backdrop-blur-md">
            {item.category}
          </span>
        </section>
      </section>

      <section className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="mb-4 text-lg font-bold leading-tight text-slate-900 transition-colors group-hover:text-amber-800 sm:text-xl">
          {item.title}
        </h3>
        <section className="mb-6 space-y-3">
          <div className="flex min-w-0 items-center gap-3 text-sm font-medium text-slate-700">
            <div className="shrink-0 rounded-xl bg-amber-50 p-2 text-amber-800">
              <Clock size={14} aria-hidden="true" />
            </div>
            <span className="wrap-break-word">{item.schedule}</span>
          </div>
          <div className="flex min-w-0 items-center gap-3 text-sm font-medium text-slate-700">
            <div className="shrink-0 rounded-xl bg-amber-50 p-2 text-amber-800">
              <Users size={14} aria-hidden="true" />
            </div>
            <span className="wrap-break-word">{item.members}</span>
          </div>
        </section>
        <footer className="mt-auto border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onOpen(item);
            }}
            className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-2 text-xs font-semibold text-amber-800 transition hover:bg-amber-50"
          >
            Detail Panduan <ChevronRight size={14} />
          </button>
        </footer>
      </section>
    </section>
  );
}

// Kartu tradisi gereja (layout grid).
export function TradisiCard({ item, onOpen }) {
  return (
    <div
      onClick={() => onOpen(item)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <section className="relative aspect-video overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          <span className="rounded-lg border border-white/10 bg-black/40 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white backdrop-blur-md">
            {item.category}
          </span>
        </div>
      </section>
      <section className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-amber-800">
          <Calendar size={12} aria-hidden="true" /> {item.period}
        </div>
        <h3 className="mb-2 wrap-break-word text-lg font-bold leading-tight text-slate-900 transition-colors group-hover:text-amber-800 sm:text-xl">
          {item.title}
        </h3>
        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-slate-600">
          {item.description}
        </p>
        <footer className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onOpen(item);
            }}
            className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-2 text-xs font-semibold text-amber-800 transition hover:bg-amber-50"
          >
            Baca <ArrowRight size={14} />
          </button>
        </footer>
      </section>
    </div>
  );
}
