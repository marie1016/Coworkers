import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

export default function deleteTeam(teamId: string) {
  const res = axiosInstance
    .delete(`groups/${teamId}`)
    .catch((e: AxiosError) => Promise.reject(e));

  return res;
}
