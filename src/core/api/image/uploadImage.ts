import { AxiosError, AxiosResponse } from "axios";
import UploadImageResponse from "@/core/dtos/image/uploadImageResponse";
import axiosInstance from "../axiosInstance";

export default async function uploadImage(imageFile: File) {
  const res: AxiosResponse<UploadImageResponse, AxiosError> =
    await axiosInstance
      .post(
        "images/upload",
        { image: imageFile },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .catch((e: AxiosError) => Promise.reject(e));

  return res;
}
