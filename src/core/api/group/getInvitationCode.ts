import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

export default async function getInvitationCode(teamId: string) {
  const res: AxiosResponse<string, unknown> = await axiosInstance
    .get(`groups/${teamId}/invitation`)
    .catch((e: AxiosError) => Promise.reject(e.response));

  return res.data;
}
