import {
  Users,
  MapPin,
  Heart,
  Cross,
  PieChart,
  TrendingUp,
} from "lucide-react";

import StatistikPerStasi from "./statistikPerStasi";

export default function StatistikUmat({ umatList = [] }) {
  const totalUmat = umatList.length;
  const hidupCount = umatList.filter(
    (u) => u.statusHidup !== "meninggal",
  ).length;
  const meninggalCount = umatList.filter(
    (u) => u.statusHidup === "meninggal",
  ).length;
  const uniqueKK = new Set(umatList.map((u) => u.noKk).filter(Boolean)).size;
  const uniqueStasi = new Set(
    umatList.map((u) => u.stasiKeluarga).filter(Boolean),
  ).size;

  const statsReal = [
    {
      id: 1,
      label: "Total Umat",
      value: totalUmat.toLocaleString("id-ID"),
      icon: Users,
      color: "bg-blue-600",
      detail: "Total Umat",
    },
    {
      id: 2,
      label: "Umat Hidup",
      value: hidupCount.toLocaleString("id-ID"),
      icon: Heart,
      color: "bg-rose-500",
      detail: "Umat Aktif",
    },
    {
      id: 3,
      label: "Umat Meninggal",
      value: meninggalCount.toLocaleString("id-ID"),
      icon: Cross,
      color: "bg-black",
      detail: "Data Riwayat Wafat",
    },
    {
      id: 4,
      label: "Keluarga (KK)",
      value: uniqueKK.toLocaleString("id-ID"),
      icon: MapPin,
      color: "bg-amber-500",
      detail: `${uniqueStasi} KK Terdaftar`,
    },
  ];

  const counts = {};
  umatList.forEach((u) => {
    const s = u.stasiKeluarga || "Tanpa Stasi";
    if (!counts[s]) {
      counts[s] = {
        n: s,
        total: 0,
        b: 0,
        ko: 0,
        kr: 0,
        nikah: 0,
        belumNikah: 0,
        janda: 0,
        duda: 0,
        h: 0,
        m: 0,
      };
    }
    counts[s].total += 1;
    if (u.baptis?.status === "sudah") counts[s].b += 1;
    if (u.komuni?.status === "sudah") counts[s].ko += 1;
    if (u.krisma?.status === "sudah") counts[s].kr += 1;
    if (u.statusNikah === "menikah") counts[s].nikah += 1;
    if (u.statusNikah === "belum_menikah") counts[s].belumNikah += 1;
    if (u.statusNikah === "janda") counts[s].janda += 1;
    if (u.statusNikah === "duda") counts[s].duda += 1;
    if (u.statusHidup !== "meninggal") counts[s].h += 1;
    else counts[s].m += 1;
  });

  const stasiDistribusi = Object.values(counts).sort(
    (a, b) => b.total - a.total,
  );

  return (
    <section className="p-6 space-y-8 min-h-screen rounded-3xl">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <form>
          <h1 className="text-2xl font-serif text-indigo-950 uppercase tracking-tighter">
            Statistik Umat Paroki St.Fransiskus Assisi harapan Makmur - Merauke,
            Papua Selatan {""} {new Date().getFullYear()}
          </h1>
          <p className="text-sm font-serif text-gray-900 font-medium">
            Laporan statistik berdasarkan data yang diinput
          </p>
        </form>
        <button className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-black text-white rounded text-xs font-poppins uppercase tracking-widest hover:bg-indigo-900 transition-all">
          <TrendingUp size={16} /> Cetak Statistik
        </button>
      </header>

      {/* STATS GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsReal.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-xl border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div className={`p-4 rounded-xl text-white ${item.color}`}>
                <item.icon size={22} strokeWidth={3} />
              </div>
              <span className="text-[16px] font-black text-gray-900 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-md border">
                {item.detail}
              </span>
            </div>
            <div className="mt-6">
              <p className="text-[10px] text-gray-900 font-black uppercase tracking-widest">
                {item.label}
              </p>
              <h3 className="text-3xl font-black text-gray-900 mt-1 tracking-tighter">
                {item.value}
              </h3>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* DETAIL SAKRAMEN */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-black text-gray-900 uppercase tracking-tighter mb-8 flex items-center gap-3">
            <PieChart size={20} className="text-indigo-600" /> Detail Sakramen &
            Inisiasi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <p className="text-[11px] font-black text-indigo-600 uppercase mb-4 tracking-widest">
                Sudah Melakukan Sakramen
              </p>
              <div className="space-y-4">
                {[
                  {
                    label: "Sudah Baptis",
                    count: umatList.filter((u) => u.baptis?.status === "sudah")
                      .length,
                  },
                  {
                    label: "Sudah Komuni Pertama",
                    count: umatList.filter((u) => u.komuni?.status === "sudah")
                      .length,
                  },
                  {
                    label: "Sudah Krisma",
                    count: umatList.filter((u) => u.krisma?.status === "sudah")
                      .length,
                  },
                  {
                    label: "Sudah Nikah",
                    count: umatList.filter((u) => u.statusNikah === "menikah")
                      .length,
                  },
                ].map((data, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[16px] font-black uppercase mb-1">
                      <span className="text-gray-500">{data.label}</span>
                      <span className="text-gray-900">{data.count} Jiwa</span>
                    </div>
                    <div className="w-full bg-white h-2 rounded-full border border-gray-100 overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full"
                        style={{
                          width: `${totalUmat > 0 ? (data.count / totalUmat) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <p className="text-[11px] font-black text-rose-600 uppercase mb-4 tracking-widest">
                Belum Melakukan Sakramen
              </p>
              <div className="space-y-4">
                {[
                  {
                    label: "Belum Baptis",
                    count:
                      totalUmat -
                      umatList.filter((u) => u.baptis?.status === "sudah")
                        .length,
                  },
                  {
                    label: "Belum Komuni Pertama",
                    count:
                      totalUmat -
                      umatList.filter((u) => u.komuni?.status === "sudah")
                        .length,
                  },
                  {
                    label: "Belum Krisma",
                    count:
                      totalUmat -
                      umatList.filter((u) => u.krisma?.status === "sudah")
                        .length,
                  },
                  {
                    label: "Belum Nikah",
                    count:
                      totalUmat -
                      umatList.filter((u) => u.statusNikah === "menikah")
                        .length,
                  },
                ].map((data, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[16px] font-black uppercase mb-1">
                      <span className="text-gray-500">{data.label}</span>
                      <span className="text-gray-900">{data.count} Jiwa</span>
                    </div>
                    <div className="w-full bg-white h-2 rounded-full border border-gray-100 overflow-hidden">
                      <div
                        className="bg-rose-400 h-full"
                        style={{
                          width: `${totalUmat > 0 ? (data.count / totalUmat) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* STATISTIK PER STASI */}
        <StatistikPerStasi stasiDistribusi={stasiDistribusi} />
      </section>
    </section>
  );
}
