import Button from "@/components/@shared/UI/Button";
import Modal from "@/components/@shared/UI/Modal/Modal";
import getInvitationCode from "@/core/api/group/getInvitationCode";
import useTimeoutToggle from "@/lib/hooks/useTimeoutToggle";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
}

export default function TeamLinkModal({ isOpen, onClose, teamId }: Props) {
  const mutationFn = async () => {
    const link = await getInvitationCode(teamId);
    navigator.clipboard.writeText(link);
  };

  const { isOn: isCopied, timeoutToggle: copyNoticeTimeout } = useTimeoutToggle(
    false,
    800,
  );

  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess: copyNoticeTimeout,
    onError: (error) => {
      alert("링크 복사중 에러 발생: 에러 정보는 콘솔에서 확인");
      console.error(error);
    },
  });

  const buttonContent = () => {
    if (isCopied)
      return (
        <div className="flex w-full justify-center">
          <div className="relative h-6 w-6">
            <Image fill src="icons/check.svg" alt="복사되었습니다." />
          </div>
        </div>
      );
    if (isPending) return "링크 불러오는중...";
    return "링크 복사하기";
  };

  const handleButtonClick = () => {
    if (isPending || isCopied) return;
    mutate();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCloseButton>
      <div className="flex w-[22rem] flex-col gap-10 px-9">
        <div className="flex w-full flex-col gap-2">
          <h3 className="text-center text-text-lg font-medium text-text-primary">
            멤버 초대
          </h3>
          <p className="text-center text-text-md font-medium text-text-secondary">
            그룹에 참여할 수 있는 링크를 복사합니다.
          </p>
        </div>
        <Button
          type="button"
          variant="solid"
          size="large"
          onClick={handleButtonClick}
        >
          {buttonContent()}
        </Button>
      </div>
    </Modal>
  );
}
