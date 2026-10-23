import { createElement, useState } from "react";
import {
  BookOpen,
  Cross,
  Heart,
  MapPin,
  PieChart,
  Printer,
  UserRound,
  Users,
} from "lucide-react";

import StatistikPerStasi from "./statistikPerStasi";
import UmatPrintPreview from "../print/umatPrintPreview";

const printStasiColumns = [
  { key: "total", label: "Total" },
  { key: "baptis", label: "Baptis" },
  { key: "komuni", label: "Komuni" },
  { key: "krisma", label: "Krisma" },
  { key: "menikah", label: "Menikah" },
  { key: "belumNikah", label: "Belum menikah" },
  { key: "duda", label: "Duda" },
  { key: "janda", label: "Janda" },
  { key: "hidup", label: "Hidup" },
  { key: "meninggal", label: "Meninggal" },
];

function normalizeMaritalStatus(status = "") {
  const normalized = status.toLowerCase().replaceAll("_", " ");
  if (normalized === "sudah menikah") return "menikah";
  return normalized;
}

function personHasSacrament(person, key) {
  const value = person?.[key];
  return Array.isArray(value)
    ? value.some((item) => item?.status === "sudah")
    : value?.status === "sudah";
}

function getUmatPeople(umat) {
  const data = umat.rawData || {};
  const family = data.keluarga;

  if (family) {
    return [
      {
        ...(family.statusSakramentSuami || {}),
        nama: family.namaSuami,
        statusHidup: family.statusSuami,
      },
      {
        ...(family.statusSakramentIstri || {}),
        nama: family.namaIstri,
        statusHidup: family.statusIstri,
      },
      ...(family.anak || []),
    ].filter((person) => person.nama);
  }

  const person = data.single || data.personal || data.individu;
  return [
    person || {
      baptis: umat.baptis,
      komuni: umat.komuni,
      krisma: umat.krisma,
      statusHidup: umat.statusHidup,
    },
  ];
}

export default function StatistikUmat({ umatList = [] }) {
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);

  const people = umatList.flatMap(getUmatPeople);
  const totalDataUmat = umatList.length;
  const totalPeople = people.length;
  const hidupCount = people.filter(
    (person) => person.statusHidup !== "meninggal",
  ).length;
  const meninggalCount = totalPeople - hidupCount;
  const belumMenikahCount = umatList.filter(
    (umat) =>
      normalizeMaritalStatus(umat.statusNikah || umat.status) ===
      "belum menikah",
  ).length;
  const belumMenerimaSakramenCount = people.filter((person) =>
    ["baptis", "komuni", "krisma"].some(
      (key) => !personHasSacrament(person, key),
    ),
  ).length;
  const uniqueKK = new Set(
    umatList
      .map((umat) => umat.noKk?.trim())
      .filter((number) => number && number !== "-"),
  ).size;
  const sacramentCompletionMetrics = [
    { key: "baptis", label: "Baptis" },
    { key: "komuni", label: "Komuni pertama" },
    { key: "krisma", label: "Krisma" },
  ].map((metric) => ({
    ...metric,
    count: people.filter((person) =>
      personHasSacrament(person, metric.key),
    ).length,
  }));
  const sacramentPendingMetrics = sacramentCompletionMetrics.map(
    ({ key, label, count }) => ({
      key,
      label,
      count: totalPeople - count,
    }),
  );
  const maritalMetrics = [
    { key: "menikah", label: "Menikah" },
    { key: "belum menikah", label: "Belum menikah" },
    { key: "duda", label: "Duda" },
    { key: "janda", label: "Janda" },
  ].map((metric) => ({
    ...metric,
    count: umatList.filter(
      (umat) =>
        normalizeMaritalStatus(umat.statusNikah || umat.status) === metric.key,
    ).length,
  }));

  const stats = [
    {
      label: "Individu terdata",
      value: totalPeople,
      icon: Users,
      color: "blue",
    },
    {
      label: "Individu berstatus hidup",
      value: hidupCount,
      icon: Heart,
      color: "emerald",
    },
    {
      label: "Individu berstatus meninggal",
      value: meninggalCount,
      icon: Cross,
      color: "gray",
    },
    {
      label: "Kartu keluarga terdaftar",
      value: uniqueKK,
      icon: MapPin,
      color: "amber",
    },
    {
      label: "Sakramen belum lengkap",
      value: belumMenerimaSakramenCount,
      icon: BookOpen,
      color: "rose",
    },
    {
      label: "Belum menikah",
      value: belumMenikahCount,
      icon: UserRound,
      color: "violet",
    },
  ];
  const colorClasses = {
    blue: "border-sky-200 bg-sky-50 text-slate-900",
    emerald: "border-emerald-200 bg-emerald-50 text-slate-900",
    gray: "border-black/20 bg-black/10 text-slate-900",
    amber: "border-amber-200 bg-amber-50 text-slate-900",
    rose: "border-rose-200 bg-rose-50 text-slate-900",
    violet: "border-violet-200 bg-violet-50 text-slate-900",
  };

  const counts = new Map();
  umatList.forEach((umat) => {
    const stasi = umat.stasiKeluarga || umat.lingkungan || "Tanpa Stasi";
    const status = normalizeMaritalStatus(umat.statusNikah || umat.status);
    if (!counts.has(stasi)) {
      counts.set(stasi, {
        n: stasi,
        total: 0,
        baptis: 0,
        komuni: 0,
        krisma: 0,
        menikah: 0,
        belumNikah: 0,
        janda: 0,
        duda: 0,
        hidup: 0,
        meninggal: 0,
      });
    }

    const stasiCounts = counts.get(stasi);
    const stasiPeople = getUmatPeople(umat);
    stasiCounts.total += stasiPeople.length;
    for (const person of stasiPeople) {
      if (personHasSacrament(person, "baptis")) stasiCounts.baptis += 1;
      if (personHasSacrament(person, "komuni")) stasiCounts.komuni += 1;
      if (personHasSacrament(person, "krisma")) stasiCounts.krisma += 1;
    }
    if (status === "menikah") stasiCounts.menikah += 2;
    if (status === "belum menikah") stasiCounts.belumNikah += 1;
    if (status === "duda") stasiCounts.duda += 1;
    if (status === "janda") stasiCounts.janda += 1;
    for (const person of stasiPeople) {
      if (person.statusHidup === "meninggal") stasiCounts.meninggal += 1;
      else stasiCounts.hidup += 1;
    }
  });

  const stasiDistribusi = [...counts.values()].sort(
    (a, b) => b.total - a.total || a.n.localeCompare(b.n, "id"),
  );

  const reportDate = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
  }).format(new Date());

  return (
    <>
    <section className="w-full space-y-6 sm:space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-amber-800">
            Ringkasan data paroki
          </p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Statistik umat
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Ringkasan berdasarkan data umat yang tercatat, status sakramen,
            perkawinan, dan stasi.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsPrintPreviewOpen(true)}
          className="inline-flex min-h-11 w-fit cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
        >
          <Printer size={17} aria-hidden="true" />
          Cetak laporan
        </button>
      </header>

      <section
        aria-label="Ringkasan jumlah umat"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
      >
        {stats.map(({ label, value, icon, color }) => (
          <article
            key={label}
            className={`rounded-2xl border p-4 sm:p-5 ${colorClasses[color]}`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold leading-5  text-slate-900 ">
                {label}
              </p>
              <span className="rounded-xl bg-white/80 p-2.5">
                {createElement(icon, { size: 19, "aria-hidden": true })}
              </span>
            </div>
            <p className="mt-5 text-3xl font-bold tracking-tight">
              {value.toLocaleString("id-ID")}
            </p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <MetricPanel
          title="Sudah menerima sakramen"
          description="Jumlah individu yang sudah menerima setiap sakramen."
          metrics={sacramentCompletionMetrics}
          total={totalPeople}
          color="amber"
        />
        <MetricPanel
          title="Belum menerima sakramen"
          description="Jumlah individu yang belum menerima setiap sakramen."
          metrics={sacramentPendingMetrics}
          total={totalPeople}
          color="rose"
        />
        <MetricPanel
          title="Status perkawinan"
          description="Jumlah data individu/keluarga menurut status pencatatan."
          metrics={maritalMetrics}
          total={totalDataUmat}
          color="sky"
        />
      </section>

      <StatistikPerStasi stasiDistribusi={stasiDistribusi} />
    </section>
    <UmatPrintPreview
      isOpen={isPrintPreviewOpen}
      onClose={() => setIsPrintPreviewOpen(false)}
      title="Pratinjau laporan statistik umat"
      description="Periksa laporan sebelum mencetak. Gunakan orientasi lanskap untuk hasil terbaik."
    >
          <article className="umat-print-document mx-auto max-w-5xl rounded-sm bg-white p-6 text-slate-900 shadow-2xl sm:p-10">
            <header className="border-b-2 border-amber-700 pb-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-800">
                Paroki St. Fransiskus Assisi
              </p>
              <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                    Laporan Statistik Umat
                  </h1>
                  <p className="mt-1 text-sm text-slate-600">
                    Ringkasan status umat, sakramen, perkawinan, dan sebaran
                    stasi.
                  </p>
                </div>
                <p className="text-sm text-slate-600">
                  Tanggal laporan:{" "}
                  <span className="font-semibold text-slate-900">
                    {reportDate}
                  </span>
                </p>
              </div>
            </header>

            <section className="mt-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-800">
                Ringkasan utama
              </h2>
              <dl className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
                {stats.map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-lg border border-slate-200 px-4 py-3"
                  >
                    <dt className="text-xs font-medium leading-5 text-slate-600">
                      {label}
                    </dt>
                    <dd className="mt-1 text-xl font-bold tabular-nums text-slate-950">
                      {value.toLocaleString("id-ID")}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2">
              <PrintMetricTable
                title="Sudah menerima sakramen"
                metrics={sacramentCompletionMetrics}
                total={totalPeople}
              />
              <PrintMetricTable
                title="Belum menerima sakramen"
                metrics={sacramentPendingMetrics}
                total={totalPeople}
              />
              <PrintMetricTable
                title="Status perkawinan"
                metrics={maritalMetrics}
                total={totalDataUmat}
              />
            </section>

            <section className="mt-7">
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-800">
                Statistik per stasi
              </h2>
              {stasiDistribusi.length === 0 ? (
                <p className="mt-3 rounded-lg border border-slate-200 px-4 py-5 text-sm text-slate-600">
                  Belum ada data umat untuk ditampilkan.
                </p>
              ) : (
                <div className="mt-3">
                  <table className="umat-print-table w-full table-fixed border-collapse text-left text-[9px]">
                    <thead>
                      <tr className="bg-slate-100">
                        <th
                          scope="col"
                          className="border border-slate-300 px-1 py-2 font-bold"
                        >
                          Nama stasi
                        </th>
                        {printStasiColumns.map((column) => (
                          <th
                            key={column.key}
                            scope="col"
                            className="border border-slate-300 px-1 py-2 text-center font-bold"
                          >
                            {column.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {stasiDistribusi.map((stasi) => (
                        <tr key={stasi.n}>
                          <th
                            scope="row"
                            className="border border-slate-300 px-2 py-2 font-semibold"
                          >
                            {stasi.n}
                          </th>
                          {printStasiColumns.map((column) => (
                            <td
                              key={column.key}
                              className="border border-slate-300 px-1 py-2 text-center tabular-nums"
                            >
                              {stasi[column.key].toLocaleString("id-ID")}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <footer className="mt-8 border-t border-slate-300 pt-3 text-xs text-slate-500">
              Laporan dibuat dari data umat yang tercatat pada sistem
              administrasi paroki.
            </footer>
          </article>
    </UmatPrintPreview>
    </>
  );
}

function PrintMetricTable({ title, metrics, total }) {
  return (
    <section>
      <h2 className="text-sm font-bold uppercase tracking-wide text-slate-800">
        {title}
      </h2>
      <table className="mt-3 w-full border-collapse text-sm">
        <thead>
          <tr className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-700">
            <th scope="col" className="border border-slate-300 px-3 py-2">
              Kategori
            </th>
            <th
              scope="col"
              className="border border-slate-300 px-3 py-2 text-right"
            >
              Jumlah
            </th>
            <th
              scope="col"
              className="border border-slate-300 px-3 py-2 text-right"
            >
              Persentase
            </th>
          </tr>
        </thead>
        <tbody>
          {metrics.map(({ key, label, count }) => (
            <tr key={key}>
              <th
                scope="row"
                className="border border-slate-300 px-3 py-2 text-left font-medium"
              >
                {label}
              </th>
              <td className="border border-slate-300 px-3 py-2 text-right tabular-nums">
                {count.toLocaleString("id-ID")}
              </td>
              <td className="border border-slate-300 px-3 py-2 text-right tabular-nums">
                {total ? `${Math.round((count / total) * 100)}%` : "0%"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function MetricPanel({ title, description, metrics, total, color }) {
  const barColor =
    color === "rose"
      ? "bg-rose-400"
      : color === "amber"
        ? "bg-amber-400"
        : "bg-emerald-500";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
          <PieChart size={18} aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-xs leading-5 text-slate-600">{description}</p>
        </div>
      </div>
      <div className="space-y-5">
        {metrics.map(({ key, label, count, status }) => {
          const percentage = total ? Math.min((count / total) * 100, 100) : 0;
          return (
            <div key={key}>
              <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-700">{label}</span>
                <span className="shrink-0 font-semibold tabular-nums text-slate-900">
                  {count.toLocaleString("id-ID")}
                  <span className="ml-1 text-xs font-normal text-slate-500">
                    ({Math.round(percentage)}%)
                  </span>
                </span>
              </div>
              <div
                className="h-2 overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-label={label}
                aria-valuemin={0}
                aria-valuemax={total}
                aria-valuenow={count}
              >
                <div
                  className={`h-full rounded-full transition-[width] ${
                    status === "pending"
                      ? "bg-rose-400"
                      : status === "completed"
                        ? "bg-emerald-500"
                        : barColor
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
