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
    <section className="flex flex-col items-center justify-start min-h-screen overflow-y-auto no-scrollbar w-full">
      {/* hero section */}
      <header
        className="relative w-full h-[76dvh] md:h-[86dvh] flex items-end justify-start bg-[#0c1a12]/90 group overflow-hidden"
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
                  alt={`slide-${index}`}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => openModal(img)}
                />
              }
            />
          )),
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="cursor-pointer absolute bg-gray-300 rounded-full left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-white/50 text-black"
            children={<ChevronLeft size={18} />}
          />,

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="cursor-pointer absolute right-6 bg-gray-300 rounded-full md:right-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-white/50 text-black"
            children={<ChevronRight size={18} />}
          />,

          <section
            className="absolute justify-center bottom-5 h-10 w-full z-20 flex gap-2 items-center"
            children={images.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all border border-gray-900 duration-500 ${
                  i === currentIndex ? "bg-white/90 h-4 w-4" : "bg-white/20 w-2"
                }`}
              />
            ))}
          />,
        ]}
      />

      <main className="w-full max-w-6xl mx-auto px-8 md:px-16 py-20 flex flex-col gap-20">
        {/* sejarah */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-1 border border-gray-100 rounded overflow-hidden">
          <section
            className="p-10 md:p-14 border-b md:border-b-1 md:border bg-stone-400/40 border-stone-500"
            children={[
              <p className="text-[16px] font-serif font-medium tracking-[0.18em] uppercase text-gray-900 mb-6">
                Perjalanan Iman
              </p>,
              <h3
                className="text-justify font-serif text-3xl text-gray-900 leading-snug mb-6"
                children={data.ringkasan}
              />,
              <div
                className="text-justify text-sm text-gray-900 leading-relaxed font-semibold whitespace-pre-line"
                children={data.artikel}
              />,
            ]}
          />

          <section
            className="grid grid-rows-2 gap-1"
            children={["Foto Masa Lalu", "Foto Saat Ini"].map((label, i) => (
              <section
                key={i}
                className="flex flex-col bg-gray-300/50 items-center justify-center gap-3 border-b last:border-b-0 border-gray-100 p-10 cursor-pointer hover:bg-slate-500/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
                  <ImageIcon size={16} className="text-gray-400" />
                </div>
                <span
                  className="text-[11px] text-gray-400 tracking-wide"
                  children={label}
                />
              </section>
            ))}
          />
        </section>

        {/* pengumuman */}
        <section>
          <section className="flex justify-between items-baseline mb-10">
            <h2 className="font-serif text-2xl border-l-4 border-rose-500/50 pl-2  text-gray-900">
              Pengumuman
            </h2>
            <button
              onClick={() => {
                navigate("/pengumuman");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-medium font-medium text-gray-900 hover:text-indigo-800 transition-colors cursor-pointer"
            >
              Lihat semua →
            </button>
          </section>
          <ListPengumuman
            data={dummyPengumuman.slice(0, 4)}
            handler={{ showDetail: handleShowDetail }}
          />
        </section>

        {/* berita */}
        <section>
          <section className="flex justify-between items-baseline mb-8">
            <h2 className="font-serif text-2xl border-l-4 border-slate-500 pl-2 text-gray-900">
              Berita Paroki
            </h2>
            <button
              onClick={() => {
                navigate("/berita");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-medium font-medium text-gray-900 hover:text-indigo-800 transition-colors cursor-pointer"
            >
              Lihat semua →
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
          children={[
            <button
              className="absolute cursor-pointer top-8 right-8 text-white/50 hover:text-red-500 transition-colors"
              children={<XSquare size={35} />}
            />,
            <img
              src={selectedImg}
              className="max-w-full max-h-[90dvh] object-contain"
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
