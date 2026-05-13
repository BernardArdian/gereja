import { Pencil, Trash2 } from "lucide-react";

export default function DppTable({ nama, jabatan, periode }) {
  return (
    <tr className="text-center border-b border-gray-50 hover:bg-gray-50/60 transition-colors cursor-pointer">
      <td className="px-6 py-4 text-sm font-medium text-gray-900">{nama}</td>
      <td className="px-6 py-4">
        <span className="text-xs font-semibold text-indigo-900 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-1">
          {jabatan}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-900">{periode}</td>
      <td className="px-6 py-4">
        <section className="flex items-center justify-center gap-2">
          <button
            className="flex flex-row gap-1 cursor-pointer p-2 text-center text-yellow-500 hover:text-amber-500 hover:bg-amber-100 rounded-xl transition-colors"
            title="Edit Member Dpp"
          >
            <Pencil size={20} />
            <span className="text-[0.8em]">edit</span>
          </button>
          <button
            className="flex flex-row gap-1 cursor-pointer text-center p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
            title="Hapus Member Dpp"
          >
            <Trash2 size={20} />
            <span className="text-[0.8em]">hapus</span>
          </button>
        </section>
      </td>
    </tr>
  );
}
