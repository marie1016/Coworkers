import { LoginForm, LoginResponse } from "@/core/dtos/user/auth";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

export default async function signIn(loginForm: LoginForm) {
  const res: AxiosResponse<LoginResponse> = await axiosInstance
    .post("auth/signIn", loginForm)
    .catch((e: AxiosError) => Promise.reject(e.response));

  return res.data;
}
