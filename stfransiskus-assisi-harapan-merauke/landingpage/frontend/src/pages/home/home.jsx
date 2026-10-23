import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ImageIcon,
  History,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  XSquare,
} from "lucide-react";

import DetailBerita from "../../component/detail/detailBerita";
import DetailPengumuman from "../../component/detail/detailPengumuman";

import ListPengumuman from "../../component/pengumuman/listPengumuman";
import ListBerita from "../../component/berita/lsitBerita";

export default function Home() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");

  //pengumuman
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  //pengumuman detail
  const handleShowDetail = (item) => {
    setSelectedDetail(item);
    setIsDetailOpen(true);
  };

  // --- STATE UNTUK DETAIL---
  const [selectedNews, setSelectedNews] = useState(null);

  const images = [
    "https://images.pexels.com/photos/19026460/pexels-photo-19026460.jpeg?auto=compress&w=1600",
    "https://images.pexels.com/photos/16984163/pexels-photo-16984163.jpeg?auto=compress&w=1600",
    "https://images.pexels.com/photos/18731601/pexels-photo-18731601.jpeg?auto=compress&w=1600",
    "https://images.pexels.com/photos/34294091/pexels-photo-34294091.jpeg?auto=compress&w=1600",
    "https://images.pexels.com/photos/5273434/pexels-photo-5273434.jpeg?auto=compress&w=1600",
    "https://images.pexels.com/photos/8674788/pexels-photo-8674788.jpeg?auto=compress&w=1600",
    "https://images.pexels.com/photos/10306340/pexels-photo-10306340.jpeg?auto=compress&w=1600",
    "https://images.pexels.com/photos/6752279/pexels-photo-6752279.jpeg?auto=compress&w=1600",
  ];
  const data = {
    ringkasan:
      "Berawal dari sebuah gubuk kecil di tahun 1950, komunitas ini tumbuh menjadi pusat iman yang kokoh bagi ribuan umat hingga saat ini.",
    artikel: `Gereja ini didirikan pada tanggal 15 Agustus 1950 oleh Pastor Johannes van der Steur. Pada awalnya, jemaat hanya berjumlah 12 kepala keluarga yang berkumpul di rumah salah satu warga. Seiring berjalannya waktu, semangat gotong royong umat berhasil membangun gedung semi-permanen pertama pada tahun 1965. 
    
    Dekade demi dekade, gereja ini bukan hanya menjadi tempat ibadah, tetapi juga pusat pendidikan dan pelayanan sosial bagi masyarakat lintas agama di wilayah ini.`,
  };

  const dummyPengumuman = [
    {
      id: 1,
      status: "misa",
      description:
        "Misa peringatan hari raya Pentakosta akan diadakan secara khidmat bersama seluruh umat paroki.",
      stasi: "Induk",
      tanggal: "29 Jun 2025",
      waktu: "07.00",
    },
    {
      id: 2,
      status: "pernikahan",
      description:
        "Pengumuman pernikahan pertama bagi pasangan yang akan menerima sakramen pernikahan bulan ini.",
      stasi: "Nohon",
      pernikahanData: {
        namaPria: "Andreas Santoso",
        namaWanita: "Maria Dewi",
        tanggalPernikahan: "05 Jul 2025",
      },
      waktu: "10.00",
    },
    {
      id: 3,
      status: "umum",
      description:
        "Rapat koordinasi dewan paroki untuk membahas program kegiatan semester kedua tahun ini.",
      stasi: "Kurik",
      tanggal: "02 Jul 2025",
      waktu: "16.00",
    },
    {
      id: 4,
      status: "misa",
      description:
        "Misa arwah untuk mendoakan para anggota umat yang telah berpulang dalam bulan Juni ini.",
      stasi: "Semangga",
      tanggal: "30 Jun 2025",
      waktu: "18.00",
    },
  ];

  const dummyBerita = [
    {
      id: 1,
      title: "Pembangunan Gedung Serbaguna Stasi Harapan Memasuki Tahap Akhir",
      excerpt: "Proses pembangunan kini sudah mencapai 90%...",
      content:
        "Isi lengkap berita pembangunan gedung serbaguna... (Data ini harusnya dari database)",
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
      title: "Latihan Gabungan Koor Paroki Persiapan Paskah",
      excerpt: "Seluruh anggota koor berkumpul di Gereja Pusat...",
      content: "Menyambut hari raya Paskah, tim liturgi mengadakan latihan...",
      date: "01 Feb 2026",
      author: "Liturgi",
      image: "https://picsum.photos/seed/n2/800/600",
      tags: ["Liturgi", "Paskah"],
    },
    {
      id: 4,
      title: "Latihan Gabungan Koor Paroki Persiapan Paskah",
      excerpt: "Seluruh anggota koor berkumpul di Gereja Pusat...",
      content: "Menyambut hari raya Paskah, tim liturgi mengadakan latihan...",
      date: "01 Feb 2026",
      author: "Liturgi",
      image: "https://picsum.photos/seed/n2/800/600",
      tags: ["Liturgi", "Paskah"],
    },
    {
      id: 5,
      title: "Latihan Gabungan Koor Paroki Persiapan Paskah",
      excerpt: "Seluruh anggota koor berkumpul di Gereja Pusat...",
      content: "Menyambut hari raya Paskah, tim liturgi mengadakan latihan...",
      date: "01 Feb 2026",
      author: "Liturgi",
      image: "https://picsum.photos/seed/n2/800/600",
      tags: ["Liturgi", "Paskah"],
    },
    {
      id: 6,
      title: "Latihan Gabungan Koor Paroki Persiapan Paskah",
      excerpt: "Seluruh anggota koor berkumpul di Gereja Pusat...",
      content: "Menyambut hari raya Paskah, tim liturgi mengadakan latihan...",
      date: "01 Feb 2026",
      author: "Liturgi",
      image: "https://picsum.photos/seed/n2/800/600",
      tags: ["Liturgi", "Paskah"],
    },
    {
      id: 7,
      title: "Latihan Gabungan Koor Paroki Persiapan Paskah",
      excerpt: "Seluruh anggota koor berkumpul di Gereja Pusat...",
      content: "Menyambut hari raya Paskah, tim liturgi mengadakan latihan...",
      date: "01 Feb 2026",
      author: "Liturgi",
      image: "https://picsum.photos/seed/n2/800/600",
      tags: ["Liturgi", "Paskah"],
    },
  ];

  //HANDLER (Ditaruh di atas useEffect supaya tidak error "Cannot access before declaration")
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const openModal = (img) => {
    setSelectedImg(img);
    setIsOpen(true);
  };

  //EFFECT AUTO SLIDE
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (selectedNews) {
    return (
      <DetailBerita
        title={selectedNews.title}
        content={selectedNews.content || selectedNews.excerpt}
        image={selectedNews.image}
        date={selectedNews.date}
        author={selectedNews.author}
        tags={selectedNews.tags || ["Berita"]}
        onBack={() => setSelectedNews(null)}
      />
    );
  }

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-start overflow-y-auto no-scrollbar">
      <header
        className="group relative flex h-[68vh] min-h-[32rem] w-full items-end overflow-hidden bg-slate-950 sm:h-[76vh] lg:h-[82vh]"
        children={[
          images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              children={
                <img
                  src={img}
                  alt={`Suasana gereja, slide ${index + 1}`}
                  className="h-full w-full cursor-pointer object-cover"
                  onClick={() => openModal(img)}
                />
              }
            />
          )),
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-slate-950/10"
          />,
          <section className="pointer-events-none relative z-20 mx-auto mb-20 w-full max-w-7xl px-5 sm:mb-24 sm:px-10 lg:px-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200 sm:text-sm">
              Harapan Makmur · Merauke, Papua Selatan
            </p>
            <h1 className="max-w-3xl font-serif text-3xl font-bold leading-tight text-white drop-shadow sm:text-5xl lg:text-6xl">
              Paroki St. Fransiskus Assisi
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/85 sm:text-base sm:leading-7">
              Bertumbuh dalam iman, berjalan bersama, dan melayani sesama dalam
              kasih Kristus.
            </p>
            <button
              type="button"
              onClick={() => {
                navigate("/profil-gereja");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="pointer-events-auto mt-6 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Kenali paroki <ArrowRight size={16} aria-hidden="true" />
            </button>
          </section>,
          <button
            type="button"
            aria-label="Slide sebelumnya"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-slate-950/35 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-slate-950/70 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:left-8 sm:h-12 sm:w-12"
            children={<ChevronLeft size={18} />}
          />,

          <button
            type="button"
            aria-label="Slide berikutnya"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-slate-950/35 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-slate-950/70 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:right-8 sm:h-12 sm:w-12"
            children={<ChevronRight size={18} />}
          />,

          <section
            aria-label="Pilih slide"
            className="absolute bottom-5 z-20 flex h-10 w-full items-center justify-center gap-2"
            children={images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Tampilkan slide ${i + 1}`}
                aria-current={i === currentIndex ? "true" : undefined}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 cursor-pointer rounded-full border border-white/60 transition-all duration-300 ${
                  i === currentIndex ? "w-7 bg-white" : "w-2 bg-white/40"
                }`}
              />
            ))}
          />,
        ]}
      />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-10 sm:gap-16 sm:px-6 sm:py-14 lg:px-10">
        {/* sejarah */}
        <section className="grid grid-cols-1 gap-4 overflow-hidden rounded-2xl md:grid-cols-2">
          <section
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10"
            children={[
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
                Tentang paroki
              </p>,
              <h3
                className="mb-5 font-serif text-2xl font-semibold leading-snug text-slate-900 sm:text-3xl"
                children={data.ringkasan}
              />,
              <div
                className="whitespace-pre-line text-sm leading-7 text-slate-600"
                children={data.artikel}
              />,
            ]}
          />

          <section
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1"
            children={["Foto Masa Lalu", "Foto Saat Ini"].map((label, i) => (
              <section
                key={i}
                className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-100/70 p-8 text-slate-500 transition hover:border-amber-400 hover:bg-amber-50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-amber-700">
                  <ImageIcon size={20} aria-hidden="true" />
                </div>
                <span
                  className="text-sm font-medium"
                  children={label}
                />
                <span className="text-xs text-slate-400">Dokumentasi paroki</span>
              </section>
            ))}
          />
        </section>

        {/* pengumuman */}
        <section>
          <section className="mb-5 flex items-end justify-between gap-4 sm:mb-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-800">
                Informasi umat
              </p>
              <h2 className="mt-1 border-l-4 border-amber-600 pl-3 font-serif text-2xl font-semibold text-slate-900 sm:text-3xl">
              Pengumuman
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                navigate("/pengumuman");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="shrink-0 cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-amber-800 transition hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
            >
              Lihat semua <ArrowRight size={14} className="ml-1 inline" />
            </button>
          </section>
          <ListPengumuman
            data={dummyPengumuman.slice(0, 4)}
            handler={{ showDetail: handleShowDetail }}
          />
        </section>

        {/* berita */}
        <section>
          <section className="mb-5 flex items-end justify-between gap-4 sm:mb-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-800">
                Kabar paroki
              </p>
              <h2 className="mt-1 border-l-4 border-amber-600 pl-3 font-serif text-2xl font-semibold text-slate-900 sm:text-3xl">
                Berita paroki
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                navigate("/berita");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="shrink-0 cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-amber-800 transition hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
            >
              Lihat semua <ArrowRight size={14} className="ml-1 inline" />
            </button>
          </section>

          <ListBerita
            data={dummyBerita.slice(0, 4)}
            handler={{ showDetail: (item) => setSelectedNews(item) }}
          />
        </section>
      </main>

      {isOpen && (
        <section
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsOpen(false)}
          role="presentation"
          children={[
            <button
              type="button"
              aria-label="Tutup foto"
              onClick={() => setIsOpen(false)}
              className="absolute right-5 top-5 cursor-pointer rounded-xl p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:right-8 sm:top-8"
              children={<XSquare size={35} />}
            />,
            <img
              key="selected-gallery-image"
              src={selectedImg}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[90dvh] max-w-full object-contain"
              alt="Detail"
            />,
          ]}
        />
      )}

      <DetailPengumuman
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        data={selectedDetail}
      />
    </section>
  );
}
