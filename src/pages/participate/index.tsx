import Button from "@/components/@shared/UI/Button";
import Input from "@/components/@shared/UI/Input";
import InputLabel from "@/components/@shared/UI/InputLabel";
import postInvitationAccept from "@/core/api/group/postInvitationAccept";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

export default function Participate() {
  const [link, setLink] = useState("");
  const router = useRouter();
  const { email } = router.query;

  const { mutate } = useMutation({
    mutationFn: postInvitationAccept,
    onSuccess: (response) => {
      router.push(`/${response.groupId}`);
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleButtonClick = () => {
    if (typeof email !== "string" || !link) return;
    mutate({ userEmail: email, token: link });
  };

  return (
    <div className="mx-auto mt-52 max-w-[30.75rem] px-4">
      <form className="flex w-full flex-col items-center gap-10">
        <div className="flex w-full flex-col items-center gap-20 sm:gap-6">
          <h2 className="text-4xl font-medium text-text-primary sm:text-2xl md:text-2xl">
            팀 참여하기
          </h2>
          <InputLabel label="팀 링크">
            <Input
              className="w-full"
              placeholder="팀 링크를 입력해주세요."
              onChange={handleInputChange}
            />
          </InputLabel>
        </div>
        <div className="itmes-center flex w-full flex-col items-center gap-6">
          <Button
            type="button"
            variant="solid"
            size="large"
            onClick={handleButtonClick}
          >
            참여하기
          </Button>
          <p className="break-keep text-text-lg font-regular text-text-primary sm:text-text-md">
            공유받은 팀 링크를 입력해 참여할 수 있어요.
          </p>
        </div>
      </form>
    </div>
  );
}
