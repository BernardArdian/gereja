import { lazy, Suspense } from "react";
import {
  Routes,
  Route,
  //useLocation,
  Navigate,
  //useNavigate,
} from "react-router-dom";
import Layout from "./component/menu/sidebar";
//import { useEffect, useState } from "react";

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Umat = lazy(() => import("./pages/umat/umat"));
const Berita = lazy(() => import("./pages/berita/berita"));
const Admin = lazy(() => import("./pages/admin/admin"));
const Katekese = lazy(() => import("./pages/katekese/katekese"));
const AdministraifGereja = lazy(
  () => import("./pages/administratif_gereja/administratifGereja"),
);

function App() {
  // const location = useLocation();
  // const navigate = useNavigate();

  // const [token, setToken] = useState(localStorage.getItem("token"));
  // const [role, setRole] = useState(localStorage.getItem("role"));

  // const isAdminPage = location.pathname === "/";

  // useEffect(() => {
  //   const savedToken = localStorage.getItem("token");
  //   const savedRole = localStorage.getItem("role");

  //   if (savedToken) {
  //     setToken(savedToken);
  //   }

  //   if (savedRole) {
  //     setRole(savedRole);
  //   }
  // }, []);

  // const handleLogout = () => {
  //   localStorage.clear();

  //   setToken(null);
  //   setRole(null);
  //   navigate("/", { replace: true });
  // };

  // const handleLoginSuccess = () => {
  //   setToken(localStorage.getItem("token"));
  //   setRole(localStorage.getItem("role"));
  // };

  // if (!token) {
  //   return <Navigate to="/" replace />;
  // }

  return (
    <Layout
      children={
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
            {/* <Route path="*" element={token ? <Navigate to="/" replace /> : <Login />} /> */}

            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="/dashboard/:tab?" element={<Dashboard />} />
            <Route path="/umat/:tab?" element={<Umat />} />
            <Route path="/berita" element={<Berita />} />
            <Route path="/katekese/:tab?" element={<Katekese />} />

            <Route path="/administratif" element={<AdministraifGereja />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
      }
    />
  );
}
export default App;
