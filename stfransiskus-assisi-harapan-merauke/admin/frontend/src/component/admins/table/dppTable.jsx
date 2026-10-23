import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteModal from "../../alert/deleteModal";

export default function DppTable({ data, handlers }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <tr className="hover:bg-slate-50">
      <td className="px-4 py-4 text-sm font-semibold text-slate-900 sm:px-6">
        {data.nama}
      </td>
      <td className="px-4 py-4 sm:px-6">
        <span className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800">
          {data.jabatan}
        </span>
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
        {data.periode}
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            aria-label={`Edit ${data.nama}`}
            className="cursor-pointer rounded-lg p-2.5 text-amber-800 hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            onClick={() => handlers.edit(data)}
          >
            <Edit2 size={17} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={`Hapus ${data.nama}`}
            className="cursor-pointer rounded-lg p-2.5 text-rose-700 hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <Trash2 size={17} aria-hidden="true" />
          </button>
        </div>
      </td>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handlers.delete(data)}
        title="Hapus anggota DPP?"
        description="Anggota ini akan dihapus dari daftar Dewan Pastoral Paroki."
        itemName={data.nama}
        confirmText="Ya, hapus anggota"
      />
    </tr>
  );
}
