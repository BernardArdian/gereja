import DppTable from "./table/dppTable";

export default function DewanPastoralParoki() {
  return (
    <section className="pb-12">
      <div className="border border-stone-600 rounded overflow-hidden">
        <div className="flex flex-col px-8 py-6 border-b border-gray-100 bg-sky-800/50">
          <h3 className="font-serif text-xl text-gray-900">
            Anggota Dewan Pastoral Paroki St.Fransiskus Assisi
          </h3>
          <h3 className="font-serif text-xl text-gray-900">
            Harapan Makmur - Merauke Papua Selatan
          </h3>
        </div>
        <table className="w-full bg-sky-700/50 text-left border-collapse">
          <thead>
            <tr className="text-center border-b font-serif border-gray-800 bg-gray-50/55">
              <th className="px-8 py-4 text-[0.70em] font-medium text-gray-900 uppercase tracking-widest">
                Nama
              </th>
              <th className="px-8 py-4 text-[0.70em] font-medium text-gray-900 uppercase tracking-widest">
                Jabatan
              </th>
              <th className="px-8 py-4 text-[0.70em] font-medium text-gray-900 uppercase tracking-widest">
                Periode
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 bg-stone-300">
            <DppTable nama="arwind" jabatan="Anggota" periode="2022 - 2025" />
            <DppTable nama="mawar" jabatan="Anggota" periode="2022 - 2025" />
            <DppTable nama="irwan" jabatan="Anggota" periode="2022 - 2025" />
            <DppTable nama="linda" jabatan="Anggota" periode="2022 - 2025" />
          </tbody>
        </table>
      </div>
    </section>
  );
}
