import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

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

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("siteTheme") || "light",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("siteTheme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <Layout theme={theme}>
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

      <Footers theme={theme} onToggleTheme={toggleTheme} />
    </Layout>
  );
}

export default App;
