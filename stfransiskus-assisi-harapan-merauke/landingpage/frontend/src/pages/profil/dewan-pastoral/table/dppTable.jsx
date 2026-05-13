export default function DppTable({ nama, jabatan, periode }) {
  return (
    <tr className="text-center bg-gray-100/40 hover:bg-slate-200/60 transition-colors cursor-pointer group">
      <td className="px-3 py-4 text-sm text-gray-800 font-medium capitalize">
        {nama}
      </td>
      <td className="px-3 py-4 text-sm text-gray-800 font-light">{jabatan}</td>
      <td className="px-3 py-4 text-sm text-gray-800 font-light">{periode}</td>
    </tr>
  );
}
