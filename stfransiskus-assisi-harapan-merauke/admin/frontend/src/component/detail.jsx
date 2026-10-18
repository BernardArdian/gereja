import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";

export default function Detail({ formData = {}, handlers = {} }) {
  const title = formData.title || "Detail konten";
  const content = formData.content || formData.description || formData.summary || "";
  const metadata = [
    { label: "Penulis", value: formData.author, icon: UserRound },
    { label: "Tanggal", value: formData.date, icon: CalendarDays },
    { label: "Kategori", value: formData.category, icon: null },
    { label: "Jadwal", value: formData.schedule || formData.period, icon: null },
    { label: "Lokasi", value: formData.location, icon: null },
  ].filter((item) => item.value);

  const handleBack = () => {
    if (handlers.onBack) {
      handlers.onBack();
      return;
    }
    window.history.back();
  };

  return (
    <section className="fixed inset-0 z-[100] overflow-y-auto bg-white text-slate-900">
      <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-2 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-2 text-sm font-semibold text-slate-700 transition hover:bg-amber-50 hover:text-amber-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
          >
            <ArrowLeft size={19} aria-hidden="true" />
            Kembali
          </button>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-5xl px-4 pb-12 sm:px-6 sm:pb-16">
        <header className="py-7 sm:py-10">
          <h1 className="max-w-4xl break-words text-2xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          {metadata.length > 0 && (
            <dl className="mt-6 flex flex-wrap gap-3 border-y border-slate-200 py-4">
              {metadata.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="flex min-w-0 items-center gap-2 rounded-xl bg-slate-50 px-3 py-2"
                >
                  {Icon && (
                    <Icon
                      size={16}
                      className="shrink-0 text-amber-700"
                      aria-hidden="true"
                    />
                  )}
                  <div className="min-w-0">
                    <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                      {label}
                    </dt>
                    <dd className="break-words text-sm font-medium text-slate-800">
                      {value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          )}
        </header>

        {formData.image && (
          <figure className="mb-7 overflow-hidden rounded-2xl bg-slate-100 sm:mb-10">
            <img
              src={formData.image}
              alt={title}
              className="max-h-[65vh] w-full object-cover"
            />
          </figure>
        )}

        <article className="mx-auto max-w-3xl">
          {content ? (
            <div className="break-words whitespace-pre-line text-base leading-8 text-slate-700 sm:text-lg sm:leading-9">
              {content}
            </div>
          ) : (
            <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
              Belum ada isi untuk konten ini.
            </p>
          )}
        </article>
      </main>
    </section>
  );
}
