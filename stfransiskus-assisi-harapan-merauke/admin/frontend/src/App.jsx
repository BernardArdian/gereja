import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./component/auth/ProtectedRoute";

// Muat halaman besar secara terpisah agar bundle awal panel admin lebih ringan.
const Login = lazy(() => import("./pages/authentication/login"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Umat = lazy(() => import("./pages/umat/umat"));
const Berita = lazy(() => import("./pages/berita/berita"));
const Admin = lazy(() => import("./pages/admin/admin"));
const Katekese = lazy(() => import("./pages/katekese/katekese"));
const AdministraifGereja = lazy(
  () => import("./pages/administratif_gereja/administratifGereja"),
);

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const handleLogin = (result) => {
    localStorage.setItem("token", result.token);
    localStorage.setItem("role", result.admin.role);
    setToken(result.token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
  };

  useEffect(() => {
    const handleExpiredSession = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setToken(null);
    };
    window.addEventListener("admin:session-expired", handleExpiredSession);
    return () =>
      window.removeEventListener("admin:session-expired", handleExpiredSession);
  }, []);

  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-64 items-center justify-center p-6 text-sm text-slate-600"
          role="status"
          aria-live="polite"
        >
          Memuat halaman…
        </div>
      }
    >
      <Routes>
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute token={token} onLogout={handleLogout}>
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                {/* Parameter tab opsional memilih sub-tampilan halaman. */}
                <Route path="/dashboard/:tab?" element={<Dashboard />} />
                <Route path="/umat/:tab?" element={<Umat />} />
                <Route path="/berita" element={<Berita />} />
                <Route path="/katekese/:tab?" element={<Katekese />} />
                <Route path="/administratif" element={<AdministraifGereja />} />
                <Route path="/admin" element={<Admin />} />
                <Route
                  path="*"
                  element={<Navigate to="/dashboard" replace />}
                />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}
export default App;
