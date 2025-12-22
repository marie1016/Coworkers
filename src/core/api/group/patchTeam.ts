import { PatchTeamForm, SubmitTeamResponse } from "@/core/dtos/group/group";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

export default async function patchTeam(
  teamId: string,
  patchTeamForm: PatchTeamForm,
) {
  const res: AxiosResponse<SubmitTeamResponse, AxiosError> = await axiosInstance
    .patch(`groups/${teamId}`, patchTeamForm)
    .catch((e: AxiosError) => Promise.reject(e));

  return res;
}
