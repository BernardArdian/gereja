import { useState } from "react";
import { ArrowLeft, Calendar, Share2, User } from "lucide-react";
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

function getDetail(item, type) {
  if (type === "orang-kudus") {
    return {
      title: item.name,
      content: item.content || item.summary,
      image: item.image,
      date: item.postDay,
      dateLabel: "Hari peringatan",
      author: "Orang Kudus",
      metadata: item.patronOf ? [{ label: "Pelindung", value: item.patronOf }] : [],
      tags: ["Orang Kudus"],
    };
  }

  if (type === "renungan") {
    return {
      title: item.title,
      content: item.content || item.excerpt,
      image: item.image,
      date: item.date,
      author: item.author,
      metadata: [
        item.verse && { label: "Bacaan Kitab Suci", value: item.verse },
        item.category && { label: "Kategori", value: item.category },
      ].filter(Boolean),
      tags: ["Renungan"],
    };
  }

  if (type === "devosi") {
    return {
      title: item.title,
      content: item.content || item.description,
      image: item.image,
      author: "Panduan Devosi",
      metadata: [
        item.category && { label: "Jenis devosi", value: item.category },
        item.schedule && { label: "Jadwal", value: item.schedule },
        item.location && { label: "Lokasi", value: item.location },
        item.members && { label: "Peserta", value: item.members },
      ].filter(Boolean),
      tags: ["Devosi"],
    };
  }

  if (type === "tradisi") {
    return {
      title: item.title,
      content: item.content || item.description,
      image: item.image,
      author: "Tradisi Gereja",
      metadata: [
        item.category && { label: "Kategori", value: item.category },
        item.period && { label: "Waktu", value: item.period },
        item.location && { label: "Lokasi", value: item.location },
      ].filter(Boolean),
      tags: ["Tradisi Gereja"],
    };
  }

  return {
    title: item.title,
    content: item.content || item.excerpt,
    image: item.image,
    date: item.date,
    author: item.author,
    metadata: [],
    tags: item.tags || ["Berita"],
  };
}

export default function DetailBerita({
  item,
  type = "berita",
  title = "Judul Konten Detail",
  date = "02 Feb 2026",
  author = "Admin Paroki",
  image,
  content = "Isi konten utama akan tampil di sini...",
  tags = ["Berita"],
  onBack = () => window.history.back(),
}) {
  const initialItem = item || { title, date, author, image, content, tags };
  const [activeItem, setActiveItem] = useState(initialItem);
  const detail = getDetail(activeItem, type);
  const otherNews =
    type === "berita"
      ? newsList.filter((news) => news.title !== detail.title).slice(0, 3)
      : [];

  const handleShowOtherNews = (news) => {
    setActiveItem(news);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="detail-content fixed inset-0 z-[100] h-dvh w-full overflow-y-auto overscroll-contain bg-slate-50">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Kembali
          </button>
          <button
            type="button"
            className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
          >
            <Share2 size={17} aria-hidden="true" />
            Bagikan
          </button>
        </div>
      </nav>

      <header className="mx-auto max-w-4xl px-5 pb-7 pt-9 sm:px-6 sm:pt-12">
        <div className="mb-4 flex flex-wrap gap-2">
          {detail.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mb-7 font-serif text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
          {detail.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-4 border-y border-slate-200 py-5 text-slate-600">
          {detail.author && (
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <User size={19} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                  {type === "berita" || type === "renungan" ? "Penulis" : "Kategori"}
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  {detail.author}
                </p>
              </div>
            </div>
          )}
          {detail.date && (
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-slate-100 p-2.5 text-slate-500">
                <Calendar size={17} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
                  {detail.dateLabel || "Tanggal"}
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  {detail.date}
                </p>
              </div>
            </div>
          )}
        </div>
      </header>

      {detail.image && (
        <div className="mx-auto mb-9 max-w-5xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            <img
              src={detail.image}
              alt={detail.title}
              className="aspect-video h-auto w-full object-cover"
            />
          </div>
        </div>
      )}

      <article className="mx-auto max-w-3xl px-5 pb-16 sm:px-6 sm:pb-24">
        {detail.metadata.length > 0 && (
          <dl className="mb-8 grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2 sm:p-5">
            {detail.metadata.map((entry) => (
              <div key={entry.label} className="min-w-0">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {entry.label}
                </dt>
                <dd className="mt-1 break-words text-sm font-medium text-slate-800">
                  {entry.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
        {detail.content && (
          <div className="space-y-5 whitespace-pre-line text-base leading-8 text-slate-700 sm:text-lg">
            {detail.content}
          </div>
        )}
      </article>

      {otherNews.length > 0 && (
        <footer className="border-t border-slate-200 bg-white">
          <section className="mx-auto max-w-5xl space-y-4 px-4 py-8 sm:px-6">
            <h2 className="font-serif text-lg font-semibold text-slate-800">
              Berita lainnya
            </h2>
            <ListBerita
              data={otherNews}
              handler={{ showDetail: handleShowOtherNews }}
            />
          </section>
        </footer>
      )}
    </section>
  );
}
