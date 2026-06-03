import { useState } from "react";
import { Phone, MapPin, Globe, Map as MapIcon, Save } from "lucide-react";

export default function KontakDanLokasi() {
  const [mapUrl, setMapUrl] = useState("");

  return (
    <section className="w-full bg-gray-300 p-6 rounded-xl">
      <main className="max-w-4xl mx-auto space-y-8">
        {/* GRID UNTUK INPUT KONTAK & ALAMAT */}
        <section className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <form className="space-y-2">
            <label
              htmlFor="kontak"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700"
            >
              <Phone size={16} className="text-indigo-600" />
              Nomor Telepon / WhatsApp
            </label>
            <input
              className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block px-4 py-2.5 outline-none transition-all"
              type="number"
              id="kontak"
              placeholder="Contoh: 08123456789"
            />
          </form>

          <form className="space-y-2">
            <label
              htmlFor="alamat"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700"
            >
              <MapPin size={16} className="text-indigo-600" />
              Alamat Lengkap
            </label>
            <input
              className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block px-4 py-2.5 outline-none transition-all"
              type="text"
              id="alamat"
              placeholder="Jl. Nama Jalan No. XX"
            />
          </form>
        </section>

        {/* INTEGRASI GOOGLE MAPS */}
        <section className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Globe size={16} className="text-indigo-600" />
            URL Embed Google Maps
          </label>
          <input
            className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block px-4 py-2.5 outline-none transition-all"
            type="text"
            id="map"
            placeholder="Tempelkan link src dari embed Google Maps..."
            value={mapUrl}
            onChange={(e) => setMapUrl(e.target.value)}
          />

          <form className="w-full h-[400px] rounded-xl overflow-hidden border border-dashed border-gray-300 bg-gray-50 relative flex items-center justify-center">
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
                className="animate-in fade-in duration-500"
              ></iframe>
            ) : (
              <section className="text-center space-y-2 p-6">
                <form className="bg-white p-4 rounded-full shadow-sm inline-block mb-2">
                  <MapIcon size={32} className="text-gray-400" />
                </form>
                <p className="text-gray-500 font-medium">
                  Pratinjau Peta Belum Tersedia
                </p>
                <p className="text-sm text-gray-400 max-w-[250px]">
                  Silakan masukkan URL embed Google Maps pada kolom di atas.
                </p>
              </section>
            )}
          </form>

          <p className="text-xs text-gray-500 italic">
            *Tips: Buka Google Maps {">"} Bagikan {">"} Sematkan peta {">"}{" "}
            Salin link yang ada di dalam <strong>src="..."</strong>
          </p>
        </section>

        {/* Tombol Simpan */}
        <section className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            className="flex items-center gap-2 justify-center bg-blue-500 hover:bg-blue-500/20 hover:text-blue-500 cursor-pointer text-white px-8 py-2.5 rounded-lg font-bold transition-all active:scale-95"
            onClick={(i) => {
              i.stopPropagation();
            }}
          >
            <Save size={20} />
            Simpan
          </button>
        </section>
      </main>
    </section>
  );
}
