import { EditTaskForm } from "@/core/dtos/tasks/tasks";
import { AxiosResponse, AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

interface EditTaskParams {
  taskId: number;
}

export default async function editTask(
  { taskId }: EditTaskParams,
  editTaskForm: EditTaskForm,
) {
  const res: AxiosResponse<EditTaskForm, AxiosError> = await axiosInstance
    .patch(
      `/groups/{groupId}/task-lists/{selectedTaskListId}/tasks/${taskId}`,
      editTaskForm,
    )
    .catch((e: AxiosError) => Promise.reject(e));
  return res.data;
}
