import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

interface TaskListOrderForm {
  displayIndex: number;
}

export default async function patchTaskListOrder(
  teamId: string,
  taskListId: string,
  body: TaskListOrderForm,
) {
  const res = await axiosInstance
    .patch(`groups/${teamId}/task-lists/${taskListId}/order`, body)
    .catch((e: AxiosError) => Promise.reject(e.response));

  return res;
}
