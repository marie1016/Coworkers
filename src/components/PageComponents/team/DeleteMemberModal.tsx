import deleteMember from "@/core/api/group/deleteMember";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAuth } from "@/core/context/AuthProvider";
import WarningModal from "./WarningModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
  memberId: string;
}

export default function DeleteMemberModal({
  isOpen,
  onClose,
  teamId,
  memberId,
}: Props) {
  const router = useRouter();
  const { getMe } = useAuth();

  const { mutate } = useMutation({
    mutationFn: () => deleteMember(teamId, memberId),
    onMutate: () => {
      onClose();
    },
    onSuccess: () => {
      router.push("/");
      getMe();
    },
    onError: (e) => {
      alert("탈퇴중 오류 발생: 오류 정보는 콘솔 확인");
      console.error(e);
    },
  });

  const handleButtonClick = () => {
    mutate();
  };

  return (
    <WarningModal
      isOpen={isOpen}
      onClose={onClose}
      onClick={handleButtonClick}
      message="이 그룹에서 탈퇴하시겠습니까?"
    />
  );
}
