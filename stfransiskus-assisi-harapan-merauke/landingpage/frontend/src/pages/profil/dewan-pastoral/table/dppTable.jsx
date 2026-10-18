export default function DppTable({ nama, jabatan, periode }) {
  return (
    <tr
      className="text-center  hover:bg-slate-200/60 transition-colors cursor-pointer group"
      children={[
        <td
          className="px-3 py-4 font-semibold text-sm text-gray-800 font-medium capitalize"
          children={nama}
        />,
        <td
          className="px-3 py-4 font-semibold text-sm text-gray-800 font-medium"
          children={jabatan}
        />,
        <td
          className="px-3 py-4 font-semibold text-sm text-gray-800 font-medium"
          children={periode}
        />,
      ]}
    />
  );
}
