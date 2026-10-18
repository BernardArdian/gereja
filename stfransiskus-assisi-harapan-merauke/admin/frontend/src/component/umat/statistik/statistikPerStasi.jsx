import { PieChart } from "lucide-react";

const columns = [
  { key: "total", label: "Total", className: "font-semibold text-slate-900" },
  { key: "baptis", label: "Baptis" },
  { key: "komuni", label: "Komuni" },
  { key: "krisma", label: "Krisma" },
  { key: "menikah", label: "Menikah" },
  { key: "belumNikah", label: "Belum menikah" },
  { key: "duda", label: "Duda" },
  { key: "janda", label: "Janda" },
  { key: "hidup", label: "Hidup" },
  { key: "meninggal", label: "Meninggal" },
];

export default function StatistikPerStasi({ stasiDistribusi = [] }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <header className="border-b border-slate-200 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-amber-50 p-2.5 text-amber-800">
            <PieChart size={18} aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-semibold text-slate-900">
              Statistik per stasi
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Perbandingan data umat berdasarkan status dan sakramen.
            </p>
          </div>
        </div>
      </header>

      {stasiDistribusi.length === 0 ? (
        <p className="px-4 py-12 text-center text-sm text-slate-500 sm:px-6">
          Belum ada data umat untuk ditampilkan.
        </p>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-262.5 border-collapse text-left">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th
                    scope="col"
                    className="sticky left-0 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 sm:px-6"
                  >
                    Nama stasi
                  </th>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className="whitespace-nowrap px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-600"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stasiDistribusi.map((stasi) => (
                  <tr key={stasi.n} className="hover:bg-slate-50">
                    <th
                      scope="row"
                      className="sticky left-0 bg-white px-4 py-3 text-sm font-semibold text-slate-800 sm:px-6"
                    >
                      {stasi.n}
                    </th>
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-3 py-3 text-center text-sm tabular-nums text-slate-700 ${column.className || ""}`}
                      >
                        {stasi[column.key].toLocaleString("id-ID")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 p-3 md:hidden">
            {stasiDistribusi.map((stasi) => (
              <article
                key={stasi.n}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <header className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <h4 className="min-w-0 wrap-break-word text-sm font-semibold text-slate-900">
                    {stasi.n}
                  </h4>
                  <span className="shrink-0 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900">
                    Total {stasi.total.toLocaleString("id-ID")}
                  </span>
                </header>
                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
                  {columns
                    .filter((column) => column.key !== "total")
                    .map((column) => (
                      <div
                        key={column.key}
                        className="flex items-center justify-between gap-2 text-xs"
                      >
                        <dt className="text-slate-600">{column.label}</dt>
                        <dd className="font-semibold tabular-nums text-slate-900">
                          {stasi[column.key].toLocaleString("id-ID")}
                        </dd>
                      </div>
                    ))}
                </dl>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
