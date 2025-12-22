import { TaskCommentForm } from "@/core/dtos/tasks/tasks";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

export interface EditTaskCommentParams {
  commentId: number;
  editTaskCommentForm: TaskCommentForm;
}

export default async function editTaskComment({
  commentId,
  editTaskCommentForm,
}: EditTaskCommentParams) {
  const res: AxiosResponse<TaskCommentForm, AxiosError> = await axiosInstance
    .patch(`/tasks/{taskId}/comments/${commentId}`, editTaskCommentForm)
    .catch((e: AxiosError) => Promise.reject(e));
  return res.data;
}
