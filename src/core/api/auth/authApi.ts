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
): Promise<AxiosResponse<SignupResponseDto>> => {
  return axiosInstance.post<SignupResponseDto>("auth/signup", data);
};

export const login = async (
  data: LoginRequestDto,
): Promise<AxiosResponse<LoginResponseDto>> => {
  return axiosInstance.post<LoginResponseDto>("auth/signIn", data);
};
