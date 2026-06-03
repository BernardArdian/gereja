import DppTable from "../table/dppTable";

export default function ListAnggotaDpp(handlers) {
  return (
    <section className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl overflow-hidden mb-3">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-sm font-serif text-gray-700">
          Anggota Dewan Pastoral Paroki ST.Fransiskus Assisi Harapan Makmur —
          Merauke Papua Selatan
        </h3>
      </div>
      <div className="p-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-center border-b border-gray-100">
              <th className="px-6 py-3.5 text-[10px] font-serif text-gray-900 uppercase tracking-widest">
                Nama
              </th>
              <th className="px-6 py-3.5 text-[10px] font-serif text-gray-900 uppercase tracking-widest">
                Jabatan
              </th>
              <th className="px-6 py-3.5 text-[10px] font-serif text-gray-900 uppercase tracking-widest">
                Periode
              </th>
              <th className="px-6 py-3.5 text-[10px] font-serif text-gray-900 uppercase tracking-widest">
                Kelola
              </th>
            </tr>
          </thead>
          <tbody>
            <DppTable
              data={handlers.nama}
              jabatan="Anggota"
              periode="2022 - 2025"
            />
            <DppTable nama="mawar" jabatan="Anggota" periode="2022 - 2025" />
            <DppTable nama="irwan" jabatan="Anggota" periode="2022 - 2025" />
            <DppTable nama="linda" jabatan="Anggota" periode="2022 - 2025" />
          </tbody>
        </table>
      </div>
    </section>
  );
}
