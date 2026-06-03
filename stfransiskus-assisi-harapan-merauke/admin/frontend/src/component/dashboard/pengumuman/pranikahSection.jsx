export default function PranikahSection({ data, onChange, isSubmitting }) {
  const labelPranikah = [
    { label: "Nama Mempelai", pria: "namaPria", wanita: "namaWanita" },
    { label: "Nama Ayah", pria: "namaAyahPria", wanita: "namaAyahWanita" },
    { label: "Nama Ibu", pria: "namaIbuPria", wanita: "namaIbuWanita" },
  ];
  return (
    <section className="space-y-4 p-5 bg-gray-50 border border-gray-200 rounded-2xl">
      <h4 className="font-bold text-gray-700 flex items-center gap-2 border-b border-gray-200 pb-2">
        Data Pranikah
      </h4>
      {labelPranikah.map((row, idx) => (
        <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <form>
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">
              {row.label} Pria
            </label>
            <input
              name={row.pria}
              value={data[row.pria]}
              onChange={onChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              disabled={isSubmitting}
            />
          </form>
          <form>
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">
              {row.label} Wanita
            </label>
            <input
              name={row.wanita}
              value={data[row.wanita]}
              onChange={onChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              disabled={isSubmitting}
            />
          </form>
        </div>
      ))}
    </section>
  );
}
