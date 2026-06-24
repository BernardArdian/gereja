import { useRef, useState } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";

export default function Login() {
  const userName = useRef(null);
  const password = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("admin");

  const roles = [
    { id: "superadmin", label: "Super Admin" },
    { id: "admin", label: "Admin" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(
      "Login with:",
      userName.current.value,
      password.current.value,
      selectedRole,
    );
  };

  const handleUsernameKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      password.current.focus();
    }
  };

  return (
    <section className="flex items-center justify-center bg-yellow-400/50 h-screen overflow-hidden font-sans">
      <form className="w-full max-w-sm flex  flex-col h-[85vh] justify-center relative">
        <section className="flex-1 bg-gray-400/60 rounded-[1rem] flex flex-col justify-center">
          <div className=" backdrop-blur-md border border-white/40 p-8 rounded-[1rem] relative overflow-hidden">
            <div className="absolute -top-[30%] -left-[30%] w-64 h-64 rounded-full blur-3xl pointer-events-none" />
            {/* header login content */}
            <header className="mb-6 font-serif text-center relative z-10">
              <h1 className="text-1xl tracking-tight">Admin Paroki</h1>
              <h2 className="text-[12px] mt-1 uppercase tracking-[0.2em] font-semibold opacity-70">
                St.Fransiskus Assisi
              </h2>
              <p className="text-[11px] mt-1 uppercase tracking-[0.2em] font-semibold opacity-70">
                JL.Pattimura - Harapan Makmur - Distrik Kurik, Kab.Merauke,
                Papua Selatan
              </p>
            </header>
            {/* login form */}
            <form className="space-y-5 relative z-10" onSubmit={handleLogin}>
              <section className="relative border-b border-slate-900/20 focus-within:border-white transition-colors">
                <input
                  ref={userName}
                  type="text"
                  placeholder="Username"
                  onKeyDown={handleUsernameKeyDown}
                  className="w-full py-2.5 pl-5 bg-transparent outline-none text-slate-900 focus-within:bg-gray-300/40 focus:border-b focus:border-b-3 focus:border-green-500/50 placeholder-slate-800/60 text-sm font-medium"
                />
              </section>

              <section className="relative border-b border-slate-900/20 focus-within:border-white transition-colors">
                <input
                  ref={password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full py-2.5 pl-5 bg-transparent outline-none text-slate-900 focus-within:bg-gray-300/40 focus:border-b focus:border-b-3 focus:border-green-500/50 placeholder-slate-800/60 text-sm font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 pr-5 -translate-y-1/2 text-slate-800/60 hover:text-slate-900"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </section>

              <section className="relative pt-1">
                <label className="block text-[0.8em] font-bold text-slate-900 font-serif tracking-widest mb-1 ml-1">
                  Role
                </label>

                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className={`cursor-pointer w-full flex items-center justify-between px-4 py-2  backdrop-blur-sm border rounded-xl text-sm transition-all duration-200 ${
                    isOpen
                      ? "border-slate-900 ring-2 ring-slate-900/10"
                      : "shadow-sm"
                  }`}
                >
                  <span
                    className="text-slate-900 font-semibold text-xs capitalize"
                    children={roles.find((r) => r.id === selectedRole)?.label}
                  />
                  <ChevronDown size={14} className="text-slate-900" />
                </button>

                {isOpen && (
                  <div
                    className="absolute z-20 w-full mt-1 bg-slate-600/50 border border-[#7a5f1a] rounded-xl p-1.5 animate-in fade-in zoom-in duration-150"
                    children={roles.map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => {
                          setSelectedRole(role.id);
                          setIsOpen(false);
                        }}
                        className={`cursor-pointer w-full text-left px-3 py-2.5 text-xs rounded-lg transition-all duration-200 ${
                          selectedRole === role.id
                            ? "bg-[#a68224] text-white font-bold " // Warna emas yang sangat gelap untuk item aktif
                            : "text-slate-900 hover:bg-[#a68224]/50 hover:text-white font-medium" // Hover emas yang lebih terang sedikit
                        }`}
                      >
                        {role.label}
                      </button>
                    ))}
                  />
                )}
              </section>

              <form className="flex justify-end">
                <button
                  type="submit"
                  className="w-[12dvw] text-center cursor-pointer mt-4 bg-amber-800 hover:bg-amber-800/30 hover:text-black text-white text-xs
                   font-bold py-4 rounded-full transition-all duration-300 active:scale-95 "
                >
                  <p>Sign In</p>
                </button>
              </form>

              {/* Footer diletakkan di dasar container agar tidak terpotong */}
              <footer className="flex flex-col items-center justify-center text-center">
                <p className="flex flex-row items-center font-serif gap-1 text-[0.8em] text-center">
                  <p className="text-rose-700 text-[1.5em]">©</p>{" "}
                  {new Date().getFullYear()} Paroki St. Fransiskus Assisi
                </p>
                <p className="font-serif gap-1 text-[0.8em] text-center tracking-widest">
                  Harapan Makmur — All Rights Reserved
                </p>
              </footer>
            </form>
          </div>
        </section>
      </form>
    </section>
  );
}
