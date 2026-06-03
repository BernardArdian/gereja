import { ImageIcon } from "lucide-react";

export default function PernikahanSection(
  data,
  handlers,
  previews,
  isSubmitting,
) {
  <section className="space-y-4 p-5 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
    <h4 className="font-bold text-indigo-900 flex items-center gap-2 border-b border-indigo-100 pb-2">
      Data Pernikahan
    </h4>
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {["Pria", "Wanita"].map((type) => {
        const lowerType = type.toLowerCase();
        return (
          <section
            key={type}
            className="bg-white p-3 rounded-xl border border-indigo-100"
          >
            <label className="block text-xs font-bold text-indigo-400 uppercase mb-2">
              Mempelai {type}
            </label>
            <input
              type="text"
              name={`nama${type}`}
              placeholder="Nama lengkap"
              value={data[`nama${type}`]}
              onChange={handlers.pernikahan}
              className="w-full border-b border-gray-200 py-2 mb-3 outline-none focus:border-indigo-500 text-sm"
              disabled={isSubmitting}
            />
            <div className="relative h-32 w-full bg-gray-50 rounded-lg overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center group">
              {previews[lowerType] ? (
                <img
                  src={previews[lowerType]}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-400 group-hover:text-indigo-500 transition-colors">
                  <ImageIcon size={24} className="mx-auto mb-1" />
                  <span className="text-[10px] font-bold">UPLOAD FOTO</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlers.foto(e, lowerType)}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={isSubmitting}
              />
            </div>
          </section>
        );
      })}
    </form>
  </section>;
}
