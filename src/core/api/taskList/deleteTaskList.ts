import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

export default async function deleteTaskList(
  teamId: string,
  taskListId: string,
) {
  const res = await axiosInstance
    .delete(`groups/${teamId}/task-lists/${taskListId}`)
    .catch((e: AxiosError) => Promise.reject(e));

  return res;
}
