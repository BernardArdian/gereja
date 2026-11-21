import { Navigate } from "react-router-dom";
import Layout from "../menu/sidebar";

export default function ProtectedRoute({ token, onLogout, children }) {
  if (!token) return <Navigate to="/login" replace />;

  return <Layout onLogout={onLogout}>{children}</Layout>;
}
