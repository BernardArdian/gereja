import DppTable from "../table/dppTable";

export default function ListAnggotaDpp({ data, handlers }) {
  return (
    <section className="lg:col-span-2 bg-green-500/50 border border-gray-100 rounded-xl overflow-hidden mb-3">
      <header className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-sm font-serif text-gray-700">
          Anggota Dewan Pastoral Paroki ST.Fransiskus Assisi Harapan Makmur
        </h3>
      </header>
      <section className="p-0">
        <table className="w-full text-left border-collapse">
          <thead className="flext items-center justify-center sticky top-0">
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
            {data.map((item, index) => (
              <DppTable key={index} data={item} handlers={handlers} />
            ))}
            {/* <DppTable
              data={handlers.nama}
              jabatan="Anggota"
              periode="2022 - 2025"
            />
            <DppTable nama="mawar" jabatan="Anggota" periode="2022 - 2025" />
            <DppTable nama="irwan" jabatan="Anggota" periode="2022 - 2025" />
            <DppTable nama="linda" jabatan="Anggota" periode="2022 - 2025" /> */}
          </tbody>
        </table>
      </section>
    </section>
  );
}
