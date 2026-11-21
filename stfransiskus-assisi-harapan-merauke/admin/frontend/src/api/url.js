import axios from "axios";
import {
  releaseFrontendRequest,
  resetFrontendLoginLimit,
  secureFrontendRequest,
} from "../security/requestSecurity";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Periksa input dan sisipkan token sesi pada setiap request yang memiliki token.
api.interceptors.request.use((config) => {
  secureFrontendRequest(config);
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    releaseFrontendRequest(response.config);
    // Login berhasil menghapus pembatas percobaan di sisi frontend.
    resetFrontendLoginLimit(response.config);
    return response;
  },
  (error) => {
    releaseFrontendRequest(error.config);
    if ([401, 403].includes(error.response?.status)) {
      window.dispatchEvent(new Event("admin:session-expired"));
    }
    return Promise.reject(error);
  },
);

export default api;
