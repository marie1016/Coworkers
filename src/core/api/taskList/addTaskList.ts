import { AxiosError, AxiosResponse } from "axios";
import { AddTaskListForm, TaskList } from "@/core/dtos/tasks/tasks";
import axiosInstance from "../axiosInstance";

export default async function addTaskList(
  teamId: string,
  taskListForm: AddTaskListForm,
) {
  const res: AxiosResponse<TaskList, AxiosError> = await axiosInstance
    .post(`groups/${teamId}/task-lists`, taskListForm)
    .catch((e: AxiosError) => Promise.reject(e));

  return res;
}
