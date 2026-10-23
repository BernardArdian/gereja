import { Plus } from "lucide-react";
import DppTable from "../table/dppTable";

export default function ListAnggotaDpp({
  data,
  handlers,
  actionLabel,
  //onInputClick,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:px-6">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Anggota Dewan Pastoral Paroki
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            St. Fransiskus Assisi Harapan Makmur
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span
            className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800"
            children={`${data.length} anggota`}
          />

          {actionLabel && handlers?.onInputClick && (
            <button
              type="button"
              onClick={() => handlers.onInputClick(data)}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <Plus size={14} aria-hidden="true" />
              {actionLabel}
            </button>
          )}
        </div>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full min-w-160 border-collapse text-left">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200 text-left">
              <th
                scope="col"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6"
              >
                Nama
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6"
              >
                Jabatan
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6"
              >
                Periode
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
            {data.length ? (
              data.map((item, index) => (
                <DppTable
                  key={`${item.nama}-${index}`}
                  data={item}
                  handlers={handlers}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  Belum ada anggota DPP. Tambahkan anggota untuk mulai mengelola
                  data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
