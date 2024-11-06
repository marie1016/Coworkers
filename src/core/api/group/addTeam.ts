import { AddTeamForm, SubmitTeamResponse } from "@/core/dtos/group/group";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

export default async function addTeam(addTeamForm: AddTeamForm) {
  const res: AxiosResponse<SubmitTeamResponse, AxiosError> = await axiosInstance
    .post("groups", addTeamForm)
    .catch((e: AxiosError) => Promise.reject(e));

  return res;
}
