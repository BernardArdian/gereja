import { Edit2, Trash2 } from "lucide-react";

export default function DppTable(data) {
  const handleDelete = () => {
    window.confirm("hapus");
  };

  return (
    <tr className="text-center border-b border-gray-50 hover:bg-gray-50/60 transition-colors cursor-pointer">
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        {data.nama}
      </td>
      <td className="px-6 py-4">
        <span className="text-xs font-semibold text-indigo-900 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-1">
          {data.jabatan}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">{data.periode}</td>
      <td className="px-6 py-4">
        <section className="flex items-center justify-center gap-2">
          <button
            className="cursor-pointer p-3 bg-slate-200 rounded text-yellow-700 hover:bg-amber-600 hover:text-white transition-all active:scale-75"
            onClick={(i) => {
              i.stopPropagation();
            }}
          >
            <Edit2 size={18} />
          </button>

          <button
            className="cursor-pointer p-3 bg-slate-200 rounded text-rose-400 hover:bg-red-600 hover:text-white transition-all active:scale-75"
            onClick={(i) => {
              i.stopPropagation();
              handleDelete;
            }}
          >
            <Trash2 size={18} />
          </button>
        </section>
      </td>
    </tr>
  );
}
