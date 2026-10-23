export default function DppTable({ nama, jabatan, periode }) {
  return (
    <tr
      className="transition hover:bg-slate-50"
      children={[
        <td
          className="px-4 py-4 text-sm font-semibold capitalize text-slate-900 sm:px-6"
          children={nama}
        />,
        <td
          className="px-4 py-4 text-sm text-slate-600 sm:px-6"
          children={jabatan}
        />,
        <td
          className="px-4 py-4 text-sm text-slate-600 sm:px-6"
          children={periode}
        />,
      ]}
    />
  );
}
