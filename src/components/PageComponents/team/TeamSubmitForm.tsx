import Button from "@/components/@shared/UI/Button";
import Input from "@/components/@shared/UI/Input";
import InputLabel from "@/components/@shared/UI/InputLabel";
import ProfileImagePreview from "@/components/@shared/UI/ProfileImagePreview";
import addTeam from "@/core/api/group/addTeam";
import { AddTeamResponse } from "@/core/dtos/group/group";
import useImageUpload from "@/lib/hooks/useImageUpload";
import { AxiosResponse } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

export default function TeamSubmitForm() {
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
    <form className="flex flex-col items-center gap-10" onSubmit={handleSubmit}>
      <div className="flex w-full flex-col items-center gap-20 sm:gap-6">
        <h2 className="text-4xl font-medium text-text-primary sm:text-2xl md:text-2xl">
          팀 생성하기
        </h2>
        <div className="flex w-full flex-col gap-6">
          <InputLabel label="팀 프로필">
            <ProfileImagePreview
              value={fileInputValue}
              onInputChange={handleFileInputChange}
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
          </InputLabel>
          <InputLabel label="팀 이름">
            <Input value={teamName} onChange={handleNameChange} />
          </InputLabel>
        </div>
      </div>
      <div className="itmes-center flex w-full flex-col items-center gap-6">
        <Button type="submit" variant="solid" size="large">
          생성하기
        </Button>
        <p className="text-text-lg font-regular text-text-primary sm:text-text-md">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </p>
      </div>
    </form>
  );
}
