import { Target, Sparkles, Compass } from "lucide-react";

export default function VisiMisiGereja() {
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
    <section className="min-h-screen pb-12">
      <main className="max-w-6xl mx-auto p-8">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* VISI CARD*/}
          <div className="lg:col-span-12">
            <section className="bg-gray-200/40 rounded p-8 md:p-12 border border-gray-100 relative overflow-hidden group">
              {/* Decorative Background */}
              <section className="absolute top-0 right-0 p-8 text-indigo-50/50 group-hover:text-indigo-50 transition-colors">
                <Sparkles size={120} />
              </section>

              <section className="relative text-justify z-10 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-slate-200 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                  <Target size={32} />
                </div>
                <h3 className="text-[16px] font-black text-white uppercase tracking-[0.3em] mb-4">
                  Visi Utama
                </h3>
                <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed max-w-3xl italic">
                  "{data.visi}"
                </p>
              </section>
            </section>
          </div>

          {/* MISI CARD */}
          <div className="lg:col-span-12">
            <div className="bg-gray-200/40 rounded border border-gray-100  overflow-hidden flex flex-col md:flex-row">
              {/* Left Side: Title */}
              <div className="bg-[#B38728] p-10 md:w-1/3 flex flex-col justify-center text-white">
                <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Compass size={24} />
                </div>
                <h3 className="text-2xl font-black mb-2">Misi Kami</h3>
                <p className="text-black text-justify text-sm leading-relaxed">
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
      </main>{" "}
    </section>
  );
}
