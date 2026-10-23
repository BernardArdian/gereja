import DppTable from "./table/dppTable";

export default function DewanPastoralParoki() {
  const members = [
    { nama: "arwind", jabatan: "Anggota", periode: "2022 - 2025" },
    { nama: "mawar", jabatan: "Anggota", periode: "2022 - 2025" },
    { nama: "irwan", jabatan: "Anggota", periode: "2022 - 2025" },
    { nama: "linda", jabatan: "Anggota", periode: "2022 - 2025" },
  ];

  return (
    <section className="w-full pb-8">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:px-6">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Anggota Dewan Pastoral Paroki
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              St. Fransiskus Assisi Harapan Makmur
            </p>
          </div>
          <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800">
            {members.length} anggota
          </span>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full min-w-160 border-collapse text-left">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th
                  scope="col"
                  className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6"
                >
                  Nama
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6"
                >
                  Jabatan
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6"
                >
                  Periode
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {members.map((member, index) => (
                <DppTable
                  key={`${member.nama}-${index}`}
                  nama={member.nama}
                  jabatan={member.jabatan}
                  periode={member.periode}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
