import { History } from "@/core/dtos/tasks/tasks";
import { AxiosResponse, AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

export default async function getHistory() {
  const res: AxiosResponse<History, AxiosError> = await axiosInstance
    .get(`/user/history`)
    .catch((e: AxiosError) => Promise.reject(e));
  return res.data;
}
