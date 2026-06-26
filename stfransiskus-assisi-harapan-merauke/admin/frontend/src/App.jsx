import {
  Routes,
  Route,
  //useLocation,
  Navigate,
  //useNavigate,
} from "react-router-dom";
import Layout from "./component/menu/sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import Umat from "./pages/umat/umat";
import Berita from "./pages/berita/berita";
import Admin from "./pages/admin/admin";
import Katekese from "./pages/katekese/katekese";
import AdministraifGereja from "./pages/administratif_gereja/administratifGereja";
import Login from "./pages/authentication/login";
//import { useEffect, useState } from "react";

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
      }
    />
  );
}
export default App;
