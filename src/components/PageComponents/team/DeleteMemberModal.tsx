import deleteMember from "@/core/api/group/deleteMember";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => deleteMember(teamId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", teamId] });
      onClose();
    },
    onError: (e) => {
      alert("멤버 삭제중 오류 발생: 오류 정보는 콘솔 확인");
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
      message="이 멤버를 팀에서 제외하시겠습니까?"
    />
  );
}
