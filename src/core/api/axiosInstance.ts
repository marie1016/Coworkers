import { removeTokens, TOKENS } from "@/lib/utils/tokenStorage";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import retrieveNewToken from "./user/retrieveNewToken";
import { RefreshTokenResponse } from "../dtos/user/auth";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const reqConfig = config;
  const accessToken = localStorage.getItem(TOKENS.ACCESS_TOKEN);
  reqConfig.headers.Authorization = `bearer ${accessToken}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest: AxiosRequestConfig = error.config ?? {};
    const refreshToken = localStorage.getItem(TOKENS.REFRESH_TOKEN);
    if (error.response?.status === 401 && !!refreshToken) {
      let res: RefreshTokenResponse;
      try {
        res = await retrieveNewToken({ refreshToken });
      } catch (refreshError) {
        console.error(refreshError);
        removeTokens();
        return Promise.reject(error);
      }
      localStorage.setItem(TOKENS.ACCESS_TOKEN, res.accessToken);
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
