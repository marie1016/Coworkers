import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

export default async function deleteRecurring(recurringId: number) {
  const res = await axiosInstance
    .delete(
      `/groups/{groupId}/task-lists/{taskListId}/tasks/{taskId}/recurring/${recurringId}`,
    )
    .catch((e: AxiosError) => Promise.reject(e));
  return res;
}
