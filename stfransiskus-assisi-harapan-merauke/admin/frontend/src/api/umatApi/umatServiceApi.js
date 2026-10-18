import { handleRequest } from "../helper";

import api from "../url";

export const umatServiceApi = {
  inputDataUmat: (data) =>
    handleRequest(api.post("/inputmember/inputmember", data)),
  displayDataUmat: (params) =>
    handleRequest(api.get("/inputmember/displaymember", { params })),
  displayDataUmatById: (id) =>
    handleRequest(api.get(`/inputmember/${id}`)),
  updateDataUmat: (id, data) =>
    handleRequest(api.put(`/inputmember/${id}`, data)),
  deleteDataUmat: (id) =>
    handleRequest(api.delete(`/inputmember/${id}`)),
};
