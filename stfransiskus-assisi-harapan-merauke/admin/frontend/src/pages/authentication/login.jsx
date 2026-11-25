import { useCallback, useEffect, useRef, useState } from "react";
import {
  Eye,
  EyeOff,
  ChevronDown,
  User,
  Lock,
  X,
  AlertCircle,
} from "lucide-react";
import { handleRequest } from "../../api/helper";
import api from "../../api/url";
import StFransis from "../../assets/image/st.fransiskus_assisi.png";

const ROLES = [
  { id: "superadmin", label: "Super Admin" },
  { id: "admin", label: "Admin" },
];

const FIELD_BASE =
  "group flex items-center gap-3 rounded-xl border bg-white px-4 transition-colors focus-within:ring-4";
const FIELD_OK =
  "border-stone-300 focus-within:border-amber-700 focus-within:ring-amber-700/15";
const FIELD_ERROR =
  "border-rose-400 focus-within:border-rose-500 focus-within:ring-rose-500/15";

const INPUT_CLASS =
  "w-full min-w-0 bg-transparent py-3 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-500";

/* ============================ SNACKBAR ============================ */

// Durasi default snackbar sebelum hilang otomatis (ms).
const SNACKBAR_DURATION = 5000;

// Hook: mengatur kapan snackbar muncul dan hilang (state + timer auto-hide).
// Pakai: const snackbar = useSnackbar(); snackbar.show("pesan"); snackbar.hide();
function useSnackbar(duration = SNACKBAR_DURATION) {
  const [state, setState] = useState({ message: "", key: 0 });

  // key naik setiap show() agar timer dan progress bar mulai ulang walau pesannya sama.
  const show = useCallback(
    (message) => setState((prev) => ({ message, key: prev.key + 1 })),
    [],
  );
  const hide = useCallback(
    () => setState((prev) => (prev.message ? { ...prev, message: "" } : prev)),
    [],
  );

  useEffect(() => {
    if (!state.message) return;
    const timer = setTimeout(hide, duration);
    return () => clearTimeout(timer);
  }, [state.message, state.key, duration, hide]);

  return { message: state.message, key: state.key, duration, show, hide };
}

// Tampilan snackbar: ikon, judul, pesan, tombol tutup, dan progress bar hitung mundur.
function Snackbar({ message, onClose, duration }) {
  const [started, setStarted] = useState(false);

  // Mulai transisi progress bar setelah mount agar animasinya berjalan.
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 20);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center p-4">
      <div
        role="alert"
        className="pointer-events-auto relative w-full max-w-72 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-2xl shadow-stone-900/25 ring-1 ring-rose-500/10 animate-in fade-in zoom-in duration-200"
      >
        <div className="flex items-start gap-3 p-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <AlertCircle size={20} aria-hidden="true" />
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold leading-tight text-stone-900">
              Login Gagal
            </p>
            <p
              id="login-error"
              className="mt-1 text-xs font-medium leading-snug text-stone-600"
              children={message}
            />
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pesan error"
            className="-mr-1 -mt-1 flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700"
          >
            <X size={14} />
          </button>
        </div>

        {/* progress bar hitung mundur */}
        <div className="h-1 w-full bg-rose-100">
          <div
            className="h-full bg-rose-500"
            style={{
              width: started ? "0%" : "100%",
              transition: `width ${duration}ms linear`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ============================== FIELD ============================== */

// Field input dengan ikon di kiri, slot opsional di kanan, dan pesan error di bawahnya.
function Field({
  icon: Icon,
  inputRef,
  trailing,
  describedBy,
  invalid,
  error,
  errorId,
  ...inputProps
}) {
  return (
    <div className="relative">
      <div className={`${FIELD_BASE} ${error ? FIELD_ERROR : FIELD_OK}`}>
        <Icon
          size={16}
          aria-hidden="true"
          className="shrink-0 text-stone-500 transition-colors group-focus-within:text-amber-800"
        />
        <input
          ref={inputRef}
          aria-describedby={error ? errorId : describedBy}
          aria-invalid={invalid || !!error || undefined}
          className={INPUT_CLASS}
          {...inputProps}
        />
        {trailing}
      </div>
      {/* absolute: berada di jarak antar field, tidak menambah tinggi kartu */}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="absolute left-1 top-full mt-0.5 text-[11px] font-medium leading-3 text-rose-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* ============================== LOGIN ============================== */

// Form login lokal dengan pilihan role dan kontrol visibilitas password.
export default function Login({ onLogin }) {
  const userName = useRef(null);
  const password = useRef(null);
  const roleRef = useRef(null);

  const snackbar = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("admin");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    adminname: "",
    password: "",
  });

  const errorId = snackbar.message ? "login-error" : undefined;

  // Tutup dropdown role saat klik di luar area dropdown.
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (roleRef.current && !roleRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Hapus pesan error field saat user mulai mengetik lagi.
  const clearFieldError = (name) => {
    setFieldErrors((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const adminname = userName.current?.value.trim();
    const passwordValue = password.current?.value || "";

    const nextErrors = {
      adminname: adminname ? "" : "Username wajib diisi.",
      password: passwordValue ? "" : "Password wajib diisi.",
    };
    setFieldErrors(nextErrors);

    if (nextErrors.adminname) {
      snackbar.hide();
      userName.current?.focus();
      return;
    }
    if (nextErrors.password) {
      snackbar.hide();
      password.current?.focus();
      return;
    }

    setIsSubmitting(true);
    snackbar.hide();
    const [result, requestError] = await handleRequest(
      api.post("/admin/login", {
        adminname,
        password: passwordValue,
        role: selectedRole,
      }),
    );
    setIsSubmitting(false);

    if (requestError || !result?.token || !result?.admin) {
      // Network Error bukan salah kredensial, jadi dibedakan agar tidak menyesatkan.
      const isNetworkError =
        typeof requestError === "string" && /network/i.test(requestError);
      snackbar.show(
        isNetworkError
          ? "Tidak dapat terhubung ke server."
          : "Username atau password salah.",
      );
      if (password.current) {
        password.current.value = "";
        password.current.focus();
      }
      return;
    }

    onLogin?.(result);
  };

  const handleUsernameKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      password.current?.focus();
    }
  };

  const handlePasswordKey = (e) => {
    setCapsLock(e.getModifierState?.("CapsLock") ?? false);
  };

  return (
    <main className="flex h-dvh flex-col items-center justify-center gap-4 overflow-hidden bg-linear-to-br from-amber-50 via-yellow-100 to-amber-200 px-4 py-6 font-sans">
      {/* kartu tanpa overflow-hidden agar dropdown tidak terpotong */}
      <section className="relative grid w-full max-w-sm rounded-xl border border-white/60 bg-white/80 shadow-xl shadow-amber-900/20 md:max-w-2xl md:grid-cols-[18rem_1fr]">
        {/* snackbar: melayang tepat di tengah kartu, tidak memengaruhi tinggi kartu */}
        {snackbar.message && (
          <Snackbar
            key={snackbar.key}
            message={snackbar.message}
            duration={snackbar.duration}
            onClose={snackbar.hide}
          />
        )}

        {/* panel gambar (desktop saja), sudut membulat dipasang di sini */}
        <aside className="relative hidden overflow-hidden rounded-l-xl md:block">
          <img
            src={StFransis}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            alt="Santo Fransiskus Assisi"
          />
          <div className="absolute inset-0 bg-linear-to-t from-amber-950/95 via-amber-950/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 font-serif text-white">
            <p className="text-base font-semibold leading-snug tracking-tight">
              Paroki St. Fransiskus Assisi
            </p>
            <p className="mt-2 border-t border-white/30 pt-2 text-[9px] font-medium uppercase leading-relaxed tracking-[0.12em] text-white/85">
              Jl. Pattimura - Harapan Makmur - Distrik Kurik, Kab. Merauke,
              Papua Selatan
            </p>
          </div>
        </aside>

        {/* panel form */}
        <section className="flex min-w-0 flex-col justify-center p-6 sm:p-8">
          <header className="mb-6 font-serif">
            <h1 className="text-xl font-semibold tracking-tight text-stone-900">
              Admin Paroki
            </h1>
            <h2 className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-700">
              St. Fransiskus Assisi
            </h2>
            {/* alamat hanya di mobile, desktop sudah ada di panel gambar */}
            <p className="mt-2 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.15em] text-stone-600 md:hidden">
              Jl. Pattimura - Harapan Makmur - Distrik Kurik, Kab. Merauke,
              Papua Selatan
            </p>
          </header>

          <form className="space-y-4" onSubmit={handleLogin} noValidate>
            <Field
              icon={User}
              inputRef={userName}
              type="text"
              name="adminname"
              autoComplete="username"
              placeholder="Username"
              aria-label="Username"
              onKeyDown={handleUsernameKeyDown}
              onChange={() => clearFieldError("adminname")}
              describedBy={errorId}
              invalid={!!snackbar.message}
              error={fieldErrors.adminname}
              errorId="error-adminname"
            />

            <div>
              <Field
                icon={Lock}
                inputRef={password}
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                aria-label="Password"
                onKeyDown={handlePasswordKey}
                onKeyUp={handlePasswordKey}
                onChange={() => clearFieldError("password")}
                onBlur={() => setCapsLock(false)}
                describedBy={errorId}
                invalid={!!snackbar.message}
                error={fieldErrors.password}
                errorId="error-password"
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                    className="shrink-0 cursor-pointer text-stone-500 transition-colors hover:text-stone-900"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />
              {capsLock && !fieldErrors.password && (
                <p className="mt-1.5 ml-1 text-xs font-medium text-amber-800">
                  Caps Lock aktif.
                </p>
              )}
            </div>

            {/* role: desain dropdown sesuai UI semula, terbuka ke bawah */}
            <section ref={roleRef} className="relative pt-1">
              <label className="block text-[0.8em]  text-slate-900 font-medium tracking-widest mb-1 ml-1">
                Role
              </label>

              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((v) => !v)}
                className={`cursor-pointer w-full flex items-center justify-between px-4 py-2  backdrop-blur-sm border rounded-xl text-sm transition-all duration-200 ${
                  isOpen
                    ? "border-slate-900 ring-2 ring-slate-900/10"
                    : "shadow-sm"
                }`}
              >
                <span
                  className="text-slate-900 font-semibold text-xs capitalize"
                  children={ROLES.find((r) => r.id === selectedRole)?.label}
                />
                <ChevronDown size={14} className="text-slate-900" />
              </button>

              {isOpen && (
                <div
                  className="absolute top-full z-30 w-full mt-1 bg-slate-800 border border-[#7a5f1a] rounded-xl p-1.5 shadow-xl animate-in fade-in zoom-in duration-150"
                  children={ROLES.map((role) => (
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
                          : "text-white hover:bg-[#a68224]/70 font-medium" // Hover emas yang lebih terang sedikit
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                />
              )}
            </section>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-25 cursor-pointer rounded-xl bg-amber-800 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-900/20 transition-all duration-200 hover:bg-amber-900 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Memproses..." : "Sign In"}
              </button>
            </div>
          </form>
        </section>
      </section>

      <footer className="text-center font-serif text-xs text-stone-700">
        <p>
          <span className="text-base text-rose-700">©</span>{" "}
          {new Date().getFullYear()} Paroki St. Fransiskus Assisi
        </p>
        <p className="mt-1 tracking-widest">
          Harapan Makmur — All Rights Reserved
        </p>
      </footer>
    </main>
  );
}
