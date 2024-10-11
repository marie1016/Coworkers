import uploadImage from "@/core/api/image/uploadImage";
import UploadImageResponse from "@/core/dtos/image/uploadImageResponse";
import { AxiosError, AxiosResponse } from "axios";
import { ChangeEvent, useEffect, useState } from "react";

// useImageUpload 훅은 파라미터를 줘도 되고 안줘도 됩니다. 파라미터로는 기본적으로 띄워줄 프리뷰 이미지의 src값을 넣어줍니다.

export default function useImageUpload(defaultPreview: string | null = null) {
  const [fileInputValue, setImageInputValue] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    defaultPreview,
  );

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageInputValue(e.target.value);
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  const clearFileInput = () => {
    setImageInputValue("");
    setFile(null);
    setImagePreview(null);
  };

  const getImageUrl = async (image: File) => {
    let res: AxiosResponse<UploadImageResponse, AxiosError>;
    try {
      res = await uploadImage(image);
    } catch (e: unknown) {
      throw e as AxiosError;
    }

    return res.data.url;
  };

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") setImagePreview(reader.result);
    };
  }, [file]);

  return {
    fileInputValue, // FileInput을 controlled input으로 만들기 위해 사용합니다. FileInput 컴포넌트의 value 프롭으로 넣어줍니다.
    file, // FileInput으로 업로드된 파일입니다. API로 url을 받아오는 getImageUrl 함수에 파라미터로 넣어줍니다.
    handleFileInputChange, // FileInput의 핸들링 함수입니다. FileInput 컴포넌트의 onInputChange 프롭으로 넣어줍니다.
    clearFileInput, // FileInput과 다른 스테이트들을 초기화하는 함수입니다. 파라미터 없이 사용하면 됩니다.
    getImageUrl, // API에 이미지를 업로드해 성공시 업로드한 이미지의 URL을, 실패시 API가 반환한 AxiosError를 그대로 반환하는 함수입니다. 위의 file을 파라미터로 받습니다.
    imagePreview, // 이미지에 src로 쓸 수 있는 스트링입니다. FileInput에 들어간 이미지를 띄워줍니다.
  };
}
