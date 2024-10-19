import { Task } from "@/core/dtos/tasks/tasks";
import axiosInstance from "../axiosInstance";

export type DatePiece = Date | null;
export type SelectedDate = DatePiece | [DatePiece, DatePiece];

interface GetTasksParams {
  groupId: string;
  id: number | null;
  date: string;
}

export default async function getTasks({ groupId, id, date }: GetTasksParams) {
  const res = await axiosInstance.get<Task[]>(
    `/groups/${groupId}/task-lists/${id}/tasks?date=${date}`,
  );
  return res.data;
}
