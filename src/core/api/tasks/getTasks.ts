import { Task } from "@/core/dtos/tasks/tasks";
import { AxiosResponse, AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

export type DatePiece = Date | null;
export type SelectedDate = DatePiece | [DatePiece, DatePiece];

interface GetTasksParams {
  groupId: string;
  id: number | null;
  date: Date | null;
}

export default async function getTasks({ groupId, id, date }: GetTasksParams) {
  const res: AxiosResponse<Task[], AxiosError> = await axiosInstance
    .get(
      `/groups/${groupId}/task-lists/${id}/tasks?date=${date?.toISOString()}`,
    )
    .catch((e: AxiosError) => Promise.reject(e));
  return res.data;
}
