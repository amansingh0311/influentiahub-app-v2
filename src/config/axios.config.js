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

const refreshAccessToken = async () => {
  try {
    const refreshTokenFromLocal = localStorage.getItem("refreshToken");
    const response = await NormalAxios.post(
      `${import.meta.env.VITE_NODE_API_BASE_URL}/refresh-token`,
      {
        headers: {
          "x-refresh-token": refreshTokenFromLocal,
        },
      }
    );
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    return accessToken;
  } catch (error) {
    console.error("Failed to refresh access token", error);
    throw error;
  }
};

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.response.data.error === "TokenExpiredError"
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return Axios(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { Axios, NormalAxios };
