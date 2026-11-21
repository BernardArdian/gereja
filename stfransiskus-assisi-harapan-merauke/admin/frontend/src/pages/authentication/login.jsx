import { useRef, useState } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { handleRequest } from "../../api/helper";
import api from "../../api/url";
import StFransis from "../../assets/image/st.fransiskus_assisi.png";

// Form login lokal dengan pilihan role dan kontrol visibilitas password.
export default function Login({ onLogin }) {
  const userName = useRef(null);
  const password = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("admin");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const roles = [
    { id: "superadmin", label: "Super Admin" },
    { id: "admin", label: "Admin" },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const adminname = userName.current?.value.trim();
    const passwordValue = password.current?.value || "";
    if (!adminname || !passwordValue) {
      setErrorMessage("Username dan password wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    const [result, requestError] = await handleRequest(
      api.post("/admin/login", {
        adminname,
        password: passwordValue,
        role: selectedRole,
      }),
    );
    setIsSubmitting(false);

    if (requestError || !result?.token || !result?.admin) {
      setErrorMessage(
        typeof requestError === "string"
          ? requestError
          : "Login gagal. Periksa kredensial dan coba lagi.",
      );
      return;
    }

    onLogin?.(result);
  };

  const handleUsernameKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      password.current.focus();
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen overflow-hidden font-sans bg-linear-to-br from-yellow-300/30 via-yellow-400/60 to-yellow-400/30 ">
      <section className="flex item-center justify-center overflow-hidden rounded-xl border border-yellow-500">
        <img
          src={StFransis}
          className="mx-auto object-cover sm:mx-0 sm:h-100.5 sm:w-56"
          alt="Santo Fransiskus Assisi"
        />

        <section className="flex-1 h-[85vh] bg-gray-400/60  w-full max-w-sm flex flex-col justify-center items-center ">
          <div className=" backdrop-blur-md border border-white/40 p-8">
            <div className="absolute top-[-30%] left-[-30%] h-64 rounded-full blur-3xl pointer-events-none" />
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
                  name="adminname"
                  autoComplete="username"
                  required
                  placeholder="Username"
                  onKeyDown={handleUsernameKeyDown}
                  className="w-full py-2.5 pl-5 bg-transparent outline-none text-slate-900 focus-within:bg-gray-300/40  focus:border-b-3 focus:border-green-500/50 placeholder-slate-800/60 text-sm font-medium"
                />
              </section>

              <section className="relative border-b border-slate-900/20 focus-within:border-white transition-colors">
                <input
                  ref={password}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                  className="w-full py-2.5 pl-5 bg-transparent outline-none text-slate-900 focus-within:bg-gray-300/40 focus:border-b-3 focus:border-green-500/50 placeholder-slate-800/60 text-sm font-medium"
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
                <label className="block text-[0.8em]  text-slate-900 font-medium tracking-widest mb-1 ml-1">
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

              {errorMessage && (
                <p role="alert" className="text-sm text-rose-700">
                  {errorMessage}
                </p>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-[12dvw] text-center cursor-pointer mt-4 bg-amber-800 hover:bg-amber-800/30 hover:text-black text-white text-xs
                   font-bold py-4 rounded-full transition-all duration-300 active:scale-95 "
                >
                  <p>{isSubmitting ? "Memproses..." : "Sign In"}</p>
                </button>
              </div>
            </form>
          </div>
        </section>
      </section>
      <footer className="flex flex-col items-center justify-center text-center">
        <p className="flex flex-row items-center font-serif gap-1 text-[0.8em] text-center">
          <p className="text-rose-700 text-[1.5em]">©</p>{" "}
          {new Date().getFullYear()} Paroki St. Fransiskus Assisi
        </p>
        <p className="font-serif gap-1 text-[0.8em] text-center tracking-widest">
          Harapan Makmur — All Rights Reserved
        </p>
      </footer>
    </section>
  );
}
