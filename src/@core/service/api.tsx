import axios from "axios";

export const BASE_URL = "https://api.themoviedb.org/3";

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWI1MDlkMWMxMGI2ZWIxYjM5NDg1YmViMWRhYTEwMiIsIm5iZiI6MS43NDczMTI2NTY4NTY5OTk5ZSs5LCJzdWIiOiI2ODI1ZTAxMDY0ZTk0MWRmNzM0YjU0ODciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hHalS4IUTh03PJhf2OSHDTd7V8GtQVVKsj90ALdfWb4`,
  },
});
