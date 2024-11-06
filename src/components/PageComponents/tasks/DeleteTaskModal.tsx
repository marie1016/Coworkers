import Modal from "@/components/@shared/UI/Modal/Modal";
import Image from "next/image";
import useModalStore from "@/lib/hooks/stores/modalStore";
import { Task } from "@/core/dtos/tasks/tasks";
import Button from "@/components/@shared/UI/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteTask from "@/core/api/tasks/deleteTask";
import { useState } from "react";
import deleteRecurring from "@/core/api/tasks/deleteRecurring";
import { FrequencyType } from "@/lib/constants/frequencyType";

export default function DeleteTaskModal({ taskItem }: { taskItem: Task }) {
  const [buttonId, setButtonId] = useState(0);
  const { frequency } = taskItem;

  const modalName = "deleteTaskModal";
  const isOpen = useModalStore((state) => state.modals[modalName] || false);
  const closeModal = useModalStore((state) => state.closeModal);
  const queryClient = useQueryClient();

  const handleButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setButtonId(Number(e.target.value));
  };

  const mutationFn =
    buttonId === 1
      ? () => deleteTask(taskItem.id)
      : () => deleteRecurring(taskItem.recurringId);

  const deleteMutation = useMutation({
    mutationFn,
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

  if (!taskItem) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={() => closeModal(modalName)}>
      <div className="flex w-80 flex-col items-center justify-between font-medium">
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
        <div className="mt-6 flex flex-col items-center gap-2 text-text-md">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value={1}
              onChange={handleButtonChange}
              checked={buttonId === 1}
            />
            선택한 할 일 삭제
          </label>
          <label
            className={`flex items-center gap-2 ${frequency === FrequencyType.ONCE ? "hidden" : ""}`}
          >
            <input
              type="radio"
              value={2}
              onChange={handleButtonChange}
              checked={buttonId === 2}
            />
            선택한 할 일 반복설정 삭제
          </label>
        </div>
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
