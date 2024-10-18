import { TaskComment } from "@/core/dtos/tasks/tasks";
import axiosInstance from "../axiosInstance";

export default async function getTaskComments(id: number) {
  const res = await axiosInstance.get<TaskComment[]>(`/tasks/${id}/comments`);
  return res.data;
}
