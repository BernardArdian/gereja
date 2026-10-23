import {
  History,
  Plus,
  Milestone,
  Clock,
  Image as ImageIcon,
} from "lucide-react";

export default function SejarahGereja() {
  const data = {
    ringkasan:
      "Berawal dari sebuah gubuk kecil di tahun 1950, komunitas ini tumbuh menjadi pusat iman yang kokoh bagi ribuan umat hingga saat ini.",
    artikel: `Gereja ini didirikan pada tanggal 15 Agustus 1950 oleh Pastor Johannes van der Steur. Pada awalnya, jemaat hanya berjumlah 12 kepala keluarga yang berkumpul di rumah salah satu warga. Seiring berjalannya waktu, semangat gotong royong umat berhasil membangun gedung semi-permanen pertama pada tahun 1965. 
    
Dekade demi dekade, gereja ini bukan hanya menjadi tempat ibadah, tetapi juga pusat pendidikan dan pelayanan sosial bagi masyarakat lintas agama di wilayah ini.`,
    milestones: [
      {
        tahun: "1950",
        event: "Peletakan batu pertama oleh Mgr. Soegijapranata.",
      },
      {
        tahun: "1975",
        event: "Peresmian gedung utama dengan arsitektur lokal.",
      },
      { tahun: "2005", event: "Renovasi besar dan penambahan aula paroki." },
      { tahun: "2024", event: "Pencapaian 10.000 umat terdaftar." },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-6xl">
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(18rem,0.8fr)]">
        <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <header className="mb-5 flex items-center gap-3">
            <span className="rounded-xl bg-amber-50 p-2.5 text-amber-800">
              <History size={20} aria-hidden="true" />
            </span>
            <h2 className="text-lg font-semibold text-slate-900">
              Perjalanan iman
            </h2>
          </header>
          <blockquote className="border-l-4 border-amber-600 pl-4 text-base font-semibold leading-7 text-slate-800 sm:text-lg">
            {data.ringkasan}
          </blockquote>
          <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
            {data.artikel}
          </p>
          <section className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {["Foto masa lalu", "Foto saat ini"].map((label) => (
              <div
                key={label}
                className="flex aspect-video flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-500"
              >
                <ImageIcon size={25} aria-hidden="true" />
                <span className="mt-2 text-xs font-medium">{label}</span>
                <span className="mt-1 text-[11px]">Belum ada foto</span>
              </div>
            ))}
          </section>
        </article>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <header className="mb-6 flex items-center gap-3">
            <span className="rounded-xl bg-white p-2.5 text-amber-800">
              <Milestone size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-semibold text-slate-900">Garis waktu</h2>
              <p className="mt-1 text-xs text-slate-600">
                {data.milestones.length} tonggak perjalanan.
              </p>
            </div>
          </header>
          <ol className="relative space-y-5 before:absolute before:bottom-2 before:left-[9px] before:top-2 before:w-px before:bg-amber-300">
            {data.milestones.map((item, index) => (
              <li key={`${item.tahun}-${index}`} className="relative pl-8">
                <span className="absolute left-0 top-1.5 h-5 w-5 rounded-full border-4 border-amber-200 bg-amber-700" />
                <p className="text-sm font-bold text-amber-900">{item.tahun}</p>
                <p className="mt-1 text-sm leading-6 text-slate-700">
                  {item.event}
                </p>
              </li>
            ))}
          </ol>
          <footer className="mt-6 border-t border-amber-200 pt-4 text-xs text-slate-600">
            Update terakhir: Februari 2026
          </footer>
        </section>
      </section>
    </main>
  );
}
