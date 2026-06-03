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

export default function Home() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");

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
    <DetailBerita
      title={selectedNews.title}
      content={selectedNews.content || selectedNews.excerpt}
      image={selectedNews.image}
      date={selectedNews.date}
      author={selectedNews.author}
      tags={selectedNews.tags || ["Berita"]}
      onBack={() => setSelectedNews(null)} // Tutup detail
    />;
  }

  return (
    <section className="flex flex-col items-center justify-start min-h-screen overflow-y-auto no-scrollbar w-full">
      {/* HERO */}
      <header className="relative w-full h-[76dvh] md:h-[86dvh] flex items-end justify-start bg-[#0c1a12]/90 group overflow-hidden">
        {/* Slides */}
        {images.map((img, index) => (
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
        ))}

        {/* Nav buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="cursor-pointer absolute bg-gray-300 rounded-full left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-white/50 text-black"
          children={<ChevronLeft size={18} />}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="cursor-pointer absolute right-6 bg-gray-300 rounded-full md:right-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-white/50 text-black"
          children={<ChevronRight size={18} />}
        />

        {/* Slide dots */}
        <div
          className="absolute bottom-8 ru right-10 z-20 flex gap-2 items-center"
          children={images.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all border border-gray-400 duration-500 ${
                i === currentIndex ? "bg-white/90 w-8" : "bg-white/20 w-4"
              }`}
            />
          ))}
        />
      </header>

      {/* MAIN */}
      <main className="w-full max-w-6xl mx-auto px-8 md:px-16 py-20 flex flex-col gap-20">
        {/* SEJARAH */}
        <section className="grid grid-cols-1 md:grid-cols-2 border border-gray-100 rounded overflow-hidden">
          <form className="p-10 md:p-14 border-b md:border-b-0 md:border-r bg-gray-200/40 border-gray-100">
            <p className="text-[16px] font-serif font-medium tracking-[0.18em] uppercase text-gray-900 mb-6">
              Perjalanan Iman
            </p>
            <h3 className="text-justify font-serif text-3xl text-gray-900 leading-snug mb-6">
              {data.ringkasan}
            </h3>
            <div className="text-justify text-sm text-gray-900 leading-relaxed font-medium whitespace-pre-line">
              {data.artikel}
            </div>
          </form>

          <form className="grid grid-rows-2">
            {["Foto Masa Lalu", "Foto Saat Ini"].map((label, i) => (
              <section
                key={i}
                className="flex flex-col bg-gray-300/50 items-center justify-center gap-3 border-b last:border-b-0 border-gray-100 p-10 cursor-pointer hover:bg-slate-500/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
                  <ImageIcon size={16} className="text-gray-400" />
                </div>
                <span className="text-[11px] text-gray-400 tracking-wide">
                  {label}
                </span>
              </section>
            ))}
          </form>
        </section>

        {/* PENGUMUMAN */}
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
              className="text-medium font-medium text-gray-100 hover:text-indigo-800 transition-colors cursor-pointer"
            >
              Lihat semua →
            </button>
          </section>
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
              <section
                key={card.n}
                className="p-8 md:p-10 bg-gray-300/50 hover:bg-slate-500/30 transition-colors cursor-pointer group"
              >
                <p className="text-[0.6em] text-gray-900 mb-5">{card.n}</p>
                <h3 className="font-serif text-lg text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-900 leading-relaxed group-hover:text-gray-600 font-light">
                  {card.body}
                </p>
                <div className="mt-8 text-gray-300 group-hover:text-gray-500 transition-colors">
                  <ArrowRight size={24} />
                </div>
              </section>
            ))}
          </form>
        </section>

        {/* BERITA PAROKI */}
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
              className="text-medium font-medium text-gray-100 hover:text-indigo-800 transition-colors cursor-pointer"
            >
              Lihat semua →
            </button>
          </section>

          <for
            className="divide-y divide-gray-300"
            children={[
              {
                n: "01",
                title: "Berita Utama",
                body: "Informasi terbaru seputar kegiatan paroki minggu ini.",
              },
              {
                n: "02",
                title: "Jadwal Misa",
                body: "Update perubahan jadwal misa dan perayaan sakramen.",
              },
              {
                n: "03",
                title: "Komunitas",
                body: "Kumpulan cerita dan kegiatan dari berbagai komunitas paroki.",
              },
            ].map((card) => (
              <section
                key={card.n}
                className="flex items-start bg-gray-300/50 hover:bg-slate-500/30 gap-6 py-6 group cursor-pointer"
                onClick={() => {
                  selectedNews(card);
                }}
              >
                <p
                  className="text-[10px] text-gray-300 mt-1 w-6 flex-shrink-0"
                  children={card.n}
                />

                <div
                  className="flex-1"
                  children={
                    <>
                      <h3
                        className="font-serif text-base text-gray-900 leading-snug mb-2 group-hover:text-gray-600 transition-colors"
                        children={card.title}
                      />
                      <p
                        className="text-xs text-gray-900 group-hover:text-gray-600 leading-relaxed font-light"
                        children={card.body}
                      />
                    </>
                  }
                />
                <div
                  className="text-gray-300 group-hover:text-gray-500 transition-colors mt-1"
                  children={<ArrowRight size={24} />}
                />
              </section>
            ))}
          />
        </section>
      </main>

      {/* MODAL */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsOpen(false)}
          children={
            <>
              <button
                className="absolute cursor-pointer top-8 right-8 text-white/50 hover:text-red-500 transition-colors"
                children={<XSquare size={35} />}
              />
              <img
                src={selectedImg}
                className="max-w-full max-h-[90dvh] object-contain"
                alt="Detail"
              />
            </>
          }
        />
      )}
    </section>
  );
}
