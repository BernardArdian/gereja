import { Edit2, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import DeleteModal from "../../alert/deleteModal";

export default function StasiListModal({ data, handlers, actionLabel }) {
  const [selectedStasi, setSelectedStasi] = useState(null);
  const total = data.reduce(
    (sum, stasi) => sum + Number(stasi.jumlahUmat || 0),
    0,
  );

  const confirmDelete = () => {
    if (!selectedStasi) return;
    handlers.delete(selectedStasi);
    setSelectedStasi(null);
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:px-6">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Daftar Stasi
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Paroki St. Fransiskus Assisi Harapan Makmur
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span
            className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900"
            children={`${total.toLocaleString("id-ID")} umat`}
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
        <table className="w-full min-w-225 border-collapse text-left">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">
              <th
                scope="col"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6"
              >
                Nama Stasi
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6"
              >
                Nama Gereja
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6"
              >
                Alamat
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6"
              >
                Desa
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6"
              >
                Jumlah Umat
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
              data.map((stasi) => (
                <tr key={stasi.stasi} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-900 sm:px-6">
                    {stasi.stasi}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-700 sm:px-6">
                    {stasi.namaGereja}
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600 sm:px-6">
                    {stasi.alamat}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
                    {stasi.desa}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
                      {Number(stasi.jumlahUmat || 0).toLocaleString("id-ID")}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        aria-label={`Edit ${stasi.stasi}`}
                        className="cursor-pointer rounded-lg p-2.5 text-amber-800 hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                        onClick={() => handlers.edit(stasi)}
                      >
                        <Edit2 size={17} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Hapus ${stasi.stasi}`}
                        className="cursor-pointer rounded-lg p-2.5 text-rose-700 hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                        onClick={() => setSelectedStasi(stasi)}
                      >
                        <Trash2 size={17} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  Belum ada data stasi. Tambahkan stasi untuk mulai mengelola
                  data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <DeleteModal
        isOpen={Boolean(selectedStasi)}
        onClose={() => setSelectedStasi(null)}
        onConfirm={confirmDelete}
        title="Hapus stasi?"
        description="Stasi ini akan dihapus dari data komunitas paroki."
        itemName={selectedStasi?.stasi}
        confirmText="Ya, hapus stasi"
      />
    </section>
  );
}
