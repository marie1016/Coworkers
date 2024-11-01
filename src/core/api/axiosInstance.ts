import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 반드시 올바른 API URL이어야 합니다.
});

axiosInstance.interceptors.request.use((config) => {
  const reqConfig = { ...config };

  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    reqConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  return reqConfig;
});

export default axiosInstance;
