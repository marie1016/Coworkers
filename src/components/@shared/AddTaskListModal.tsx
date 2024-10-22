import { ChangeEvent, FormEvent, useState } from "react";
import addTaskList from "@/core/api/taskList/addTaskList";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Modal from "./UI/Modal/Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
  submitCallback?: () => void;
}

export default function AddTaskListModal({
  isOpen,
  onClose,
  teamId,
  submitCallback = () => {},
}: Props) {
  const [taskListName, setTaskListName] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTaskListName(e.target.value);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addTaskList(teamId, { name: taskListName });
    } catch (error) {
      alert("목록 등록 중 오류 발생: 오류 정보는 콘솔에서 확인");
      console.error(error);
      return;
    }
    submitCallback();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCloseButton>
      <form
        className="flex max-w-[17.5rem] flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col gap-4">
          <h3 className="text-text-lg font-medium text-text-primary">
            할 일 목록
          </h3>
          <Input
            placeholder="목록 명을 입력해주세요."
            value={taskListName}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit" variant="solid" size="large">
          만들기
        </Button>
      </form>
    </Modal>
  );
}
