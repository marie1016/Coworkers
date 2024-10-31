import { TaskListTasks } from "@/core/dtos/group/group";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

export default async function getTasks(teamId: string, date?: string) {
  const res: AxiosResponse<TaskListTasks[]> = await axiosInstance
    .get(`groups/${teamId}/tasks${date ? `?date=${date}` : ""}`)
    .catch((e: AxiosError) => Promise.reject(e.response));

  return res.data;
}
