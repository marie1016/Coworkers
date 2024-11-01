import axios from "axios";
import Router from "next/router";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use((config) => {
  const reqConfig = { ...config };
  const accessToken = localStorage.getItem("accessToken");

  // 액세스 토큰이 있는 경우에만 Authorization 헤더 추가
  if (accessToken) {
    reqConfig.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    // 토큰이 없는 경우의 처리 (로그인 페이지로 리디렉션)
    router.push("/");
  }

  return reqConfig;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 요청이 실패했을 때
    // 401 에러 처리 (로그인 페이지로 리디렉션)
    if (error.response && error.response.status === 401) {
      router.push("/");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
