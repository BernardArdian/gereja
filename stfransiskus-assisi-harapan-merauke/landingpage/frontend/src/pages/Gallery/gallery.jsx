import { Maximize2, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function GalleryGereja() {
  const [stasiFilter, setStasiFilter] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);

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

  const filteredData = gallerys.filter((item) => {
    const matchesStasi = stasiFilter === "Semua" || item.stasi === stasiFilter;
    return matchesStasi;
  });

  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <section className="min-h-screen px-4">
      {/* HEADER */}
      <header className="flex items-center justify-between py-4 border-b border-amber-500 mb-4">
        <section
          children={
            <>
              <h2 className="font-serif text-1xl text-gray-900">
                Gallery Gereja Paroki St.Fransiskus Assisi
              </h2>
              <p className="text-[12px] font-semibold tracking-[0.18em] uppercase text-gray-800 mb-1">
                Arsip Foto & Kegiatan Gereja
              </p>
            </>
          }
        />

        <section
          className="relative"
          children={
            <>
              <Filter
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                size={13}
              />
              <select
                className="pl-9 pr-8 py-2 border border-gray-300 rounded text-sm text-gray-500 outline-none appearance-none cursor-pointer bg-white focus:border-gray-300 transition-all"
                value={stasiFilter}
                onChange={(i) => {
                  setStasiFilter(i.target.value);
                  setCurrentPage(1);
                }}
                children={
                  <>
                    <option value="Semua">Semua Stasi</option>
                    <option value="Harapan">Stasi Harapan</option>
                    <option value="Kurik">Stasi Kurik</option>
                  </>
                }
              />
            </>
          }
        />
      </header>
      <main className="max-w-5xl mx-auto px-8  pb-10">
        {/* GRID */}
        <section
          className="grid grid-cols-1 md:grid-cols-3 m-15 gap-0.5 overflow-hidden"
          children={
            paginatedData.length > 0 ? (
              <>
                {paginatedData.map((i) => (
                  <section
                    key={i.id}
                    className="cursor-pointer group bg-white rounded overflow-hidden border border-gray-100 transition-all duration-500"
                    //onClick={() => setSelectedImage(item)}
                  >
                    <section className="relative overflow-hidden cursor-pointer">
                      <img
                        src={i.url}
                        alt={i.title}
                        className="w-full h-[70dvh] object-cover group-hover:scale-110 transition-transform duration-700"
                        //onClick={() => setSelectedImage(item)}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-50 transition-opacity flex items-center justify-center gap-2">
                        <button
                          //onClick={() => setSelectedImage(item)}
                          className="cursor-pointer p-3 bg-white rounded-xl text-indigo-600"
                          children={<Maximize2 size={18} />}
                        />
                      </div>
                      {/* Badge Stasi */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[9px] font-black text-indigo-600 rounded-lg shadow-sm">
                          STASI {i.stasi.toUpperCase()}
                        </span>
                      </div>
                    </section>
                    <div className="p-6 bg-gray-500/40">
                      <h4
                        className="text-sm font-bold text-gray-900 line-clamp-1"
                        children={i.title}
                      />
                      <p
                        className="text-[10px] font-black text-gray-900 uppercase mt-1"
                        children={i.date}
                      />
                    </div>
                  </section>
                ))}
              </>
            ) : (
              <>
                <section
                  className="flex flex-col items-center justify-center py-32 text-gray-300"
                  children={
                    <>
                      <Search size={36} className="mb-4" />
                      <p className="text-xs uppercase tracking-widest">
                        Gallery foto tidak ditemukan
                      </p>
                    </>
                  }
                />
              </>
            )
          }
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <footer
            className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6"
            children={
              <>
                <p className="text-xs text-gray-100">
                  Menampilkan{" "}
                  <span
                    className="text-gray-700 font-serif font-medium"
                    children={paginatedData.length}
                  />{" "}
                  dari{" "}
                  <span
                    className="text-gray-700 font-serif font-medium"
                    children={filteredData.length}
                  />{" "}
                  data
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="cursor-pointer p-2 border border-gray-100 rounded hover:bg-gray-50 disabled:opacity-20 transition-all"
                    children={<ChevronLeft size={14} />}
                  />

                  <div
                    className="flex gap-1"
                    children={[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`cursor-pointer w-8 h-8 rounded text-[11px] font-medium transition-all ${
                          currentPage === i + 1
                            ? "bg-gray-900 text-white"
                            : "border border-gray-100 text-gray-400 hover:bg-gray-50"
                        }`}
                        children={i + 1}
                      />
                    ))}
                  />
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="cursor-pointer p-2 border border-gray-100 rounded hover:bg-gray-50 disabled:opacity-20 transition-all"
                    children={<ChevronRight size={14} />}
                  />
                </div>
              </>
            }
          />
        )}
      </main>
    </section>
  );
}
