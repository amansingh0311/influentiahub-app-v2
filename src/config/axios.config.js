import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_NODE_API_BASE_URL,
});

const NormalAxios = axios.create({
  baseURL: import.meta.env.VITE_NODE_API_BASE_URL,
});

Axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export { Axios, NormalAxios };
