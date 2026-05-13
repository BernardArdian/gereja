import { Routes, Route } from "react-router-dom";
// import { useState } from "react";
import { MapIcon } from "lucide-react";

import "./App.css";

import Layout from "./component/menu/appbar";
import Home from "./pages/home/home.jsx";
import Pedoman from "./pages/pedoman/pedoman.jsx";
import Pengumuman from "./pages/pengumuman/pengumuman.jsx";
import Berita from "./pages/berita/berita.jsx";
import AdministratifGereja from "./pages/administratif-gereja/administratif_gereja.jsx";
import GalleryGereja from "./pages/Gallery/gallery.jsx";
import Katekese from "./pages/katekese/katekese.jsx";
import ProfilGereja from "./pages/profil/profilGereja.jsx";

import Footers from "./component/footer/footers.jsx";

import StFransis from "../src/assets/image/st.fransiskus_assisi.png";

function App() {
  // const [mapUrl] = useState("");
  // const jadwal_Umum = ["Minggu — 08.00 WIT", "Minggu — 10.00 WIT", "Minggu — 16.00 WIT"];

  return (
    <Layout>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/pedoman-pastoral" element={<Pedoman />} />
        <Route path="/pengumuman" element={<Pengumuman />} />
        <Route path="/administratif" element={<AdministratifGereja />} />
        <Route path="/katekese" element={<Katekese />} />
        <Route path="/profil-gereja" element={<ProfilGereja />} />
        <Route path="/pedoman" element={<Pedoman />} />
        <Route path="/berita" element={<Berita />} />
        <Route path="/gallery" element={<GalleryGereja />} />
      </Routes>

      <Footers />

      {/* <footer className="w-full bg-gray-400 border-t border-gray-100 mt-16">
        <div className="max-w-screen-xl mx-auto px-6 py-12">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div className="flex items-start gap-4">
              <img
                src={StFransis}
                className="size-65 w-35 rounded"
                alt="Logo"
              />
              <div>
                <h2 className="text-medium font-medium text-gray-900 mb-1">
                  St.Fransiskus Assisi
                </h2>
                <p className="text-[15px] text-gray-900 font-medium leading-relaxed">
                  Jl. Pattimura, Merauke,
                  <br />
                  Papua Selatan.
                </p>
              </div>
            </div>

            <section className="flex flex-col gap-8">
              <form>
                <p className="text-[16px] font-medium tracking-[0.18em] text-gary-900 uppercase mb-3">
                  Kontak Person
                </p>

                <a
                  href={`https://wa.me/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-medium text-gray-900 hover:text-gray-900 transition-colors font-light"
                >
                  Kontak 1
                </a>
              </form>

              <form>
                <p className="text-[16px] font-medium tracking-[0.18em] uppercase text-gray-900 mb-3">
                  Jadwal Misa
                </p>
                <section className="flex flex-col gap-1.5">
                  {

                    // jadwal_Umum.map((j) => (
                    //   <span key={j} className="text-medium text-gray-900 font-light">
                    //     {j}
                    //   </span>
                    // ))
                  
                  [
                    "Minggu — 08.00 WIT",
                    "Minggu — 10.00 WIT",
                    "Minggu — 16.00 WIT",
                  ].map((j) => (
                    <span key={j} className="text-medium text-gray-900 font-light">
                      {j}
                    </span>
                  ))}
                </section>
              </form>
            </section>

            <section>
              <p className="text-[16px] font-medium tracking-[0.18em] uppercase text-gray-900 mb-3">
                Lokasi
              </p>
              <form className="w-full h-40 border border-gray-100 rounded overflow-hidden">
                {mapUrl ? (
                  <iframe
                    title="Google Maps"
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <section className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gray-50">
                    <MapIcon size={18} className="text-gray-300" />
                    <p className="text-[10px] text-gray-900 uppercase tracking-widest">
                      Peta belum tersedia
                    </p>
                  </section>
                )}
              </form>
            </section>
          </section>

          <section className="mt-12 pt-6 border-t border-gray-100">
            <p className="text-[10px] text-gray-900 text-center uppercase tracking-widest">
              © {new Date().getFullYear()} Paroki St. Fransiskus Assisi Harapan
              Makmur — Merauke, Papua Selatan
            </p>
          </section>
        </div>
      </footer> */}
    </Layout>
  );
}

export default App;
