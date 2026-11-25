import { useState, useEffect } from "react";

export default function HeroHeader({
  images = [],
  interval = 5000,
  eyebrow,
  title,
  className = "",
  children,
}) {
  // Terima array maupun satu string URL.
  const list = Array.isArray(images) ? images : [images];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Slideshow hanya berjalan jika gambar lebih dari satu.
    if (list.length < 2) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === list.length - 1 ? 0 : prev + 1));
    }, interval);
    return () => clearInterval(timer);
  }, [list.length, interval]);

  return (
    <header
      className={`relative mb-6 min-h-52 w-full overflow-hidden rounded-2xl sm:mb-8 ${className}`}
      children={[
        ...list.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            referrerPolicy="no-referrer"
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "z-0 opacity-100" : "z-0 opacity-0"
            }`}
          />
        )),
        <div key="overlay" className="absolute inset-0 z-10 bg-black/60" />,
        <section
          key="content"
          className="relative z-20 flex min-h-52 flex-col justify-between gap-6 p-5 sm:flex-row sm:items-end sm:p-8"
          children={[
            <section
              key="text"
              children={[
                <p
                  key="eyebrow"
                  className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/70"
                  children={eyebrow}
                />,
                <h2
                  key="title"
                  className="font-serif text-3xl font-bold text-white sm:text-4xl"
                  children={title}
                />,
              ]}
            />,
            children && (
              <section
                key="slot"
                className="w-full sm:max-w-sm"
                children={children}
              />
            ),
          ]}
        />,
        list.length > 1 && (
          <section
            key="dots"
            aria-label="Pilih gambar"
            className="absolute bottom-2 z-20 flex w-full items-center justify-center gap-1.5"
            children={list.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Tampilkan gambar ${i + 1}`}
                aria-current={i === currentIndex ? "true" : undefined}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 cursor-pointer rounded-full border border-white/60 transition-all duration-300 ${
                  i === currentIndex ? "w-5 bg-white" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          />
        ),
      ]}
    />
  );
}
