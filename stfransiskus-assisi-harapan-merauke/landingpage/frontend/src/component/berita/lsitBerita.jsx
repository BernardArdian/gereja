import { Calendar, User, ExternalLink, Newspaper } from "lucide-react";

export default function ListBerita({ data, handler }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-24 text-gray-300">
        <Newspaper size={36} className="mx-auto mb-4" />
        <p className="text-xs uppercase tracking-widest">
          Berita tidak ditemukan
        </p>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-3">
      {data.map((item) => (
        <section
          key={item.id}
          onClick={() => handler.showDetail(item)}
          className="group flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-amber-200 hover:shadow-md sm:flex-row"
        >
          <section className="relative aspect-video w-full shrink-0 overflow-hidden bg-slate-100 sm:aspect-auto sm:h-auto sm:w-56">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </section>
          <section className="flex min-w-0 flex-1 flex-col justify-between p-4 sm:p-5">
            <section className="min-w-0">
              <section className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} aria-hidden="true" /> {item.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <User size={14} aria-hidden="true" /> {item.author}
                </span>
              </section>
              <h2 className="mb-2 break-words text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-amber-800 sm:text-lg">
                {item.title}
              </h2>
              {item.excerpt && (
                <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
                  {item.excerpt}
                </p>
              )}
            </section>
            <section className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
              <button
                type="button"
                aria-label={`Baca berita: ${item.title}`}
                onClick={(event) => {
                  event.stopPropagation();
                  handler.showDetail(item);
                }}
                className="inline-flex min-h-10 cursor-pointer items-center gap-1 rounded-lg px-2 text-sm font-semibold text-amber-800 transition hover:bg-amber-50 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
              >
                Baca <ExternalLink size={12} aria-hidden="true" />
              </button>
            </section>
          </section>
        </section>
      ))}
    </section>
  );
}
