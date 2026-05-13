import DppTable from "./table/dppTable";

export default function DewanPastoralParoki() {
  return (
    <section className="pb-12">
      <div className="border border-gray-100 rounded overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 bg-green-300/30">
          <h3 className="font-serif text-xl text-gray-900">
            Anggota Dewan Pastoral Paroki St.Fransiskus Assisi Harapan Makmur -
            Merauke Papua Selatan
          </h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-center border-b font-serif border-gray-100 bg-gray-50/55">
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
          <tbody className="divide-y divide-gray-50">
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
