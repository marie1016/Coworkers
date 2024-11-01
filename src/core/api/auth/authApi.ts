import { AxiosResponse } from "axios";
import {
  LoginResponseDto,
  LoginRequestDto,
  SignupRequestDto,
  SignupResponseDto,
} from "@/core/dtos/auth/authDto";
import axiosInstance from "../axiosInstance";

export const signup = async (
  data: SignupRequestDto,
): Promise<AxiosResponse<SignupResponseDto>> =>
  axiosInstance.post<SignupResponseDto>("auth/signup", data);

export const login = async (
  data: LoginRequestDto,
): Promise<AxiosResponse<LoginResponseDto>> =>
  axiosInstance.post<LoginResponseDto>("auth/signIn", data);

export const OauthLogin = async (
  provider: "google" | "kakao",
  token: string,
): Promise<AxiosResponse<SignupResponseDto>> => {
  return axiosInstance.post<SignupResponseDto>(`auth/signIn/${provider}`, {
    state: "someStateValue", // 필요한 경우 실제 state 값을 설정
    redirectUrl: "http://localhost:3000/api/auth/callback/kakao", // Redirect URL 확인
    token,
  });
};
