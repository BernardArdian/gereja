import { handleRequest } from "../helper";

import api from "../url";

// Kumpulan operasi API untuk CRUD anggota Dewan Pastoral Paroki.
export const dppServiceApi = {
  inputDataAnggotaDpp: (data) => handleRequest(api.post("/anggota-dpp", data)),
  displayAnggotaDpp: (params) =>
    handleRequest(
      api.get("/anggota-dpp/list-dpp", {
        params,
      }),
    ),
  displatAnggotaById: (id) =>
    handleRequest(api.get(`/anggota-dpp/list-dpp/${id}`)),
  updateDataAnggotaDpp: (id, data) =>
    handleRequest(api.put(`anggota-dpp/${id}`, data)),
  deleteDataAnggotaDpp: (id) => handleRequest(api.delete(`anggota-dpp/${id}`)),
};
