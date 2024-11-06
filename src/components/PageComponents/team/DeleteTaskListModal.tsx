import deleteTaskList from "@/core/api/taskList/deleteTaskList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import WarningModal from "./WarningModal";

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

  const { mutate } = useMutation({
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
    mutate();
  };

  return (
    <WarningModal isOpen={isOpen} onClose={onClose} onClick={handleDelete} />
  );
}
