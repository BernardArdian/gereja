import { useState } from "react";
import { BookOpen, Target, Compass, Edit3, Sparkles, Plus } from "lucide-react";
import ContentEditorModal from "../../../component/dashboard/content_editor/ContentEditorModal";

export default function VisiMisi() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data Dummy (Asumsikan data diambil dari API/Database)
  const data = {
    visi: "Menjadi komunitas iman yang inklusif, misioner, dan berakar pada kasih Kristus untuk melayani sesama.",
    misi: [
      "Menyelenggarakan liturgi yang hidup dan partisipatif.",
      "Meningkatkan kualitas pemberdayaan jemaat di tingkat stasi.",
      "Membangun jejaring sosial yang berdampak nyata bagi masyarakat sekitar.",
      "Mengembangkan pendidikan iman yang berkelanjutan bagi orang muda.",
    ],
  };

  return (
    <section className="min-h-screen">
      {/* HEADER */}
      <header className="flex flex-row rounded-2xl items-center justify-between w-full bg-white px-8 py-5 sticky top-0 z-20">
        <div>
          <h2 className="text-xl font-serif text-gray-900 tracking-tight">
            Visi & Misi Paroki
          </h2>
          <p className="text-xs text-gray-900 font-serif uppercase tracking-widest mt-1">
            Identitas Dasar Gereja
          </p>
        </div>
        <button
          type="button"
          className="cursor-pointer flex items-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-500/20 hover:text-blue-500 text-white text-sm font-black 
          rounded-3xl transition-all active:scale-95"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} />
          Input Visi & Misi
        </button>
      </header>
      <main className="max-w-6xl mx-auto p-8">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* VISI CARD - Full Width on Top */}
          <div className="lg:col-span-12">
            <div className="bg-white rounded p-8 md:p-12 border border-gray-100 relative overflow-hidden group">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 p-8 text-indigo-50/50 group-hover:text-indigo-50 transition-colors">
                <Sparkles size={120} />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                  <Target size={32} />
                </div>
                <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-4">
                  Visi Utama
                </h3>
                <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed max-w-3xl italic">
                  "{data.visi}"
                </p>
              </div>
            </div>
          </div>

          {/* MISI CARD - List with bullet points */}
          <div className="lg:col-span-12">
            <div className="bg-white rounded border border-gray-100  overflow-hidden flex flex-col md:flex-row">
              {/* Left Side: Title */}
              <div className="bg-[#B38728] p-10 md:w-1/3 flex flex-col justify-center text-white">
                <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Compass size={24} />
                </div>
                <h3 className="text-2xl font-black mb-2">Misi Kami</h3>
                <p className="text-black text-sm leading-relaxed">
                  Langkah-langkah strategis yang kami ambil untuk mewujudkan
                  visi ilahi di tengah umat.
                </p>
              </div>

              {/* Right Side: Mission Items */}
              <div className="p-10 md:w-2/3">
                <ul className="space-y-6">
                  {data.misi.map((misi, index) => (
                    <li key={index} className="flex gap-4 items-start group">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-xs font-black text-indigo-400 group-hover:bg-[#B38728]/70 group-hover:text-white transition-all">
                        {index + 1}
                      </div>
                      <p className="text-gray-600 font-medium leading-relaxed pt-1">
                        {misi}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ContentEditorModal
        isOpen={isModalOpen}
        mode="visimisi"
        title="Panel input Visi & Misi"
        labelTitle="Visi Utama"
        handlers={{
          close: () => setIsModalOpen(false),
          confirm: (updated) => {
            console.log("Misi Baru:", updated.items);
            setIsModalOpen(false);
          },
          clear: () => {},
          initialData: {
            judul: data.visi,
            items: data.misi,
          },
        }}
      />
    </section>
  );
}
