import { createElement } from "react";
import { Cross, Heart, MapPin, PieChart, Printer, Users } from "lucide-react";

import StatistikPerStasi from "./statistikPerStasi";

function normalizeMaritalStatus(status = "") {
  const normalized = status.toLowerCase().replaceAll("_", " ");
  if (normalized === "sudah menikah") return "menikah";
  return normalized;
}

function hasCompletedSacrament(value) {
  return Array.isArray(value)
    ? value.some((item) => item?.status === "sudah")
    : value?.status === "sudah";
}

function umatHasSacrament(umat, key) {
  const family = umat.rawData?.keluarga || {};
  return [
    umat[key],
    umat.rawData?.[key],
    umat.rawData?.single?.[key],
    umat.rawData?.personal?.[key],
    family.statusSakramentSuami?.[key],
    family.statusSakramentIstri?.[key],
    ...(family.anak || []).map((child) => child[key]),
  ].some(hasCompletedSacrament);
}

export default function StatistikUmat({ umatList = [] }) {
  const totalDataUmat = umatList.length;
  const hidupCount = umatList.filter(
    (umat) => umat.statusHidup !== "meninggal",
  ).length;
  const meninggalCount = totalDataUmat - hidupCount;
  const uniqueKK = new Set(
    umatList
      .map((umat) => umat.noKk?.trim())
      .filter((number) => number && number !== "-"),
  ).size;
  const sacramentMetrics = [
    { key: "baptis", label: "Baptis" },
    { key: "komuni", label: "Komuni pertama" },
    { key: "krisma", label: "Krisma" },
  ].map((metric) => ({
    ...metric,
    count: umatList.filter((umat) => umatHasSacrament(umat, metric.key)).length,
  }));
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
      label: "Data umat terdaftar",
      value: totalDataUmat,
      icon: Users,
      color: "blue",
    },
    {
      label: "Data umat berstatus hidup",
      value: hidupCount,
      icon: Heart,
      color: "emerald",
    },
    {
      label: "Data umat berstatus meninggal",
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
  ];
  const colorClasses = {
    blue: "border-sky-200 bg-sky-50  text-slate-900 ",
    emerald: "border-emerald-200 bg-emerald-50  text-slate-900 ",
    gray: "border-black/20 bg-black/10  text-slate-900 cursor-pointer",
    amber: "border-amber-200 bg-amber-50  text-slate-900 ",
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
    stasiCounts.total += 1;
    if (umatHasSacrament(umat, "baptis")) stasiCounts.baptis += 1;
    if (umatHasSacrament(umat, "komuni")) stasiCounts.komuni += 1;
    if (umatHasSacrament(umat, "krisma")) stasiCounts.krisma += 1;
    if (status === "menikah") stasiCounts.menikah += 1;
    if (status === "belum menikah") stasiCounts.belumNikah += 1;
    if (status === "duda") stasiCounts.duda += 1;
    if (status === "janda") stasiCounts.janda += 1;
    if (umat.statusHidup === "meninggal") stasiCounts.meninggal += 1;
    else stasiCounts.hidup += 1;
  });

  const stasiDistribusi = [...counts.values()].sort(
    (a, b) => b.total - a.total || a.n.localeCompare(b.n, "id"),
  );

  return (
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
          onClick={() => window.print()}
          className="inline-flex min-h-11 w-fit cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
        >
          <Printer size={17} aria-hidden="true" />
          Cetak laporan
        </button>
      </header>

      <section
        aria-label="Ringkasan jumlah umat"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
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

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <MetricPanel
          title="Status sakramen"
          description="Data umat yang tercatat telah menerima sakramen."
          metrics={sacramentMetrics}
          total={totalDataUmat}
          color="amber"
        />
        <MetricPanel
          title="Status perkawinan"
          description="Jumlah data berdasarkan status perkawinan."
          metrics={maritalMetrics}
          total={totalDataUmat}
          color="sky"
        />
      </section>

      <StatistikPerStasi stasiDistribusi={stasiDistribusi} />
    </section>
  );
}

function MetricPanel({ title, description, metrics, total, color }) {
  const barColor = color === "amber" ? "bg-amber-400 " : "bg-emerald-500";

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
        {metrics.map(({ key, label, count }) => {
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
                  className={`h-full rounded-full transition-[width] ${barColor}`}
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
