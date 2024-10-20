import { AddTaskForm } from "@/core/dtos/tasks/tasks";
import axiosInstance from "../axiosInstance";

interface AddTaskParams {
  groupId: string;
  selectedTaskListId: number;
}

export default async function addTask(
  { groupId, selectedTaskListId }: AddTaskParams,
  addTaskForm: AddTaskForm,
) {
  const token = localStorage.getItem("accessToken");
  const res = await axiosInstance.post<AddTaskForm>(
    `/groups/${groupId}/task-lists/${selectedTaskListId}/tasks`,
    addTaskForm,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
}
