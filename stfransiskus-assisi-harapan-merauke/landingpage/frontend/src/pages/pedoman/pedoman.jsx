export default function Pedoman() {
  const data = {
    ringkasan:
      "Berawal dari sebuah gubuk kecil di tahun 1950, komunitas ini tumbuh menjadi pusat iman yang kokoh bagi ribuan umat hingga saat ini.",
    artikel: `Gereja ini didirikan pada tanggal 15 Agustus 1950 oleh Pastor Johannes van der Steur. Pada awalnya, jemaat hanya berjumlah 12 kepala keluarga yang berkumpul di rumah salah satu warga. Seiring berjalannya waktu, semangat gotong royong umat berhasil membangun gedung semi-permanen pertama pada tahun 1965. 
    
Dekade demi dekade, gereja ini bukan hanya menjadi tempat ibadah, tetapi juga pusat pendidikan dan pelayanan sosial bagi masyarakat lintas agama di wilayah ini.`,
  };
  return (
    <section className="min-h-screen w-full bg-slate-50">
      <main className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6 sm:py-8">
        <header>
          <p className="text-sm font-semibold text-amber-700">Arsip pastoral</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Pedoman pastoral paroki
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Pedoman iman dan arah pelayanan Paroki St. Fransiskus Assisi.
          </p>
        </header>
        <article className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <header className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
            <span className="rounded-xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800">
              Pedoman iman
            </span>
          </header>
          <blockquote className="border-l-4 border-amber-600 pl-4 text-base font-semibold leading-7 text-slate-800 sm:text-lg">
            {data.ringkasan}
          </blockquote>
          <p className="mt-6 whitespace-pre-line text-justify text-sm leading-7 text-slate-600 sm:text-base">
            {data.artikel}
          </p>
        </article>
      </main>
    </section>
  );
}
