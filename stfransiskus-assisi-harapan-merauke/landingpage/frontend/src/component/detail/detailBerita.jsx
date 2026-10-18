import { useState } from "react";
import { Calendar, User, Share2, X } from "lucide-react";
import ListBerita from "../../component/berita/lsitBerita";

const newsList = [
  {
    id: 1,
    title: "Pembangunan Gedung Serbaguna Stasi Harapan Memasuki Tahap Akhir",
    excerpt: "Proses pembangunan kini sudah mencapai 90%...",
    content: "Isi lengkap berita pembangunan gedung serbaguna...",
    date: "02 Feb 2026",
    author: "Admin",
    image: "https://picsum.photos/seed/n1/800/600",
    tags: ["Pembangunan", "Stasi Harapan"],
  },
  {
    id: 2,
    title: "Latihan Gabungan Koor Paroki Persiapan Paskah",
    excerpt: "Seluruh anggota koor berkumpul di Gereja Pusat...",
    content: "Menyambut hari raya Paskah, tim liturgi mengadakan latihan...",
    date: "01 Feb 2026",
    author: "Liturgi",
    image: "https://picsum.photos/seed/n2/800/600",
    tags: ["Liturgi", "Paskah"],
  },
  {
    id: 3,
    title: "Misa Perdana Pastor Baru Paroki St. Fransiskus",
    excerpt: "Umat menyambut dengan antusias kedatangan pastor baru...",
    content: "Perayaan misa perdana berlangsung dengan khidmat...",
    date: "30 Jan 2026",
    author: "Admin",
    image: "https://picsum.photos/seed/n3/800/600",
    tags: ["Misa", "Pastor"],
  },
];

export default function DetailBerita({
  title = "Judul Konten Detail",
  date = "02 Feb 2026",
  author = "Admin Paroki",
  image = "https://picsum.photos/seed/detail/1200/600",
  content = "Isi konten utama akan tampil di sini...",
  tags = ["Berita"],
  onBack = () => window.history.back(),
}) {
  // State untuk navigasi ke berita lain dari footer
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDate, setCurrentDate] = useState(date);
  const [currentAuthor, setCurrentAuthor] = useState(author);
  const [currentImage, setCurrentImage] = useState(image);
  const [currentContent, setCurrentContent] = useState(content);

  const handleShowOtherNews = (item) => {
    setCurrentTitle(item.title);
    setCurrentDate(item.date);
    setCurrentAuthor(item.author);
    setCurrentImage(item.image);
    setCurrentContent(item.content || item.excerpt);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filter berita lain (exclude yang sedang ditampilkan)
  const otherNews = newsList
    .filter((item) => item.title !== currentTitle)
    .slice(0, 3);

  return (
    <section className="min-h-screen w-full bg-[#f5f5f5] -mt-17.5 relative z-50">
      {/* ACTION BAR */}
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

          <button className="cursor-pointer group flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">
            <div className="p-2 rounded-xl group-hover:bg-blue-100 transition-colors">
              <Share2 size={20} />
            </div>
            Share
          </button>
        </div>
      </nav>

      {/* ARTICLE HEADER */}
      <header className="max-w-4xl mx-auto px-6 pt-12 pb-8">
        <h1
          className="text-3xl md:text-5xl font-black font-serif text-gray-900 leading-tight mb-8 tracking-tight"
          children={currentTitle}
        />

        <div className="flex flex-wrap items-center gap-6 py-6 border-y border-gray-100 text-gray-400">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <User size={20} />
            </div>
            <div>
              <p className="text-[0.5em] font-black uppercase tracking-tighter text-gray-800 leading-none mb-1">
                Penulis
              </p>
              <p
                className="text-[0.9em] font-bold text-gray-800"
                children={currentAuthor}
              />
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
              <p
                className="text-[0.9em] font-bold text-gray-800"
                children={currentDate}
              />
            </div>
          </div>
        </div>
      </header>

      {/* HERO IMAGE */}
      <section className="max-w-5xl mx-auto px-6 mb-12">
        <div
          className="rounded-[1rem] border overflow-hidden"
          children={
            <img
              src={currentImage}
              alt={currentTitle}
              className="w-full h-auto object-cover aspect-video"
            />
          }
        />
      </section>

      {/* ARTICLE BODY */}
      <article className="max-w-3xl mx-auto px-6 pb-32">
        <div
          className="prose prose-lg prose-indigo max-w-none"
          children={[
            <p
              className="text-xl text-gray-800 leading-relaxed font-medium mb-8"
              children={`${currentContent.substring(0, 150)} ...`}
            />,
            <div
              className="text-gray-800 leading-[1.8] space-y-6 whitespace-pre-line"
              children={currentContent}
            />,
          ]}
        />
      </article>

      {/* FOOTER - BERITA LAINNYA */}
      <footer className="border-t border-gray-900">
        <section className="px-15 py-5">
          <span className="font-serif text-[0.90em]">- berita lainnya -</span>
          <ListBerita
            data={otherNews}
            handler={{ showDetail: handleShowOtherNews }}
          />
        </section>
      </footer>
    </section>
  );
}
