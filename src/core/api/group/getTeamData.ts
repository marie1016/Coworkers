import { GroupResponse } from "@/core/dtos/group/group";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

export default async function getTeamData(id: string | number) {
  const res: AxiosResponse<GroupResponse, AxiosError> = await axiosInstance
    .get(`groups/${id}`)
    .catch((e: AxiosError) => Promise.reject(e.response));

  return res.data;
}
