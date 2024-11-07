import { AxiosResponse } from "axios";
import {
  LoginResponseDto,
  LoginRequestDto,
  SignupRequestDto,
  SignupResponseDto,
  ResetPasswordEmailRequestDto,
  ResetPasswordRequestDto,
  PasswordRequestDto,
} from "@/core/dtos/auth/authDto";
import axiosInstance from "../axiosInstance";

export const signup = async (
  data: SignupRequestDto,
): Promise<AxiosResponse<SignupResponseDto>> =>
  axiosInstance.post<SignupResponseDto>("auth/signUp", data);

export const login = async (
  data: LoginRequestDto,
): Promise<AxiosResponse<LoginResponseDto>> =>
  axiosInstance.post<LoginResponseDto>("auth/signIn", data);

export const sendResetPasswordEmail = async (
  data: ResetPasswordEmailRequestDto,
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosInstance.post<{ message: string }>(
      "user/send-reset-password-email",
      data,
    );
    return { success: true, message: response.data.message };
  } catch (error) {
    // if (axios.isAxiosError(error) && error.response) {
    //   console.log("서버 오류 응답:", error.response);
    //   if (error.response.status === 400) {
    //     return {
    //       success: false,
    //       message: "가입되지 않은 이메일입니다.",
    //     };
    //   }
    //   return {
    //     success: false,
    //     message: error.response.data.message || "오류가 발생했습니다.",
    //   };
    // }
    return {
      success: false,
      message: "비밀번호 재설정 이메일 전송 요청 중 오류가 발생했습니다.",
    };
  }
};

export const resetPasswordWithToken = async (
  data: ResetPasswordRequestDto,
): Promise<AxiosResponse<{ message: string }>> =>
  axiosInstance.patch<{ message: string }>("user/reset-password", data);

export const changePassword = async (
  data: PasswordRequestDto,
): Promise<AxiosResponse<{ message: string }>> =>
  axiosInstance.patch<{ message: string }>("user/password", data);
