import { AddTaskListForm } from "@/core/dtos/tasks/tasks";
import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

export default async function patchTaskList(
  teamId: string,
  taskListId: string,
  patchForm: AddTaskListForm,
) {
  const res = await axiosInstance
    .patch(`groups/${teamId}/task-lists/${taskListId}`, patchForm)
    .catch((e: AxiosError) => Promise.reject(e));

  return res;
}
