
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  retryAttempted?: boolean;
}


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("Access Token:", accessToken);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ accessToken: string }>) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.retryAttempted
    ) {
      originalRequest.retryAttempted = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const teamId = localStorage.getItem("teamId");

        if (refreshToken && teamId) {
          const response = await axiosInstance.post<{ accessToken: string }>(
            `/${teamId}/auth/refresh-token`,
            {
              refreshToken,
            },
          );

          const newAccessToken = response.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return await axiosInstance(originalRequest);
        }
      } catch (err) {
        console.error("리프레시 토큰 갱신 실패:", err);
      }
    }

    return Promise.reject(error);
  },
);

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
