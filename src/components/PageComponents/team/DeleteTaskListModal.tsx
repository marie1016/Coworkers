import Button from "@/components/@shared/UI/Button";
import Modal from "@/components/@shared/UI/Modal/Modal";
import deleteTaskList from "@/core/api/taskList/deleteTaskList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
  taskListId: string;
}

export default function DeleteTaskListModal({
  isOpen,
  onClose,
  teamId,
  taskListId,
}: Props) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteTaskList(teamId, taskListId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", teamId] });
      onClose();
    },
    onError: (error) => {
      alert("삭제중 에러 발생: 에러 정보는 콘솔 확인");
      console.error(error);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex w-80 flex-col items-center gap-6">
        <div className="relative h-8 w-8">
          <Image fill src="/icons/icon-alert.svg" alt="주의" />
        </div>
        <p className="font-medium">삭제하시겠습니까?</p>
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
