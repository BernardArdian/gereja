import { X, Church, MapPin, Home, Users, Map, Save } from "lucide-react";
import { useRef } from "react";

export default function InputStasi({
  isOpen,
  formdata,
  handlers,
  validations,
  isSubmitting,
}) {
  const stasiRef = useRef(null);
  const totalumatRef = useRef(null);
  const gerejaRef = useRef(null);
  const desaRef = useRef(null);
  const alamatRef = useRef(null);

  const order = [stasiRef, totalumatRef, gerejaRef, desaRef, alamatRef];

  const handleEnter = (e, current) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const next = order[order.indexOf(current) + 1];
      if (next) next.current?.focus();
    }
  };
  const blockSpecialChars = (e) => {
    const allowed = /^[a-zA-Z0-9\s.,]$/;
    if (!allowed.test(e.key) && e.key.length === 1) {
      e.preventDefault();
    }
  };

  const blockSpecialCharsNumber = (e) => {
    const allowed = /^[0-9]$/;
    if (!allowed.test(e.key) && e.key.length === 1) {
      e.preventDefault();
    }
  };

  if (!isOpen) return false;
  return (
    <section className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <section className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 h-fit">
        {/* Header - Dibuat lebih tipis (py-4) */}
        <header className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2 ml-1">
            <Church size={18} className="text-amber-600" />
            <h2
              className="font-bold text-base text-gray-800"
              children="Input Stasi"
            />
          </div>
          <button
            type="button"
            onClick={handlers.cancel}
            className="cursor-pointer p-2 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all text-red-600"
            children={<X size={18} />}
          />
        </header>

        {/* Form Body - Padding dikecilkan ke p-6 */}
        <form className="p-6 space-y-4" onSubmit={handlers.submit}>
          {/* Nama Stasi & Jumlah Umat (Grid 2 Kolom) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Nama Stasi
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-amber-500 transition-colors">
                  <Home size={16} />
                </div>
                <input
                  ref={stasiRef}
                  name="stasi"
                  type="text"
                  placeholder="Nama Stasi"
                  pattern="[A-Za-z\s]*"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-50 transition-all text-sm font-medium"
                  onKeyDown={(i) => {
                    blockSpecialChars(i);
                    handleEnter(i, stasiRef);
                  }}
                  value={formdata.stasi}
                  onChange={handlers.input}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Umat
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-amber-500 transition-colors">
                  <Users size={16} />
                </div>
                <input
                  ref={totalumatRef}
                  name="totalumat"
                  type="number"
                  placeholder="0"
                  pattern="1234567890"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-50 transition-all text-sm font-medium"
                  onKeyDown={(i) => {
                    blockSpecialCharsNumber(i);
                    handleEnter(i, totalumatRef);
                  }}
                  value={formdata.totalumat}
                  onChange={handlers.input}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Nama Gereja
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-amber-500 transition-colors">
                  <Church size={16} />
                </div>
                <input
                  ref={gerejaRef}
                  name="gereja"
                  type="text"
                  placeholder="Nama Gereja"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-50 transition-all text-sm font-medium"
                  onKeyDown={(i) => {
                    blockSpecialChars(i);
                    handleEnter(i, gerejaRef);
                  }}
                  value={formdata.gereja}
                  onChange={handlers.input}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </section>

          {/* Alamat dan lokasi*/}
          <section className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Desa
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-amber-500 transition-colors">
                  <Map size={16} />
                </div>
                <input
                  ref={desaRef}
                  name="desa"
                  type="text"
                  placeholder="Desa ..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-50 transition-all text-sm font-medium"
                  onKeyDown={(i) => {
                    blockSpecialChars(i);
                    handleEnter(i, desaRef);
                  }}
                  value={formdata.desa}
                  onChange={handlers.input}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Alamat Lengkap
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-amber-500 transition-colors">
                  <MapPin size={16} />
                </div>
                <input
                  ref={alamatRef}
                  name="alamat"
                  type="text"
                  placeholder="Jl. Raya..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-50 transition-all text-sm font-medium"
                  onKeyDown={(i) => {
                    blockSpecialChars(i);
                    handleEnter(i, alamatRef);
                  }}
                  value={formdata.alamat}
                  onChange={handlers.input}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </section>

          {/* Submit Button - Lebih compact */}
          <div className="w-full flex items-center justify-end">
            <button
              className="cursor-pointer w-[15dvw] flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-500/20 hover:text-amber-600 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
              disabled={!validations() || isSubmitting}
            >
              <Save size={16} />
              Simpan
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}
