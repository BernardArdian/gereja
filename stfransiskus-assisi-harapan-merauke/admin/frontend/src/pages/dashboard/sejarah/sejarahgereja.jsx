import { useState } from "react";
import {
  History,
  Image as ImageIcon,
  Milestone,
  Pencil,
} from "lucide-react";
import ContentEditorModal from "../../../component/dashboard/content_editor/ContentEditorModal";

const initialHistory = {
  ringkasan:
    "Berawal dari sebuah gubuk kecil di tahun 1950, komunitas ini tumbuh menjadi pusat iman yang kokoh bagi ribuan umat hingga saat ini.",
  artikel: `Gereja ini didirikan pada tanggal 15 Agustus 1950 oleh Pastor Johannes van der Steur. Pada awalnya, jemaat hanya berjumlah 12 kepala keluarga yang berkumpul di rumah salah satu warga. Seiring berjalannya waktu, semangat gotong royong umat berhasil membangun gedung semi-permanen pertama pada tahun 1965.

Dekade demi dekade, gereja ini bukan hanya menjadi tempat ibadah, tetapi juga pusat pendidikan dan pelayanan sosial bagi masyarakat lintas agama di wilayah ini.`,
  milestones: [
    { tahun: "1950", event: "Peletakan batu pertama oleh Mgr. Soegijapranata." },
    { tahun: "1975", event: "Peresmian gedung utama dengan arsitektur lokal." },
    { tahun: "2005", event: "Renovasi besar dan penambahan aula paroki." },
    { tahun: "2024", event: "Pencapaian 10.000 umat terdaftar." },
  ],
};

export default function SejarahGereja() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(initialHistory);

  return (
    <section className="mx-auto w-full max-w-6xl space-y-5">
      <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-sm font-semibold text-amber-800">
            Arsip & rekam jejak pelayanan
          </p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Sejarah gereja
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Dokumentasi perjalanan iman dan tonggak penting paroki.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex min-h-11 w-fit cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-700 px-4 text-sm font-semibold text-white transition hover:bg-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
        >
          <Pencil size={17} aria-hidden="true" />
          Edit sejarah
        </button>
      </header>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(18rem,0.8fr)]">
        <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <header className="mb-5 flex items-center gap-3">
            <span className="rounded-xl bg-amber-50 p-2.5 text-amber-800">
              <History size={20} aria-hidden="true" />
            </span>
            <h3 className="text-lg font-semibold text-slate-900">
              Perjalanan iman
            </h3>
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
              <h3 className="font-semibold text-slate-900">Garis waktu</h3>
              <p className="mt-1 text-xs text-slate-600">
                {data.milestones.length} tonggak perjalanan.
              </p>
            </div>
          </header>
          {data.milestones.length > 0 ? (
            <ol className="relative space-y-5 before:absolute before:bottom-2 before:left-[9px] before:top-2 before:w-px before:bg-amber-300">
              {data.milestones.map((item, index) => (
                <li key={`${item.tahun}-${index}`} className="relative pl-8">
                  <span className="absolute left-0 top-1.5 h-5 w-5 rounded-full border-4 border-amber-200 bg-amber-700" />
                  <p className="text-sm font-bold text-amber-900">
                    {item.tahun}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    {item.event}
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-slate-600">
              Belum ada peristiwa yang dicatat.
            </p>
          )}
        </section>
      </div>

      <ContentEditorModal
        key={isModalOpen ? "history-open" : "history-closed"}
        isOpen={isModalOpen}
        mode="history"
        title="Edit sejarah & garis waktu"
        labelContent="Ringkasan sejarah"
        handlers={{
          close: () => setIsModalOpen(false),
          confirm: (updated) => {
            setData((previous) => ({
              ...previous,
              ringkasan: updated.konten,
              milestones: updated.items,
            }));
            setIsModalOpen(false);
          },
          initialData: {
            konten: data.ringkasan,
            items: data.milestones,
          },
        }}
      />
    </section>
  );
}
