import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

export default async function deleteTaskComment(commentId: number) {
  const res = await axiosInstance
    .delete(`/tasks/{taskId}/comments/${commentId}`)
    .catch((e: AxiosError) => Promise.reject(e));
  return res;
}
