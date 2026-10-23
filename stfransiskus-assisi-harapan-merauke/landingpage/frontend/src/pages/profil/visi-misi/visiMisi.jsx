import { Target, Sparkles, Compass } from "lucide-react";

export default function VisiMisiGereja() {
  const data = {
    visi: "Menjadi komunitas iman yang inklusif, misioner, dan berakar pada kasih Kristus untuk melayani sesama.",
    misi: [
      "Menyelenggarakan liturgi yang hidup dan partisipatif.",
      "Meningkatkan kualitas pemberdayaan jemaat di tingkat stasi.",
      "Membangun jejaring sosial yang berdampak nyata bagi masyarakat sekitar.",
      "Mengembangkan pendidikan iman yang berkelanjutan bagi orang muda.",
    ],
  };

  return (
    <section className="w-full">
      <main className="mx-auto w-full max-w-6xl space-y-5">
        <article className="relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-slate-50 p-6 shadow-sm sm:p-10">
          <Sparkles
            size={100}
            className="pointer-events-none absolute -right-3 -top-3 text-amber-100 sm:right-4 sm:top-4"
            aria-hidden="true"
          />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="rounded-2xl bg-amber-100 p-3 text-amber-800">
              <Target size={25} aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-amber-800">
              Visi utama
            </h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-slate-800 sm:text-2xl sm:leading-10">
              “{data.visi}”
            </p>
          </div>
        </article>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <header className="flex items-center gap-3 border-b border-slate-200 p-4 sm:p-6">
            <span className="rounded-xl bg-sky-50 p-2.5 text-sky-800">
              <Compass size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-semibold text-slate-900">Misi pelayanan</h2>
              <p className="mt-1 text-xs text-slate-600">
                {data.misi.length} komitmen untuk mewujudkan visi paroki.
              </p>
            </div>
          </header>
          <ol className="divide-y divide-slate-100">
            {data.misi.map((misi, index) => (
              <li
                key={`${index}-${misi}`}
                className="flex items-start gap-3 px-4 py-4 sm:gap-4 sm:px-6"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-50 text-sm font-bold text-amber-900">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm leading-6 text-slate-700">{misi}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </section>
  );
}
