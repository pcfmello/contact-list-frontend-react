import axios from "axios";
import { getToken } from "./Auth";

const api = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 3000
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  resp => resp,
  error => {
    if (error.response && error.response.data.errorMessage) {
      error.message = error.response.data.errorMessage;
    }
    return Promise.reject(error);
  }
);

export default api;
