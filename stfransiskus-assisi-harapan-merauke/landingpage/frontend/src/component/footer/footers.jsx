import { MapIcon } from "lucide-react";
import { useState } from "react";

//import axios from "axios";

import StFransis from "../../assets/image/st.fransiskus_assisi.png";

export default function Footers() {
  const [mapUrl] = useState("");

  const jadwalMisa = [
    "Minggu — 08.00 WIT",
    "Minggu — 10.00 WIT",
    "Minggu — 16.00 WIT",
  ];

  return (
    <footer className="w-full bg-gray-700/70 text-white border-t border-amber-600">
      <section className="max-w-screen-xl mx-auto px-6 py-5">
        <section className="grid grid-cols-1 items-center md:grid-cols-3 gap-12">
          {/* Logo */}
          <section className="grid md:grid-cols-2 gap-1">
            <img src={StFransis} className="size-65 w-35" alt="Logo" />
            <div className="flex flex-col h-min-screen justify-between items-center">
              <h2
                className="text-[1em] font-serif text-medium font-medium text-amber-400 mb-1"
                children={"Santo Fransiskus Assisi, Harapan Makmur."}
              />

              <span
                className="text-justify text-[0.8em] font-serif font-medium leading-relaxed"
                children={
                  "Jl.Pattimura, Harapan Makmur - Distrik Kurik, Kab.Merauke, Papua Selatan."
                }
              />
            </div>
          </section>

          {/* INTENSI DOA, KONTAK & JADWAL */}
          <section className="flex flex-col justify-around items-center gap-8">
            <div
              className="cursor-pointer hover:underline"
              onClick={""}
              children={
                <p
                  className="text-[0.81em] font-serif font-medium tracking-[0.18em] uppercase text-amber-400"
                  children={"Intensi Doa"}
                />
              }
            />

            <section
              className="flex flex-col items-center justify-center"
              children={
                <>
                  <p className="text-[0.81em] font-serif underline font-medium tracking-[0.18em] text-amber-400 uppercase mb-3">
                    Kontak Person
                  </p>

                  <a
                    href={`https://wa.me/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-gray-300 hover:text-green-400 hover:underline transition-colors leading-relaxed font-poppins inline-flex items-center gap-2 justify-center lg:justify-start"
                  >
                    <svg
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="26"
                    >
                      <path
                        d="M50 10C27.9 10 10 27.9 10 50c0 7.2 2 14 5.4 19.8L10 90l20.8-5.3C36.4 87.9 43 90 50 90c22.1 0 40-17.9 40-40S72.1 10 50 10z"
                        fill="none"
                        stroke="#25D366"
                        stroke-width="6"
                      />

                      <g transform="translate(52 60) scale(1.6) translate(-52 -60)">
                        <path
                          d="M63.5 57.2l-5.2-1.4c-.8-.2-1.6.1-2.1.7l-2.3 2.8c-4.1-1.9-7.4-5.2-9.3-9.3l2.8-2.3c.6-.5.9-1.3.7-2.1L46.7 40c-.3-1-.8-1.7-2-1.7h-4.8C38.6 38.3 37 40 37 42c0 13.3 10.7 24 24 24 2 0 3.7-1.6 3.7-3.9v-4.8c0-1.1-.9-1.8-1.2-2.1z"
                          fill="#25D366"
                        />
                      </g>
                    </svg>

                    <span
                      className="break-all sm:break-normal"
                      children={"+62 846-9012-8891"}
                    />
                  </a>
                </>
              }
            />

            <form className="flex flex-col items-center justify-center">
              <p
                className="text-[0.81em] font-serif underline font-medium tracking-[0.18em] uppercase text-amber-400 mb-3"
                children={"Jadwal Misa"}
              />
              <section
                className="flex flex-col gap-1.5"
                children={jadwalMisa.map((j) => (
                  <span
                    key={j}
                    className="text-medium font-light"
                    children={j}
                  />
                ))}
              />
            </form>
          </section>

          {/* Maps */}
          <section>
            <p
              className="text-[0.81em] font-serif underline tracking-[0.18em] uppercase text-amber-400 mb-3"
              children={"Lokasi"}
            />

            <form
              className="w-full h-55 border border-gray-100 rounded overflow-hidden"
              children={
                mapUrl ? (
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
                  <section
                    className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gray-50"
                    children={
                      <>
                        <MapIcon size={18} className="text-gray-400" />
                        <p
                          className="text-[10px] text-gray-900 uppercase tracking-widest"
                          children={"Peta belum tersedia"}
                        />
                      </>
                    }
                  />
                )
              }
            />
          </section>
        </section>

        <div className="h-px bg-amber-500 mt-4" />

        {/* COPYRIGHT */}
        <section className="flex pt-4 items-center justify-center w-full flex flex-1">
          <span
            className="font-serif gap-1 text-[0.8em] text-center tracking-widest"
            children={`©
             ${new Date().getFullYear()} Paroki St. Fransiskus Assisi Harapan
            Makmur — All Rights Reserved`}
          />
        </section>
      </section>
    </footer>
  );
}
