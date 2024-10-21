import { AddTaskForm } from "@/core/dtos/tasks/tasks";
import { AxiosResponse, AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

interface AddTaskParams {
  groupId: string;
  selectedTaskListId: number;
}

export default async function addTask(
  { groupId, selectedTaskListId }: AddTaskParams,
  addTaskForm: AddTaskForm,
) {
  const res: AxiosResponse<AddTaskForm, AxiosError> = await axiosInstance
    .post(
      `/groups/${groupId}/task-lists/${selectedTaskListId}/tasks`,
      addTaskForm,
    )
    .catch((e: AxiosError) => Promise.reject(e));
  return res.data;
}
