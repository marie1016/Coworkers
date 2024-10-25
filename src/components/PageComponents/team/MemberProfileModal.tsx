import Button from "@/components/@shared/UI/Button";
import Modal from "@/components/@shared/UI/Modal/Modal";
import useTimeoutToggle from "@/lib/hooks/useTimeoutToggle";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  name: string;
  email: string;
}

export default function MemberProfileModal({
  isOpen,
  onClose,
  image,
  name,
  email,
}: Props) {
  const { isOn: isButtonClicked, timeoutToggle } = useTimeoutToggle();

  const handleEmailCopy = () => {
    if (isButtonClicked) return;
    navigator.clipboard.writeText(email);
    timeoutToggle();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCloseButton>
      <div className="mx-4 flex w-[17.5rem] flex-col items-center gap-6">
        <div className="relative h-[3.25rem] w-[3.25rem]">
          <Image
            fill
            src={image ?? "/images/image-defaultProfile.png"}
            alt="프로필"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-text-md font-medium text-text-primary">
            {name}
          </span>
          <span className="text-text-xs font-regular text-text-secondary">
            {email}
          </span>
        </div>
        <Button
          variant="solid"
          size="large"
          className="text-text-lg"
          onClick={handleEmailCopy}
        >
          {isButtonClicked ? (
            <div className="flex w-full justify-center">
              <div className="relative h-6 w-6">
                <Image fill src="icons/check.svg" alt="복사되었습니다." />
              </div>
            </div>
          ) : (
            "이메일 복사하기"
          )}
        </Button>
      </div>
    </Modal>
  );
}
