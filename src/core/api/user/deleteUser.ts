import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

export default async function deleteUser() {
  const res: AxiosResponse<unknown> = await axiosInstance
    .delete("user")
    .catch((e: AxiosError) => Promise.reject(e.response));

  return res.data;
}
