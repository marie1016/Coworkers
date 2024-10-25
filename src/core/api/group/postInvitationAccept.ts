import {
  AcceptInvitationForm,
  AcceptInvitationResponse,
} from "@/core/dtos/group/group";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

export default async function postInvitationAccept(
  formData: AcceptInvitationForm,
) {
  const res: AxiosResponse<AcceptInvitationResponse, unknown> =
    await axiosInstance
      .post("groups/accept-invitation", formData)
      .catch((e: AxiosError) => Promise.reject(e.response));

  return res.data;
}
