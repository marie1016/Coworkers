import Button from "@/components/@shared/UI/Button";
import Input from "@/components/@shared/UI/Input";
import InputLabel from "@/components/@shared/UI/InputLabel";
import ProfileImagePreview from "@/components/@shared/UI/ProfileImagePreview";
import addTeam from "@/core/api/group/addTeam";
import patchTeam from "@/core/api/group/patchTeam";
import { SubmitTeamResponse } from "@/core/dtos/group/group";
import useImageUpload from "@/lib/hooks/useImageUpload";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

interface Props {
  teamId?: string;
  defaultImage?: string;
  defaultName?: string;
  submitCallback?: () => void;
}

export default function TeamSubmitForm({
  teamId,
  defaultImage,
  defaultName = "",
  submitCallback = () => {},
}: Props) {
  const {
    fileInputValue,
    file,
    handleFileInputChange,
    getImageUrl,
    clearFileInput,
    imagePreview,
  } = useImageUpload(defaultImage);
  const [teamName, setTeamName] = useState(defaultName);

  const router = useRouter();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  };

  const { mutate: submitMutate, isPending: isSubmitPending } = useMutation({
    mutationFn: async () => {
      let imageUrl: string | null = null;
      if (file) imageUrl = (await getImageUrl(file)) ?? null;
      else if (imagePreview) imageUrl = imagePreview;

      const res: AxiosResponse<SubmitTeamResponse> = teamId
        ? await patchTeam(teamId, { image: imageUrl, name: teamName })
        : await addTeam({ image: imageUrl ?? undefined, name: teamName });

      return res.data;
    },
    onSuccess: (data) => {
      if (!teamId) {
        router.push(`/${data.id}`);
        return;
      }
      submitCallback();
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitMutate();
  };

  return (
    <form
      className="flex w-full flex-col items-center gap-10"
      onSubmit={handleSubmit}
    >
      <div className="flex w-full flex-col items-center gap-20 sm:gap-6">
        <h2 className="text-4xl font-medium text-text-primary sm:text-2xl md:text-2xl">
          {teamId ? "팀 수정하기" : "팀 생성하기"}
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
            <Input
              value={teamName}
              onChange={handleNameChange}
              className="w-full"
            />
          </InputLabel>
        </div>
      </div>
      <div className="itmes-center flex w-full flex-col items-center gap-6">
        <Button
          type="submit"
          variant="solid"
          size="large"
          disabled={isSubmitPending}
        >
          {teamId ? "수정하기" : "생성하기"}
        </Button>
        <p className="break-keep text-text-lg font-regular text-text-primary sm:text-text-md">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </p>
      </div>
    </form>
  );
}
