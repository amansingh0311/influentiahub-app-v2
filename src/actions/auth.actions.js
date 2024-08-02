import { NormalAxios } from "../config/axios.config";

export const verifyOtp = async (email, otp) => {
  try {
    const response = await NormalAxios.post("/api/verify-otp", { email, otp });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const signup = async (
  email,
  password,
  username,
  firstName,
  lastName
) => {
  try {
    const response = await NormalAxios.post("/api/signup", {
      email,
      password,
      username,
      firstName,
      lastName,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const login = async (email, password) => {
  try {
    const response = await NormalAxios.post("/api/login", { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const resetPassword = async (email, otp, password) => {
  try {
    const response = await NormalAxios.post("/api/reset-password", {
      email,
      otp,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await NormalAxios.post("/api/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await NormalAxios.post("/api/refresh-token", {
      headers: {
        "x-refresh-token": refreshToken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const logout = async () => {
  try {
    const response = await NormalAxios.post("/api/logout");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
