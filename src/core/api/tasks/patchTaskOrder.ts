import { TaskOrderForm } from "@/core/dtos/tasks/tasks";
import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

export default async function patchTaskOrder(
  taskListId: number,
  id: string,
  body: TaskOrderForm,
) {
  const res = await axiosInstance
    .patch(`groups/{groupId}/task-lists/${taskListId}/tasks/${id}/order`, body)
    .catch((e: AxiosError) => Promise.reject(e.response));

  return res;
}
