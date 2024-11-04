import { AxiosError, AxiosResponse } from "axios";
import { User } from "@/core/dtos/user/auth";
import axiosInstance from "../axiosInstance";

export default async function getUser() {
  const res: AxiosResponse<User> = await axiosInstance
    .get("user")
    .catch((e: AxiosError) => Promise.reject(e.response));

  return res.data;
}
