import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  User,
  Share2,
  Edit3,
  X,
} from "lucide-react";

export default function DetailBerita({
  title = "Judul Konten Detail",
  //subtitle = "Kategori atau Sub-informasi",
  date = "02 Feb 2026",
  author = "Admin Paroki",
  image = "https://picsum.photos/seed/detail/1200/600",
  content = "Isi konten utama akan tampil di sini...",
  onBack = () => window.history.back(),
}) {
  return (
    <section className="min-h-screen w-full">
      {/* ACTION BAR STICKY */}
      <nav className="top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="cursor-pointer group flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-red-600 transition-colors"
          >
            <div className="p-2 rounded-xl group-hover:bg-red-100 transition-colors">
              <X size={20} />
            </div>
            Tutup Portal
          </button>

          <div className="flex items-center gap-3">
            <button className="cursor-pointer group flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">
              <div className="p-2 rounded-xl group-hover:bg-blue-100 transition-colors">
                <Share2 size={20} />
              </div>
              Share
            </button>
          </div>
        </div>
      </nav>

      {/* ARTICLE HEADER */}
      <header className="max-w-4xl mx-auto px-6 pt-12 pb-8">
        <h1 className="text-3xl md:text-5xl font-black font-serif text-gray-900 leading-tight mb-8 tracking-tight">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 py-6 border-y border-gray-100 text-gray-400">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <User size={20} />
            </div>
            <div>
              <p className="text-[0.5em] font-black uppercase tracking-tighter text-gray-800 leading-none mb-1">
                Penulis
              </p>
              <p className="text-[0.9em] font-bold text-gray-800">{author}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-[0.5em] font-black uppercase tracking-tighter text-gray-800 leading-none mb-1">
                Tanggal
              </p>
              <p className="text-[0.9em] font-bold text-gray-800">{date}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 mb-12">
        <form className="rounded-[1rem] border-1 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-cover aspect-video"
          />
        </form>
      </section>

      {/* ARTICLE BODY */}
      <article className="max-w-3xl mx-auto px-6 pb-32">
        <div className="prose prose-lg prose-indigo max-w-none">
          <p className="text-xl text-gray-800 leading-relaxed font-medium mb-8">
            {content.substring(0, 150)}...
          </p>
          <div className="text-gray-800 leading-[1.8] space-y-6 whitespace-pre-line">
            {content}
          </div>
        </div>
      </article>
      <footer className="border-t border-gray-900">
        <section className="px-15 py-5">
          <span className="font-serif text-[0.90em]">- berita lainnya -</span>
          <form className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-300 border border-gray-300 rounded overflow-hidden">
            {[
              {
                n: "01",
                title: "Fitur Unggulan",
                body: "Konten landing page yang bersih meningkatkan konversi pengunjung.",
              },
              {
                n: "02",
                title: "Responsif",
                body: "Tampilan otomatis menyesuaikan di semua ukuran layar perangkat.",
              },
              {
                n: "03",
                title: "Cepat",
                body: "Optimasi performa menggunakan Tailwind CSS dan framework modern.",
              },
            ].map((card) => (
              <div
                key={card.n}
                className="p-8 md:p-10 hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <p className="text-[11px] text-gray-800 mb-5">{card.n}</p>
                <h3 className="font-serif text-lg text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-800 leading-relaxed font-light">
                  {card.body}
                </p>
                <div className="mt-8 text-gray-300 group-hover:text-gray-500 transition-colors">
                  <ArrowRight size={24} />
                </div>
              </div>
            ))}
          </form>
        </section>
      </footer>
    </section>
  );
}
