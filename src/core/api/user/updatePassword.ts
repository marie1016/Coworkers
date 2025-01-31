import {
  UpdatePasswordForm,
  UpdatePasswordResponse,
} from "@/core/dtos/user/auth";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

export default async function updatePassword(
  updatePasswordForm: UpdatePasswordForm,
) {
  const res: AxiosResponse<UpdatePasswordResponse> = await axiosInstance
    .patch("user/password", updatePasswordForm)
    .catch((e: AxiosError) => Promise.reject(e.response));

  return res.data;
}
