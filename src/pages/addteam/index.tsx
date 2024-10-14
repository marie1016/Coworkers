import FileInput from "@/components/@shared/UI/FileInput";
import addTeam from "@/core/api/group/addTeam";
import { AddTeamResponse } from "@/core/dtos/group/group";
import useImageUpload from "@/lib/hooks/useImageUpload";
import { AxiosResponse } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";

export default function Addteam() {
  const {
    fileInputValue,
    file,
    handleFileInputChange,
    clearFileInput,
    getImageUrl,
    imagePreview,
  } = useImageUpload();
  const [teamName, setTeamName] = useState("");

  const router = useRouter();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  };

  const handlePreviewClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clearFileInput();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let imageUrl: string | undefined;
    let res: AxiosResponse<AddTeamResponse>;
    try {
      if (file) imageUrl = await getImageUrl(file);
      res = await addTeam({ image: imageUrl, name: teamName });
    } catch (error) {
      console.error(error);
      return;
    }
    router.push(`/${res.data.id}`);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <FileInput value={fileInputValue} onInputChange={handleFileInputChange}>
        이미지
      </FileInput>
      {imagePreview ? (
        <Image src={imagePreview} width={64} height={64} alt="이미지 프리뷰" />
      ) : null}
      <button type="button" onClick={handlePreviewClear}>
        프리뷰 지우기
      </button>
      <input
        className="text-black"
        value={teamName}
        onChange={handleNameChange}
      />
      <button type="submit">생성하기</button>
    </form>
  );
}
