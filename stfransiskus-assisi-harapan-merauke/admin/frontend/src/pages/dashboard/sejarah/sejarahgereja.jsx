import { useState } from "react";
import {
  History,
  Plus,
  Milestone,
  Clock,
  Image as ImageIcon,
} from "lucide-react";
import ContentEditorModal from "../../../component/dashboard/content_editor/ContentEditorModal";

export default function SejarahGereja() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data Dummy Sejarah
  const data = {
    ringkasan:
      "Berawal dari sebuah gubuk kecil di tahun 1950, komunitas ini tumbuh menjadi pusat iman yang kokoh bagi ribuan umat hingga saat ini.",
    artikel: `Gereja ini didirikan pada tanggal 15 Agustus 1950 oleh Pastor Johannes van der Steur. Pada awalnya, jemaat hanya berjumlah 12 kepala keluarga yang berkumpul di rumah salah satu warga. Seiring berjalannya waktu, semangat gotong royong umat berhasil membangun gedung semi-permanen pertama pada tahun 1965. 
    
    Dekade demi dekade, gereja ini bukan hanya menjadi tempat ibadah, tetapi juga pusat pendidikan dan pelayanan sosial bagi masyarakat lintas agama di wilayah ini.`,
    milestones: [
      {
        tahun: "1950",
        event: "Peletakan batu pertama oleh Mgr. Soegijapranata.",
      },
      {
        tahun: "1975",
        event: "Peresmian gedung utama dengan arsitektur lokal.",
      },
      { tahun: "2005", event: "Renovasi besar dan penambahan aula paroki." },
      { tahun: "2024", event: "Pencapaian 10.000 umat terdaftar." },
    ],
  };

  return (
    <section className="min-h-screen">
      {/* HEADER */}
      <header className="flex flex-row rounded-2xl items-center justify-between w-full bg-white px-8 py-5 sticky top-0 z-20">
        <div>
          <h2 className="text-xl font-serif text-gray-900 tracking-tight">
            Sejarah Gereja
          </h2>
          <p className="text-xs text-gray-900 font-serif uppercase tracking-widest mt-1">
            Arsip & Rekam Jejak Pelayanan
          </p>
        </div>
        <button
          type="button"
          className="cursor-pointer flex items-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-500/20 hover:text-blue-600 text-white text-sm font-black 
          rounded-3xl transition-all active:scale-95"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} />
          Input Sejarah
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SISI KIRI: Artikel Naratif */}
          <section className="lg:col-span-8 space-y-8">
            <section className="bg-white rounded text-justify p-8 md:p-12 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <History size={24} />
                </div>
                <h3 className="text-2xl font-serif  text-gray-800 tracking-tight">
                  Perjalanan Iman
                </h3>
              </div>

              <section className="prose prose-indigo max-w-none">
                <p
                  className="text-xl font-bold text-gray-700 leading-relaxed mb-6 italic border-l-4 border-indigo-500 pl-6"
                  children={data.ringkasan}
                />
                <span
                  className="text-gray-600 leading-[1.8] font-medium space-y-4 whitespace-pre-line"
                  children={data.artikel}
                />
              </section>

              {/* Placeholder Foto Sejarah */}
              <section className="mt-12 grid grid-cols-2 gap-2">
                <div className="aspect-video bg-gray-100 rounded flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200">
                  <ImageIcon size={32} className="mb-2" />
                  <h4 className="text-[10px] font-black uppercase">
                    Foto Masa Lalu
                  </h4>
                </div>
                <div className="aspect-video bg-gray-100 rounded flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200">
                  <ImageIcon size={32} className="mb-2" />
                  <h4 className="text-[10px] font-black uppercase">
                    Foto Saat Ini
                  </h4>
                </div>
              </section>
            </section>
          </section>

          {/* SISI KANAN: Timeline / Milestones */}
          <section className="lg:col-span-4 space-y-6">
            <section className="bg-[#B38728] rounded p-8 text-white shadow-indigo-200">
              <section className="flex items-center gap-3 mb-8">
                <Milestone className="text-white" size={24} />
                <h3 className="text-lg font-black tracking-tight">
                  Garis Waktu
                </h3>
              </section>

              <section className="space-y-8 relative">
                {/* Garis Vertikal Timeline */}
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-indigo-700/50"></div>

                {data.milestones.map((item, index) => (
                  <section key={index} className="relative pl-10 group">
                    {/* Dot */}
                    <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full bg-slate-300 border-4 border-indigo-400 group-hover:border-white transition-all z-10" />

                    <div className="flex flex-col">
                      <span
                        className="text-black font-black text-sm tracking-widest mb-1 group-hover:text-white"
                        children={item.tahun}
                      />

                      <p
                        className="text-sm font-medium text-indigo-100/80 leading-relaxed group-hover:text-white transition-colors"
                        children={item.event}
                      />
                    </div>
                  </section>
                ))}
              </section>

              <footer className="text-center mt-10 pt-6 border-t border-gray-100">
                <p className="text-[10px] text-gray-900 uppercase tracking-widest mb-1">
                  Update Terakhir
                </p>
                <p className="text-sm font-serif text-gray-800">
                  Februari 2026
                </p>
              </footer>
            </section>
          </section>
        </section>
      </main>

      {/* <ContentEditorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="history"
        title="Panel Konten Sejarah & Timeline"
        labelTitle="Ringkasan Pendek"
        initialData={{
          judul: data.ringkasan,
          items: data.milestones, // DATA TIMELINE KIRIM KE SINI
        }}
        onConfirm={(updated) => {
          console.log("Timeline Baru:", updated.items);
          // Masukkan logika setState kamu di sini
          handleModalOpens;
        }}
      /> */}

      <ContentEditorModal
        isOpen={isModalOpen}
        mode="history"
        title="Input Panel Sejarah & Timeline"
        labelTitle="Ringkasan Pendek"
        handlers={{
          close: () => setIsModalOpen(false),
          confirm: (updated) => {
            console.log("Sejarah baru dan timeline baru:", updated.items);
            setIsModalOpen(false);
          },
          initialData: {
            judul: data.ringkasan,
            items: data.milestones,
          },
        }}
      />
    </section>
  );
}
