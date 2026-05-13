import { handleRequest } from "../helper";

import api from "../url";

export const umatServiceApi = {
  inputDataUmat: async (data) => {
    console.log("🔵 API CALL: POST /umat", data);
    const result = await handleRequest(api.post("/umat", data));
    console.log("🟢 API RESPONSE:", result);
    return result;
  },
  displayDataUmat: async (params) => {
    console.log("🔵 API CALL: GET /umat");
    const result = await handleRequest(api.get("/umat", { params }));
    console.log("🟢 API RESPONSE (displayDataUmat):", result);
    return result;
  },
  displayDataUmatById: (id) => handleRequest(api.get(`/umat/${id}`)),
  updateDataUmat: (id, data) => handleRequest(api.patch(`/umat/${id}`, data)),
  deleteDataUmat: (id) => handleRequest(api.delete(`/umat/${id}`)),
};

