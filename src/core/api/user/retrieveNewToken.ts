import { RefreshTokenForm, RefreshTokenResponse } from "@/core/dtos/user/auth";
import { AxiosError, AxiosResponse } from "axios";
// eslint-disable-next-line import/no-cycle
import axiosInstance from "../axiosInstance";

export default async function retrieveNewToken(
  refreshTokenForm: RefreshTokenForm,
) {
  const res: AxiosResponse<RefreshTokenResponse> = await axiosInstance
    .post("auth/refresh-token", refreshTokenForm)
    .catch((e: AxiosError) => Promise.reject(e));

  return res.data;
}
