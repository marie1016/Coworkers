import { Task } from "@/core/dtos/tasks/tasks";
import { AxiosResponse, AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

interface GetTaskRecurringParams {
  taskId: number | null;
}

export default async function getTaskRecurring({
  taskId,
}: GetTaskRecurringParams) {
  const res: AxiosResponse<Task, AxiosError> = await axiosInstance
    .get(`/groups/{groupId}/task-lists/{taskListId}/tasks/${taskId}`)
    .catch((e: AxiosError) => Promise.reject(e));
  return res.data;
}
