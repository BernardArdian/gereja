export default function Pedoman() {
  const data = {
    ringkasan:
      "Berawal dari sebuah gubuk kecil di tahun 1950, komunitas ini tumbuh menjadi pusat iman yang kokoh bagi ribuan umat hingga saat ini.",
    artikel: `Gereja ini didirikan pada tanggal 15 Agustus 1950 oleh Pastor Johannes van der Steur. Pada awalnya, jemaat hanya berjumlah 12 kepala keluarga yang berkumpul di rumah salah satu warga. Seiring berjalannya waktu, semangat gotong royong umat berhasil membangun gedung semi-permanen pertama pada tahun 1965. 
    
Dekade demi dekade, gereja ini bukan hanya menjadi tempat ibadah, tetapi juga pusat pendidikan dan pelayanan sosial bagi masyarakat lintas agama di wilayah ini.`,
  };
  return (
    <section className="w-full min-h-screen px-4">
      {/* HEADER */}
      <header className="py-4 border-b border-amber-500 mb-4">
        <h2 className="font-serif text-1xl text-gray-900">
          Pedoman Pastoral Paroki St.Fransiskus Assisi
        </h2>
        <p className="text-[12px] font-semibold tracking-[0.18em] uppercase text-gray-800 mb-1">
          Arsip Dokumen Pedoman Pastoral
        </p>
      </header>
      <main className="max-w-5xl mx-auto px-8 py-10">
        <section className="px-15">
          {/* ARTIKEL */}
          <section className="lg:col-span-8 p-10 border border-gray-100 rounded bg-gray-200/40">
            <p className="text-[1em] font-serif tracking-[0.18em] uppercase text-gray-900 mb-6">
              Pedoman Iman
            </p>
            <p className="text-justify font-serif text-xl text-gray-900 leading-relaxed mb-8 border-l-2 border-gray-200 pl-6 italic">
              {data.ringkasan}
            </p>
            <div className="text-justify text-[1em] text-gray-900 leading-[1.9] font-light space-y-4 whitespace-pre-line">
              {data.artikel}
            </div>
          </section>
        </section>
      </main>
    </section>
  );
}
