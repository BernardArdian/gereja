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
    <main className="max-w-7xl mx-auto p-8">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-8 space-y-8">
          <section className="bg-stone-400/40 rounded border border-gray-100 p-8 md:p-12 border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <History size={24} />
              </div>
              <h3 className="text-2xl font-serif text-gray-800 tracking-tight">
                Perjalanan Iman
              </h3>
            </div>

            <section
              className="prose prose-indigo text-justify max-w-none"
              children={[
                <p
                  className="text-xl font-bold text-gray-900 leading-relaxed mb-6 italic border-l-4 border-indigo-500 pl-6"
                  children={data.ringkasan}
                />,
                <div
                  className="text-gray-900 leading-[1.8] font-medium space-y-4 whitespace-pre-line"
                  children={data.artikel}
                />,
              ]}
            />

            {/* Placeholder Foto Sejarah */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              <div className="aspect-video bg-gray-100 rounded-3xl flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200">
                <ImageIcon size={32} className="mb-2" />
                <span className="text-[10px] font-black uppercase">
                  Foto Masa Lalu
                </span>
              </div>
              <div className="aspect-video bg-gray-100 rounded-3xl flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200">
                <ImageIcon size={32} className="mb-2" />
                <span className="text-[10px] font-black uppercase">
                  Foto Saat Ini
                </span>
              </div>
            </div>
          </section>
        </section>

        {/* SISI KANAN: Timeline / Milestones */}
        <section className="lg:col-span-4 space-y-6">
          <section className="bg-[#B38728]/50 border border-gray-100 rounded p-8 text-white shadow-indigo-200">
            <section className="flex text-gray-900 items-center gap-3 mb-8">
              <Milestone size={24} />
              <h3 className="text-lg font-semibold font-serif tracking-tight">
                Garis Waktu
              </h3>
            </section>

            <section className="space-y-8 relative text-justify ">
              {/* Garis Vertikal Timeline */}
              <div className="absolute left-[14px] top-2 bottom-2 w-0.5 bg-indigo-700" />

              {data.milestones.map((item, index) => (
                <div key={index} className="relative pl-10 group">
                  {/* Dot */}
                  <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-slate-300 border-4 border-white group-hover:border-sky-900/80 transition-all z-10" />

                  <div className="flex flex-col cursor-pointer">
                    <span
                      className="text-black font-black text-sm tracking-widest mb-1 group-hover:text-white"
                      children={item.tahun}
                    />
                    <p
                      className="text-sm font-medium text-gray-900/80 leading-relaxed group-hover:text-white transition-colors"
                      children={item.event}
                    />
                  </div>
                </div>
              ))}
            </section>

            <footer className="text-center mt-10 pt-6 border-t border-gray-100">
              <p className="text-[13px] font-semibold text-gray-900 uppercase tracking-widest mb-1">
                Update Terakhir
              </p>
              <p className="text-sm font-serif text-gray-800">Februari 2026</p>
            </footer>
          </section>
        </section>
      </section>
    </main>
  );
}
