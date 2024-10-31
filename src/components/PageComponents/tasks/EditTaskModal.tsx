import Input from "@/components/@shared/UI/Input";
import InputLabel from "@/components/@shared/UI/InputLabel";
import React, { useMemo, useState, useEffect } from "react";
import useModalStore from "@/lib/hooks/stores/modalStore";
import Modal from "@/components/@shared/UI/Modal/Modal";
import Button from "@/components/@shared/UI/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import editTask from "@/core/api/tasks/editTask";
import { EditTaskForm, Task } from "@/core/dtos/tasks/tasks";

interface EditTaskModalProps {
  taskToEdit: Task;
}

export default function EditTaskModal({ taskToEdit }: EditTaskModalProps) {
  const initialTaskData = useMemo(
    () => ({
      name: taskToEdit.name || "",
      description: taskToEdit.description || "",
    }),
    [taskToEdit],
  );
  const [taskData, setTaskData] = useState<EditTaskForm>(initialTaskData);

  useEffect(() => {
    setTaskData(initialTaskData);
  }, [initialTaskData]);

  const queryClient = useQueryClient();

  const modalName = "editTaskModal";
  const isOpen = useModalStore((state) => state.modals[modalName] || false);
  const closeModal = useModalStore((state) => state.closeModal);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const editMutation = useMutation({
    mutationFn: (editTaskForm: EditTaskForm) =>
      editTask({ taskId: taskToEdit.id }, editTaskForm),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      closeModal(modalName);
    },
    onError: (error) => {
      console.error("Error editing task:", error);
    },
  });

  const isFormValid = taskData.name?.trim();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      const dataToSubmit = {
        name: taskData.name,
        description: taskData.description,
      };
      editMutation.mutate(dataToSubmit);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={() => closeModal(modalName)} isCloseButton>
      <div className="h-auto w-[24rem] px-6 py-8">
        <h2 className="text-center text-text-lg text-text-primary">
          할 일 수정하기
        </h2>
        <p className="mb-6 mt-4 text-center text-text-md text-text-default">
          할 일은 실제로 행동 가능한 작업 중심으로 <br />
          작성해주시면 좋습니다.
        </p>
        <form
          className="flex flex-col items-center gap-6"
          onSubmit={handleFormSubmit}
        >
          <InputLabel className="text-md text-text-primary" label="할 일 제목">
            <Input
              name="name"
              type="text"
              value={taskData.name}
              onChange={handleInputChange}
              className="w-[21rem]"
              placeholder="할 일 제목을 입력해주세요"
            />
          </InputLabel>
          <InputLabel className="text-md text-text-primary" label="할 일 메모">
            <textarea
              name="description"
              onInput={handleInput}
              onChange={handleInputChange}
              value={taskData.description}
              className="h-auto w-full resize-none overflow-hidden rounded-xl border-border-primary bg-background-secondary p-4 placeholder:text-text-default hover:border-interaction-hover focus:border-interaction-hover focus:outline-none focus:ring-0"
              placeholder="메모를 입력해주세요."
            />
          </InputLabel>
          <Button
            variant="solid"
            size="large"
            onClick={handleFormSubmit}
            disabled={!isFormValid || editMutation.isPending}
          >
            수정하기
          </Button>
        </form>
      </div>
    </Modal>
  );
}
