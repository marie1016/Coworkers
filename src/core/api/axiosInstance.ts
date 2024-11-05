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
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

          return await axiosInstance(originalRequest);
        }
      } catch (err) {
        console.error("리프레시 토큰 갱신 실패:", err);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
