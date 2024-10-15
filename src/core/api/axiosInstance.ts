import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const reqConfig = config;
  const accessToken = localStorage.getItem("accessToken");
  reqConfig.headers.Authorization = `bearer ${accessToken}`;

  return config;
});

export default axiosInstance;
