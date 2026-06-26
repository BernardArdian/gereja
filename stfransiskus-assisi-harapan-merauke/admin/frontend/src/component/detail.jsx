import { ArrowLeft, Calendar, User, Share2, Edit3 } from "lucide-react";

export default function Detail({
  formData,
  handlers = () => window.history.back(),
}) {
  return (
    <section className="min-h-screen bg-white pl-3 pr-3">
      {/* ACTION BAR STICKY */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={handlers.onBack}
            className="cursor-pointer group flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <div className="p-2 rounded-xl group-hover:bg-indigo-50 transition-colors">
              <ArrowLeft size={20} />
            </div>
            KEMBALI
          </button>
        </div>
      </nav>

      {/* ARTICLE HEADER */}
      <header className="max-w-4xl mx-auto px-6 pt-12 pb-8">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-8 tracking-tight">
          {formData.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 py-6 border-y border-gray-100 text-gray-400">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <User size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-tighter text-gray-400 leading-none mb-1">
                Penulis
              </p>
              <p className="text-sm font-bold text-gray-800">
                {formData.author}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-tighter text-gray-400 leading-none mb-1">
                Tanggal
              </p>
              <p className="text-sm font-bold text-gray-800">{formData.date}</p>
            </div>
          </div>
        </div>
      </header>

      {/* FEATURED IMAGE */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="rounded-[1rem] border-1 overflow-hidden">
          <img
            src={formData.image}
            alt={formData.title}
            className="w-full h-auto object-cover aspect-video"
          />
        </div>
      </div>

      {/* ARTICLE BODY */}
      <article className="max-w-3xl mx-auto px-6 pb-32">
        <div className="prose prose-lg prose-indigo max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed font-medium mb-8">
            {/* Paragraf pembuka biasanya lebih besar */}
            {formData.content.substring(0, 150)}...
          </p>
          <div className="text-gray-700 leading-[1.8] space-y-6 whitespace-pre-line">
            {formData.content}
          </div>
        </div>
      </article>
    </section>
  );
}
