import { Pencil, Trash2 } from "lucide-react";

export default function StasiListModal() {
  const dataStasi = [
    {
      nama: "Stasi St. Yohanes",
      alamat: "Jl. Merdeka No. 10",
      jumlahUmat: 150,
    },
    { nama: "Stasi St. Maria", alamat: "Jl. Mawar No. 5", jumlahUmat: 85 },
    { nama: "Stasi St. Petrus", alamat: "Jl. Melati No. 22", jumlahUmat: 120 },
  ];

  return (
    <section className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl overflow-hidden mb-3">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-sm font-serif text-gray-900">
          Stasi Paroki ST.Fransiskus Assisi Harapan Makmur — Merauke Papua
          Selatan
        </h3>
      </div>
      <div className="p-0">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white">
            <tr className="border-b border-gray-100">
              <th className="px-6 py-3.5 text-[10px] font-serif text-gray-900 uppercase tracking-widest">
                Nama Stasi
              </th>
              <th className="px-6 py-3.5 text-[10px] font-serif text-gray-900 uppercase tracking-widest">
                Alamat
              </th>
              <th className="px-6 py-3.5 text-[10px] font-serif text-gray-900 uppercase tracking-widest text-center">
                Umat
              </th>
              <th className="px-6 py-3.5 text-[10px] font-serif text-gray-900 uppercase tracking-widest text-center">
                Kelola
              </th>
            </tr>
          </thead>
          <tbody>
            {dataStasi.map((stasi, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {stasi.nama}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {stasi.alamat}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-block text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-1">
                    {stasi.jumlahUmat}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <section className="flex items-center justify-center gap-2">
                    <button
                      className="flex flex-row cursor-pointer p-2 text-center text-yellow-500 hover:text-amber-500 hover:bg-amber-100 rounded-xl transition-colors"
                      title="Edit Stati"
                    >
                      <Pencil size={20} />
                      <span className="text-[0.8em]">edit</span>
                    </button>
                    <button
                      className="flex flex-row cursor-pointer text-center p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      title="Hapus Stasi"
                    >
                      <Trash2 size={20} />
                      <span className="text-[0.8em]">hapus</span>
                    </button>
                  </section>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
