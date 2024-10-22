import { PatchTeamForm, SubmitTeamResponse } from "@/core/dtos/group/group";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

export default async function patchTeam({
  teamId,
  image,
  name,
}: PatchTeamForm) {
  const res: AxiosResponse<SubmitTeamResponse, AxiosError> = await axiosInstance
    .patch(`groups/${teamId}`, { image, name })
    .catch((e: AxiosError) => Promise.reject(e));

  return res;
}
