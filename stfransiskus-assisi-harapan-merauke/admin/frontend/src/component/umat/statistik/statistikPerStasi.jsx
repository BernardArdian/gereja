import { PieChart } from "lucide-react";

export default function StatistikPerStasi({ stasiDistribusi }) {
  return (
    <section className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <h3 className="font-black text-gray-900 uppercase tracking-tighter mb-6 flex items-center gap-2">
        <PieChart size={20} className="text-indigo-600" /> Statistik Per Stasi
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-3 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                Nama Stasi
              </th>
              <th className="p-3 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">
                Total
              </th>
              <th className="p-3 text-[10px] font-black text-blue-600 uppercase tracking-widest text-center">
                Baptis
              </th>
              <th className="p-3 text-[10px] font-black text-emerald-600 uppercase tracking-widest text-center">
                Komuni
              </th>
              <th className="p-3 text-[10px] font-black text-rose-600 uppercase tracking-widest text-center">
                Krisma
              </th>
              <th className="p-3 text-[10px] font-black text-rose-800 uppercase tracking-widest text-center">
                Menikah
              </th>
              <th className="p-3 text-[10px] font-black text-rose-800 uppercase tracking-widest text-center">
                Belum Menikah
              </th>
              <th className="p-3 text-[10px] font-black text-rose-800 uppercase tracking-widest text-center">
                Duda
              </th>
              <th className="p-3 text-[10px] font-black text-rose-800 uppercase tracking-widest text-center">
                Janda
              </th>
              <th className="p-3 text-[10px] font-black text-blue-500 uppercase tracking-widest text-center">
                Hidup
              </th>
              <th className="p-3 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                Meninggal
              </th>
            </tr>
          </thead>
          <tbody>
            {stasiDistribusi.length > 0 ? (
              stasiDistribusi.map((w, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors font-black uppercase"
                >
                  <td className="p-3 text-[11px] text-gray-800">{w.n}</td>
                  <td className="p-3 text-[11px] text-gray-900 text-center bg-indigo-50/30">
                    {w.total}
                  </td>
                  <td className="p-3 text-[11px] text-blue-600 text-center">
                    {w.b}
                  </td>
                  <td className="p-3 text-[11px] text-emerald-600 text-center">
                    {w.nikah}
                  </td>
                  <td className="p-3 text-[11px] text-rose-600 text-center">
                    {w.janda}
                  </td>
                  <td className="p-3 text-[11px] text-rose-800 text-center">
                    {w.duda}
                  </td>
                  <td className="p-3 text-[11px] text-blue-500 text-center">
                    {w.h}
                  </td>
                  <td className="p-3 text-[11px] text-gray-400 text-center">
                    {w.m}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="11"
                  className="bg-rose-100 w-full p-10 text-center text-xs text-gray-400 italic uppercase font-black"
                >
                  Data Kosong
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
