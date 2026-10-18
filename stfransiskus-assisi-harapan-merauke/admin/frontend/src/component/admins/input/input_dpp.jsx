import {
  X,
  User,
  Calendar,
  Briefcase,
  Save,
  Building2,
  Building,
} from "lucide-react";
import { useRef } from "react";
import Dropdown from "../../dropdown/dropdown";

export default function InputDpp({
  isOpen,
  formData,
  handlers,
  validations,
  selectedDivisi,
  isSubmitting,
}) {
  // const [selectedDivisi, setSelectedDivisi] = useState("")

  const namaRef = useRef(null);
  const divisiRef = useRef(null);
  const jabatanRef = useRef(null);
  const periodeRef = useRef(null);

  const order = [namaRef, divisiRef, jabatanRef, periodeRef];

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
    const allowed = /^[0-9-]$/;
    if (!allowed.test(e.key) && e.key.length === 1) {
      e.preventDefault();
    }
  };

  // const divisis = [
  //   { id: "dpph", label: "Dpph" },
  //   { id: "pleno", label: "Pleno" },
  // ];

  if (!isOpen) return false;
  return (
    <section className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <section className="w-full max-w-xl bg-white rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-200 h-fit">
        {/* Header - Dibuat lebih tipis (py-4) */}
        <header className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2 ml-1">
            <User size={18} className="text-green-600" />
            <h2 className="font-bold text-base text-gray-800">
              Input Anggota Dpp
            </h2>
          </div>
          <button
            type="button"
            onClick={handlers.cancel}
            className="cursor-pointer p-2 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all text-red-600"
            children={<X size={18} />}
          />
        </header>

        <form className="p-6 space-y-4" onSubmit={handlers.submit}>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <section className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Nama
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
                  <User size={16} />
                </div>

                <input
                  ref={namaRef}
                  name="nama"
                  type="text"
                  placeholder="Nama"
                  pattern="[A-Za-z\s]*"
                  className="w-full pl-10 pr-4 py-2.5
                   bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all text-sm font-medium"
                  onKeyDown={(i) => {
                    blockSpecialChars(i);
                    handleEnter(i, namaRef);
                  }}
                  value={formData.nama}
                  onChange={handlers.input}
                  disabled={isSubmitting}
                />
              </div>
            </section>
            <section className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Divisi
              </label>

              <section className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
                  <Building2 size={16} />
                </div>

                <Dropdown
                  value={selectedDivisi}
                  placeholder="- Divisi -"
                  ariaLabel="Divisi anggota DPP"
                  buttonRef={divisiRef}
                  onChange={(value) =>
                    handlers.divisi({ target: { name: "divisi", value } })
                  }
                  onTriggerKeyDown={(event, isOpen) => {
                    if (event.key === "Enter" && !isOpen) {
                      handleEnter(event, divisiRef);
                      return true;
                    }
                    return false;
                  }}
                  className="w-full pl-10 pr-4 text-sm font-semibold text-gray-600"
                  options={[
                    { value: "Dpph-Inti", label: "Dpph Inti" },
                    { value: "Pleno", label: "Pleno" },
                  ]}
                />
              </section>
            </section>
          </section>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <section className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Jabatan
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
                  <Briefcase size={16} />
                </div>
                <input
                  ref={jabatanRef}
                  name="jabatan"
                  type="text"
                  placeholder="Jabatan"
                  pattern="[A-Za-z\s]*"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all text-sm font-medium"
                  onKeyDown={(i) => {
                    blockSpecialChars(i);
                    handleEnter(i, jabatanRef);
                  }}
                  value={formData.jabatan}
                  onChange={handlers.input}
                  disabled={isSubmitting}
                />
              </div>
            </section>
            <section className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Periode
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-500 transition-colors">
                  <Calendar size={16} />
                </div>
                <input
                  ref={periodeRef}
                  name="periode"
                  type="text"
                  placeholder="Periode"
                  pattern="\d{4}\s*-\s*\d{4}"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all text-sm font-medium"
                  onKeyDown={(i) => {
                    blockSpecialCharsNumber(i);
                  }}
                  value={formData.periode}
                  onChange={handlers.input}
                  disabled={isSubmitting}
                />
              </div>
            </section>
          </section>

          <div className="w-full flex items-center justify-end gap-4">
            <button
              className="min-w-24 cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
              type="button"
              disabled={isSubmitting}
              onClick={handlers.cancel}
            >
              Batal
            </button>

            <button
              className="min-w-24 cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
              type="submit"
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
