import { Task } from "@/core/dtos/tasks/taskList";
import axiosInstance from "../axiosInstance";

export type DatePiece = Date | null;
export type SelectedDate = DatePiece | [DatePiece, DatePiece];

interface GetTasksParams {
  teamId: string;
  id: number | null;
  date: SelectedDate;
}

export default async function getTasks({ teamId, id, date }: GetTasksParams) {
  const formattedDate = Array.isArray(date)
    ? date[0]?.toISOString()
    : date?.toISOString();
  const res = await axiosInstance.get<Task[]>(
    `/groups/${teamId}/task-lists/${id}/tasks?date=${formattedDate}`,
  );
  return res.data;
}
