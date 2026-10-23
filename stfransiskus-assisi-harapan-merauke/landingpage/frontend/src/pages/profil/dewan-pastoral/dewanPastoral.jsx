import DppTable from "./table/dppTable";

export default function DewanPastoralParoki() {
  return (
    <section className="w-full pb-8">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <header className="border-b border-slate-200 px-4 py-5 sm:px-6">
          <p className="text-sm font-semibold text-amber-800">Kepemimpinan paroki</p>
          <h2 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
            Anggota Dewan Pastoral Paroki St.Fransiskus Assisi
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Harapan Makmur - Merauke Papua Selatan
          </p>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
              <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Nama
              </th>
              <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Jabatan
              </th>
              <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Periode
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <DppTable nama="arwind" jabatan="Anggota" periode="2022 - 2025" />
            <DppTable nama="mawar" jabatan="Anggota" periode="2022 - 2025" />
            <DppTable nama="irwan" jabatan="Anggota" periode="2022 - 2025" />
            <DppTable nama="linda" jabatan="Anggota" periode="2022 - 2025" />
          </tbody>
        </table>
        </div>
      </div>
    </section>
  );
}
