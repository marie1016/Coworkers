import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

export default async function deleteMember(teamId: string, memberId: string) {
  const res = await axiosInstance
    .delete(`groups/${teamId}/member/${memberId}`)
    .catch((e: AxiosError) => Promise.reject(e.response));

  return res;
}
