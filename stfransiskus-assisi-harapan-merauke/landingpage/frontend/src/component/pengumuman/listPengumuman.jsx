import { MapPin, Calendar, Clock } from "lucide-react";

const badgeColor = (status) => {
  if (status === "pernikahan") return "bg-rose-50 text-rose-700";
  if (status === "misa") return "bg-sky-50 text-sky-700";
  return "bg-amber-50 text-amber-800";
};

export default function ListPengumuman({ data, handler }) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {data.map((item) => (
        <article
          key={item.id}
          onClick={() => handler.showDetail(item)}
          className="group flex cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-amber-200 hover:shadow-md sm:p-6"
        >
          <span
            className={`mb-4 inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${badgeColor(item.status)}`}
          >
            {item.status}
          </span>
          <h2 className="mb-2 text-lg font-semibold leading-snug text-slate-900 transition group-hover:text-amber-900">
            {item.status === "pernikahan" ? (
              <span className="italic">
                {item.pernikahanData.namaPria} &{" "}
                {item.pernikahanData.namaWanita}
              </span>
            ) : (
              `Pengumuman ${item.status}`
            )}
          </h2>
          <p className="flex-1 text-sm leading-6 text-slate-600">
            {item.description}
          </p>
          <footer className="mt-5 space-y-3 border-t border-slate-100 pt-4">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
              <MapPin size={15} className="text-slate-400" aria-hidden="true" />
              Stasi {item.stasi}
            </p>
            <div className="flex flex-wrap justify-between gap-x-4 gap-y-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} aria-hidden="true" />
                {item.status === "pernikahan"
                  ? item.pernikahanData.tanggalPernikahan
                  : item.tanggal}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} aria-hidden="true" />
                {item.waktu} WITA
              </span>
            </div>
          </footer>
        </article>
      ))}
    </section>
  );
}
