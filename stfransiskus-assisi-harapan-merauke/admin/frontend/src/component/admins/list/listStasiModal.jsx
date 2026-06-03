import { Edit2, Trash2 } from "lucide-react";
//import { useState } from "react";

import InputStasi from "../input/input_stasi";
import LogoutModal from "../../alert/logout_modal";

export default function StasiListModal() {
  //const [iSActiveModal, setActiveModal] = useState(false);

  const handleDelte = () => {
    window.confirm("apakah anda yakin untuk menghapus stasi ini?");
  };

  const dataStasi = [
    {
      nama: "St. Yohanes",
      namaGereja: "st.Yohanes",
      alamat: "Jl. Merdeka No. 10",
      jumlahUmat: 150,
    },
    { nama: "Stasi St. Maria", alamat: "Jl. Mawar No. 5", jumlahUmat: 85 },
    { nama: "Stasi St. Petrus", alamat: "Jl. Melati No. 22", jumlahUmat: 120 },
  ];

  return (
    <section className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl overflow-hidden mb-3">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-sm font-serif text-gray-900">
          Stasi Paroki ST.Fransiskus Assisi Harapan Makmur — Merauke Papua
          Selatan
        </h3>
      </div>
      <div className="p-0">
        <table className="w-full text-left border-collapse">
          <thead className="flext items-center justify-center sticky top-0 bg-white">
            <tr className="border-b border-gray-100">
              <th className="px-6 py-3.5 text-[10px] font-serif text-gray-900 uppercase tracking-widest">
                Nama Stasi
              </th>
              <th className="px-6 py-3.5 text-[10px] font-serif text-gray-900 uppercase tracking-widest">
                Nama Gereja
              </th>
              <th className="px-6 py-3.5 text-[10px] font-serif text-gray-900 uppercase tracking-widest">
                Alamat
              </th>
              <th className="px-6 py-3.5 text-[10px] font-serif text-gray-900 uppercase tracking-widest text-center">
                Jumblah Umat
              </th>
              <th className="px-6 py-3.5 text-[10px] font-serif text-gray-900 uppercase tracking-widest text-center">
                Kelola
              </th>
            </tr>
          </thead>
          <tbody
            children={dataStasi.map((stasi, i) => (
              <tr
                key={i}
                className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                children={
                  <>
                    <td
                      className="px-6 py-4 text-sm font-medium text-gray-900"
                      children={stasi.nama}
                    />
                    <td
                      className="px-6 py-4 text-sm text-gray-900"
                      children={stasi.namaGereja}
                    />
                    <td
                      className="px-6 py-4 text-sm text-gray-900"
                      children={stasi.alamat}
                    />
                    <td
                      className="px-6 py-4 text-center"
                      children={
                        <span
                          className="inline-block text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-1"
                          children={stasi.jumlahUmat}
                        />
                      }
                    />
                    <td
                      className="px-6 py-4 text-center"
                      children={
                        <section
                          className="flex items-center justify-center gap-2"
                          children={
                            <>
                              <button
                                className="cursor-pointer p-3 bg-slate-200 rounded text-yellow-700 hover:bg-amber-600 hover:text-white transition-all active:scale-90"
                                onClick={(i) => {
                                  i.stopPropagation();
                                }}
                                children={<Edit2 size={18} />}
                              />

                              <button
                                className="cursor-pointer p-3 bg-slate-200 rounded text-rose-400 hover:bg-red-600 hover:text-white transition-all 
                                active:scale-90"
                                onClick={(i) => {
                                  i.stopPropagation();
                                  handleDelte;
                                }}
                                children={<Trash2 size={18} />}
                              />
                            </>
                          }
                        />
                      }
                    />
                  </>
                }
              ></tr>
            ))}
          />
        </table>
      </div>

      {/* <InputStasi onClose={() => setActiveModal(null)} /> */}
    </section>
  );
}
