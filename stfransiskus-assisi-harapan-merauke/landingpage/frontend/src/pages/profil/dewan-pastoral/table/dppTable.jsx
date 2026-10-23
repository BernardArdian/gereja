export default function DppTable({ nama, jabatan, periode }) {
  return (
    <tr className="transition hover:bg-slate-50">
      <td className="px-4 py-4 text-sm font-semibold text-slate-900 sm:px-6">
        {nama}
      </td>
      <td className="px-4 py-4 sm:px-6">
        <span className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800">
          {jabatan}
        </span>
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600 sm:px-6">
        {periode}
      </td>
    </tr>
  );
}
