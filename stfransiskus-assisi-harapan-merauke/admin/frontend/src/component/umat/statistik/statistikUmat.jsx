import {
  Users,
  MapPin,
  Heart,
  Cross,
  PieChart,
  TrendingUp,
  Printer,
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
  // const uniqueStasi = new Set(
  //   umatList.map((u) => u.stasiKeluarga).filter(Boolean),
  // ).size;

  const statsReal = [
    {
      id: 1,
      tittle: "Total Umat",
      label: "Total Umat",
      value: totalUmat.toLocaleString("id-ID"),
      icon: Users,
      color: "bg-blue-600",
    },
    {
      id: 2,
      tittle: "Riwayat Hidup",
      label: "Umat Hidup",
      value: hidupCount.toLocaleString("id-ID"),
      icon: Heart,
      color: "bg-rose-500",
    },
    {
      id: 3,
      tittle: "Riwayat Meninggal",
      label: "Umat Meninggal",
      value: meninggalCount.toLocaleString("id-ID"),
      icon: Cross,
      color: "bg-black",
    },
    {
      id: 4,
      tittle: "KK Terdaftar",
      label: "Keluarga (KK)",
      value: uniqueKK.toLocaleString("id-ID"),
      icon: MapPin,
      color: "bg-amber-500",
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
          <h1
            className="text-2xl font-serif text-indigo-950 uppercase tracking-tighter"
            children={`Statistik Umat Paroki St.Fransiskus Assisi harapan Makmur - Merauke,
            Papua Selatan ${new Date().getFullYear()}`}
          />
          <p className="text-sm font-serif text-gray-900 font-medium">
            Laporan statistik berdasarkan data yang diinput
          </p>
        </form>
        <button className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-black text-white rounded text-xs font-bold uppercase tracking-widest hover:bg-black/30 hover:text-black transition-all active:scale-95">
          <Printer size={25} /> Cetak
        </button>
      </header>

      {/* STATS GRID */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        children={statsReal.map((item) => (
          <div
            key={item.id}
            className={`p-6 rounded-xl
              ${
                item.label === "Total Umat"
                  ? "bg-blue-300/40 border border-blue-500"
                  : item.label === "Umat Hidup"
                    ? "bg-rose-300/40 border border-rose-500"
                    : item.label === "Umat Meninggal"
                      ? "bg-black/40 border border-black"
                      : item.label === "Keluarga (KK)"
                        ? "bg-amber-500/30 border border-amber-600"
                        : "bg-gray-600/40 border border-gray-100 "
              }
              `}
          >
            <div className="flex items-start justify-between">
              <div className={`p-4 rounded-xl text-white ${item.color}`}>
                <item.icon size={22} strokeWidth={3} />
              </div>
              <span
                className={`text-[16px] font-black text-gray-900 uppercase tracking-widest  px-3 py-1 
                ${
                  item.tittle === "Total Umat"
                    ? "bg-blue-500 text-white rounded-md border border-white"
                    : item.tittle === "Riwayat Hidup"
                      ? "bg-rose-500 text-white rounded-md border border-white"
                      : item.tittle === "Riwayat Meninggal"
                        ? "bg-black text-white rounded-md border border-white"
                        : item.tittle === "KK Terdaftar"
                          ? "bg-amber-500 text-white rounded-md border border-white"
                          : "bg-gray-50 rounded-md border"
                }
                `}
                children={item.tittle}
              />
            </div>
            <div className="mt-6">
              <p
                className={`text-[16px] text-gray-900 font-black uppercase tracking-widest
                ${item.label === "Umat Meninggal" ? "text-[16px] text-white " : ""}
                `}
                children={item.label}
              />
              <h3
                className={`text-3xl font-black text-gray-900 mt-1 tracking-tighter
                ${item.label === "Umat Meninggal" ? "text-white" : ""}
                `}
                children={item.value}
              />
            </div>
          </div>
        ))}
      />

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* DETAIL SAKRAMEN */}
        <section className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-black text-gray-900 uppercase tracking-tighter mb-8 flex items-center gap-3">
            <PieChart size={20} className="text-indigo-600" /> Statistik
            Sakramen & Inisiasi
          </h3>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <section className="flex justify-between items-center mb-4">
                <p className="text-[11px] font-black text-green-600 uppercase">
                  sudah Melakukan Sakramen
                </p>

                <span
                  className="text-[16px] font-black text-gray-900 tracking-widest"
                  children={`total umat - ${totalUmat}`}
                />
              </section>
              <section
                className="space-y-4"
                children={[
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
                      <span className="text-gray-900" children={data.label} />

                      <span
                        className="text-gray-900"
                        children={`${data.count} Jiwa`}
                      />
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
              />
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <secion className="flex justify-between items-center mb-4">
                <p className="text-[11px] font-black text-rose-600 uppercase  ">
                  Belum Melakukan Sakramen
                </p>

                <span
                  className="text-[16px] font-black text-gray-900 tracking-widest"
                  children={`total umat - ${totalUmat}`}
                />
              </secion>
              <section
                className="space-y-4"
                children={[
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
                      <span className="text-gray-500" children={data.label} />
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
              />
            </div>
          </section>
        </section>

        {/* STATISTIK PER STASI */}
        <StatistikPerStasi stasiDistribusi={stasiDistribusi} />
      </section>
    </section>
  );
}
