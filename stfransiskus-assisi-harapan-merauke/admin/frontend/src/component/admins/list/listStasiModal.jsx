import { Edit2, Trash2, Printer } from "lucide-react";
//import { useState } from "react";

import InputStasi from "../input/input_stasi";
import LogoutModal from "../../alert/logout_modal";

export default function StasiListModal({ data, handlers }) {
  //const [iSActiveModal, setActiveModal] = useState(false);

  const handleDelte = () => {
    window.confirm("apakah anda yakin untuk menghapus stasi ini?");
  };

  //const total = 355;

  const total = data.reduce((sum, stasi) => sum + Number(stasi.jumlahUmat), 0);

  return (
    <section className="lg:col-span-2 bg-yellow-500/50 border border-gray-100 rounded-xl overflow-hidden mb-3">
      <header className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-sm font-serif text-gray-900">
          Stasi Paroki ST.Fransiskus Assisi Harapan Makmur
        </h3>

        <h2 className="text-sm font-serif text-gary-900">
          total umat: {total}
        </h2>
      </header>

      <section className="p-0">
        <table className="w-full text-left border-collapse">
          <thead className="flext items-center justify-center sticky top-0">
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
              <th className="px-6 py-3.5 text-[10px] font-serif text-gray-900 uppercase tracking-widest">
                Desa
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
            children={data.map((stasi, i) => (
              <tr
                key={i}
                className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                children={
                  <>
                    <td
                      className="px-6 py-4 text-sm font-medium text-gray-900"
                      children={stasi.stasi}
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
                      className="px-6 py-4 text-sm text-gray-900"
                      children={stasi.desa}
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
                                className="cursor-pointer p-3 bg-slate-200 rounded text-yellow-700 hover:bg-amber-600 hover:text-white transition-all active:scale-90 tarcking-widest"
                                type="button"
                                onClick={(i) => {
                                  handlers.edit(stasi);
                                  i.stopPropagation();
                                }}
                                children={<Edit2 size={18} />}
                              />

                              <button
                                className="cursor-pointer p-3 bg-slate-200 rounded text-rose-400 hover:bg-red-600 hover:text-white transition-all 
                                active:scale-90 tarcking-widest"
                                onClick={(i) => {
                                  i.stopPropagation();
                                  handleDelte(stasi);
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
      </section>

      {/* <InputStasi onClose={() => setActiveModal(null)} /> */}
    </section>
  );
}
