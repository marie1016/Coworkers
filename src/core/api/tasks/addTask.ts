import { AddTaskForm } from "@/core/dtos/tasks/tasks";
import { AxiosResponse, AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

interface AddTaskParams {
  teamId: string;
  selectedTaskListId: number;
}

export default async function addTask(
  { teamId, selectedTaskListId }: AddTaskParams,
  addTaskForm: AddTaskForm,
) {
  const res: AxiosResponse<AddTaskForm, AxiosError> = await axiosInstance
    .post(
      `/groups/${teamId}/task-lists/${selectedTaskListId}/tasks`,
      addTaskForm,
    )
    .catch((e: AxiosError) => Promise.reject(e));
  return res.data;
}
