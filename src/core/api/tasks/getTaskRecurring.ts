import { Task } from "@/core/dtos/tasks/tasks";
import { AxiosResponse, AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

interface GetTasksParams {
  taskId: number | null;
}

export default async function getTaskRecurring({ taskId }: GetTasksParams) {
  const res: AxiosResponse<Task, AxiosError> = await axiosInstance
    .get(`/groups/{groupId}/task-lists/{taskListId}/tasks/${taskId}`)
    .catch((e: AxiosError) => Promise.reject(e));
  return res.data;
}
