import Button from "@/components/@shared/UI/Button";
import Input from "@/components/@shared/UI/Input";
import InputLabel from "@/components/@shared/UI/InputLabel";
import postInvitationAccept from "@/core/api/group/postInvitationAccept";
import { useAuth } from "@/core/context/AuthProvider";
import StandardError from "@/core/types/standardError";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

export default function Participate() {
  const [link, setLink] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const { user } = useAuth(true);
  const { email } = user ?? { email: "" };

  const { mutate, isPending } = useMutation({
    mutationFn: postInvitationAccept,
    onMutate: () => {
      setIsValid(true);
      setErrorMessage("");
    },
    onSuccess: (response) => {
      router.push(`/${response.groupId}`);
    },
    onError: (e: StandardError) => {
      console.error(e);
      switch (e.status) {
        case 400:
          setIsValid(false);
          setErrorMessage("유효하지 않은 초대 코드입니다.");
          break;
        case 401:
          router.replace("/unauthorized");
          break;
        default:
          setIsValid(false);
          setErrorMessage(
            "팀 참여중 에러가 발생했습니다. 관리자에게 문의해 주세요.",
          );
          break;
      }
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleButtonClick = () => {
    if (!email || !link) return;
    mutate({ userEmail: email, token: link });
  };

  if (!user) return null;

  return (
    <div className="mx-auto mt-52 max-w-[30.75rem] px-4">
      <form className="flex w-full flex-col items-center gap-10">
        <div className="flex w-full flex-col items-center gap-20 sm:gap-6">
          <h2 className="text-4xl font-medium text-text-primary sm:text-2xl md:text-2xl">
            팀 참여하기
          </h2>
          <InputLabel label="팀 링크">
            <Input
              errorMessage={errorMessage}
              isValid={isValid}
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
            disabled={isPending}
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
