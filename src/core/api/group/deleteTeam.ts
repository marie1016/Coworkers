import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

export default async function deleteTeam(teamId: string) {
  const res = await axiosInstance
    .delete(`groups/${teamId}`)
    .catch((e: AxiosError) => Promise.reject(e));

  return res;
}
