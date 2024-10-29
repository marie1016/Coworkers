import Modal from "@/components/@shared/UI/Modal/Modal";
import Image from "next/image";
import useModalStore from "@/lib/hooks/stores/modalStore";
import { Task } from "@/core/dtos/tasks/tasks";
import Button from "@/components/@shared/UI/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteTask from "@/core/api/tasks/deleteTask";

export default function DeleteTaskModal({
  taskItem,
}: {
  taskItem: Task | null;
}) {
  const modalName = "deleteTaskModal";
  const isOpen = useModalStore((state) => state.modals[modalName] || false);
  const closeModal = useModalStore((state) => state.closeModal);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => {
      if (!taskItem) {
        return Promise.reject(new Error("taskItem is null"));
      }
      return deleteTask(taskItem.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      closeModal(modalName);
    },
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });

  const handleDeleteTask = () => {
    deleteMutation.mutate();
  };

  console.log(taskItem);

  if (!taskItem) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={() => closeModal(modalName)}>
      <div className="flex w-80 flex-col items-center justify-between">
        <Image
          src="/icons/icon-alert.svg"
          width={24}
          height={24}
          alt="경고 아이콘"
        />
        <p className="mt-4 text-center">
          &apos;{taskItem.name}&apos;
          <br />할 일을 정말 삭제하시겠어요?
        </p>
        <p className="mt-2 text-text-md text-text-secondary">
          삭제 후에는 되돌릴 수 없습니다.
        </p>
        <div className="mt-6 flex w-full gap-2">
          <Button
            variant="outlined"
            size="large"
            className="bg-background-inverse"
            onClick={() => closeModal(modalName)}
          >
            닫기
          </Button>
          <Button
            variant="solid"
            size="large"
            className="bg-status-danger"
            onClick={handleDeleteTask}
            disabled={deleteMutation.isPending}
          >
            삭제하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
