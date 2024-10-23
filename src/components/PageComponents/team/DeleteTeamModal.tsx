import Button from "@/components/@shared/UI/Button";
import Modal from "@/components/@shared/UI/Modal/Modal";
import deleteTeam from "@/core/api/group/deleteTeam";
import Image from "next/image";
import { useRouter } from "next/router";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
}

export default function DeleteTeamModal({ isOpen, onClose, teamId }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteTeam(teamId);
    } catch (error) {
      alert("삭제중 에러 발생: 에러 정보는 콘솔 확인");
      console.error(error);
      return;
    }
    onClose();
    router.push("/");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex w-80 flex-col items-center gap-6">
        <div className="relative h-8 w-8">
          <Image fill src="/icons/icon-alert.svg" alt="주의" />
        </div>
        <p className="font-medium">정말 팀을 삭제하시겠습니까?</p>
        <div className="flex w-full gap-2">
          <Button
            variant="solid"
            size="large"
            className="bg-status-danger hover:bg-[#b91e1e] active:bg-[#aa1111]"
            onClick={handleDelete}
          >
            삭제
          </Button>
          <Button variant="outlined" size="large" onClick={onClose}>
            취소
          </Button>
        </div>
      </div>
    </Modal>
  );
}
