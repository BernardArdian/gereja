import axios from "axios";
import {
  resetFrontendLoginLimit,
  secureFrontendRequest,
} from "../security/requestSecurity";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config) => {
  secureFrontendRequest(config);
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use((response) => {
  resetFrontendLoginLimit(response.config);
  return response;
});

export default api;
