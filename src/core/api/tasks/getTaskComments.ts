import { TaskComment } from "@/core/dtos/tasks/tasks";
import { AxiosResponse, AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

export default async function getTaskComments(id: number) {
  const res: AxiosResponse<TaskComment[], AxiosError> = await axiosInstance
    .get(`/tasks/${id}/comments`)
    .catch((e: AxiosError) => Promise.reject(e));
  return res.data;
}
