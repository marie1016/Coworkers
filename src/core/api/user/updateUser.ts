import { UpdateUserForm, UpdateUserResponse } from "@/core/dtos/user/auth";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

export default async function updateUser(updateUserForm: UpdateUserForm) {
  const res: AxiosResponse<UpdateUserResponse> = await axiosInstance
    .patch("user", updateUserForm)
    .catch((e: AxiosError) => Promise.reject(e.response));

  return res.data;
}
