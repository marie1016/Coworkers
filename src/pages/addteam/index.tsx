import FileInput from "@/components/@shared/UI/FileInput";
import InputLabel from "@/components/@shared/UI/InputLabel";
import ProfileImagePreview from "@/components/@shared/UI/ProfileImagePreview";
import addTeam from "@/core/api/group/addTeam";
import { AddTeamResponse } from "@/core/dtos/group/group";
import useImageUpload from "@/lib/hooks/useImageUpload";
import { AxiosResponse } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Addteam() {
  const {
    fileInputValue,
    file,
    handleFileInputChange,
    getImageUrl,
    clearFileInput,
    imagePreview,
  } = useImageUpload();
  const [teamName, setTeamName] = useState("");

  const router = useRouter();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
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
    <form
      className="mx-auto mt-52 flex max-w-[30.75rem] flex-col items-center gap-10 px-4"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full flex-col items-center gap-20 sm:gap-6">
        <h2 className="text-4xl font-medium text-text-primary sm:text-2xl md:text-2xl">
          팀 생성하기
        </h2>
        <div className="flex w-full flex-col gap-6">
          <InputLabel label="팀 프로필">
            <FileInput
              value={fileInputValue}
              onInputChange={handleFileInputChange}
            >
              <ProfileImagePreview
                preview={imagePreview}
                clearFile={clearFileInput}
              >
                <div className="relative h-6 w-6">
                  <Image
                    fill
                    src="/icons/icon-imagePlaceholder.svg"
                    alt="이미지"
                  />
                </div>
              </ProfileImagePreview>
            </FileInput>
          </InputLabel>
          <InputLabel label="팀 이름">
            <input
              className="text-black"
              value={teamName}
              onChange={handleNameChange}
            />
          </InputLabel>
        </div>
      </div>
      <div className="itmes-center flex flex-col gap-6">
        <button type="submit">생성하기</button>
        <p className="text-text-lg font-regular text-text-primary sm:text-text-md">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </p>
      </div>
    </form>
  );
}
