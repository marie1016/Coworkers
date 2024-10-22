import { TaskListsResponse } from "@/core/dtos/tasks/tasks";
import { AxiosResponse, AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

export default async function getTaskLists(teamId: string) {
  const res: AxiosResponse<TaskListsResponse, AxiosError> = await axiosInstance
    .get(`/groups/${teamId}`)
    .catch((e: AxiosError) => Promise.reject(e));
  return res.data;
}
