import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

export default async function deleteTask(taskId: number) {
  const res = await axiosInstance
    .delete(`/groups/{groupId}/task-lists/{taskListId}/tasks/${taskId}`)
    .catch((e: AxiosError) => Promise.reject(e));
  return res;
}
