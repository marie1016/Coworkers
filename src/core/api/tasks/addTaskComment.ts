import { TaskCommentForm } from "@/core/dtos/tasks/tasks";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

interface AddTaskCommentParams {
  taskId: number;
}

export default async function addTaskComment(
  { taskId }: AddTaskCommentParams,
  addTaskCommentForm: TaskCommentForm,
) {
  const res: AxiosResponse<TaskCommentForm, AxiosError> = await axiosInstance
    .post(`/tasks/${taskId}/comments`, addTaskCommentForm)
    .catch((e: AxiosError) => Promise.reject(e));
  return res.data;
}
