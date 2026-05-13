import { Maximize2 } from "lucide-react";

export default function GalleryGereja() {
  const gallerys = [
    {
      id: 3,
      url: "https://picsum.photos/seed/gal1/1000/1000",
      title: "Misa Minggu",
      date: "20 Jan 2024",
      stasi: "Harapan",
    },
    {
      id: 4,
      url: "https://picsum.photos/seed/gal2/1000/1000",
      title: "Kegiatan OMK",
      date: "15 Jan 2024",
      stasi: "Kurik",
    },
    {
      id: 5,
      url: "https://picsum.photos/seed/gal3/1000/1000",
      title: "Bakti Sosial",
      date: "10 Jan 2024",
      stasi: "Harapan",
    },
    {
      id: 6,
      url: "https://picsum.photos/seed/gal4/1000/1000",
      title: "Pembangunan Gereja",
      date: "05 Jan 2024",
      stasi: "Kurik",
    },
  ];

  return (
    <section className="min-h-screen px-4">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <header className="py-4 border-b border-amber-500 mb-4">
          <h2 className="font-serif text-2xl text-gray-900">
            Gallery Gereja Paroki St. Fransiskus Assisi
          </h2>
          <p className="text-[12px] font-medium tracking-[0.18em] uppercase text-gray-800 mb-1">
            Arsip Foto & Kegiatan Gereja
          </p>
        </header>

        {/* GRID */}
        <main className="grid grid-cols-1 md:grid-cols-3 m-15 gap-0.5 overflow-hidden">
          {gallerys.map((i) => (
            <div
              key={i.id}
              className="cursor-pointer group bg-white rounded overflow-hidden border border-gray-100 transition-all duration-500"
              //onClick={() => setSelectedImage(item)}
            >
              <div className="relative overflow-hidden cursor-pointer">
                <img
                  src={i.url}
                  alt={i.title}
                  className="w-full h-[70dvh] object-cover group-hover:scale-110 transition-transform duration-700"
                  //onClick={() => setSelectedImage(item)}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    //onClick={() => setSelectedImage(item)}
                    className="cursor-pointer p-3 bg-white rounded-2xl text-indigo-600"
                  >
                    <Maximize2 size={18} />
                  </button>
                </div>
                {/* Badge Stasi */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[9px] font-black text-indigo-600 rounded-lg shadow-sm">
                    STASI {i.stasi.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="p-6 bg-gray-500/40">
                <h4 className="text-sm font-bold text-gray-900 line-clamp-1">
                  {i.title}
                </h4>
                <p className="text-[10px] font-black text-gray-900 uppercase mt-1">
                  {i.date}
                </p>
              </div>
            </div>
          ))}
        </main>
      </div>
    </section>
  );
}
