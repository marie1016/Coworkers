import Input from "@/components/@shared/UI/Input";
import InputLabel from "@/components/@shared/UI/InputLabel";
import React, { useEffect, useState } from "react";
import useModalStore from "@/lib/hooks/stores/modalStore";
import Modal from "@/components/@shared/UI/Modal/Modal";
import Button from "@/components/@shared/UI/Button";
import DatePicker from "react-datepicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import addTask from "@/core/api/tasks/addTask";
import editTask from "@/core/api/tasks/editTask";
import { AddTaskForm, EditTaskForm, Task } from "@/core/dtos/tasks/tasks";
import { formattedDate } from "@/lib/utils/date";
import FrequencyType from "@/lib/constants/frequencyType";
import FrequencyWeekly from "./FrequencyWeekly";
import FrequencyMonthly from "./FrequencyMonthly";
import FrequencyDropdown from "./FrequencyDropdown";

interface AddEditTaskProps {
  teamId: string;
  selectedTaskListId: number;
  taskToEdit: Task | null;
}

export default function TaskFormModal({
  taskToEdit,
  teamId,
  selectedTaskListId,
}: AddEditTaskProps) {
  const defaultTaskData = (task: Task | null) => ({
    name: task?.name ?? "",
    description: task?.description ?? "",
    startDate: task?.date ?? new Date().toISOString(),
    frequencyType: task?.frequency ?? FrequencyType.ONCE,
  });
  const [taskData, setTaskData] = useState(() => defaultTaskData(taskToEdit));
  const [selectedMonthDay, setSelectedMonthDay] = useState<number>(0);
  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    setTaskData(defaultTaskData(taskToEdit));
  }, [taskToEdit]);

  const modalName = "taskFormModal";
  const isOpen = useModalStore((state) => state.modals[modalName] || false);
  const closeModal = useModalStore((state) => state.closeModal);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleFrequencyChange = (value: FrequencyType) => {
    setTaskData({ ...taskData, frequencyType: value });
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleDateChange = (selectedDate: Date | null) => {
    if (selectedDate) {
      setTaskData({ ...taskData, startDate: selectedDate.toISOString() });
    }
  };

  const taskMutation = useMutation({
    mutationFn: ({
      editTaskForm,
      addTaskForm,
    }: {
      editTaskForm: EditTaskForm;
      addTaskForm: AddTaskForm;
    }) =>
      taskToEdit
        ? editTask({ taskId: taskToEdit.id }, editTaskForm)
        : addTask({ teamId, selectedTaskListId }, addTaskForm),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    },
  });

  const isNameValid = taskData.name.trim();
  const isDescriptionValid = taskData.description.trim();
  const isStartDateValid = taskData.startDate !== null;
  const isFrequencyTypeValid = !!taskData.frequencyType;

  const isMonthlyValid =
    taskData.frequencyType !== FrequencyType.MONTHLY ||
    (selectedMonthDay >= 1 && selectedMonthDay <= 31);
  const isWeeklyValid =
    taskData.frequencyType !== FrequencyType.WEEKLY ||
    selectedWeekDays.length > 0;

  const isFormValid = taskToEdit
    ? isNameValid && isDescriptionValid
    : isNameValid &&
      isDescriptionValid &&
      isStartDateValid &&
      isFrequencyTypeValid &&
      isMonthlyValid &&
      isWeeklyValid;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      const dataToSubmit = {
        ...taskData,
        ...(taskData.frequencyType === FrequencyType.MONTHLY && {
          monthDay: selectedMonthDay,
        }),
        ...(taskData.frequencyType === FrequencyType.WEEKLY && {
          weekDays: selectedWeekDays,
        }),
      };

      taskMutation.mutate(
        {
          addTaskForm: dataToSubmit,
          editTaskForm: {
            name: taskData.name,
            description: taskData.description,
          },
        },
        {
          onSuccess: () => {
            closeModal(modalName);
          },
        },
      );
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={() => closeModal(modalName)} isCloseButton>
      <div className="h-auto w-[24rem] px-6 py-8">
        <h2 className="text-center text-text-lg text-text-primary">
          {taskToEdit ? "할 일 수정하기" : "할 일 만들기"}
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
          <InputLabel
            className="text-md text-text-primary"
            label="시작 날짜 및 시간"
          >
            <DatePicker
              className="h-12 w-[21rem] rounded-xl border-border-primary bg-background-secondary text-text-primary placeholder:text-text-default hover:border-interaction-hover focus:border-interaction-hover focus:outline-none focus:ring-0"
              onChange={handleDateChange}
              selected={taskToEdit ? null : new Date(taskData.startDate)}
              showTimeSelect
              placeholderText={
                taskToEdit
                  ? formattedDate(taskData.startDate)
                  : `${formattedDate(new Date())} 00:00`
              }
              dateFormat="yyyy년 MM월 dd일 HH:mm aa"
              timeFormat="HH:mm aa"
              timeIntervals={30}
              popperPlacement="bottom"
              shouldCloseOnSelect
              disabled={!!taskToEdit}
            />
          </InputLabel>
          <InputLabel className="text-md text-text-primary" label="반복 설정">
            {taskToEdit ? (
              <FrequencyDropdown
                onChange={handleFrequencyChange}
                editModeFrequency={taskToEdit.frequency}
              />
            ) : (
              <FrequencyDropdown onChange={handleFrequencyChange} />
            )}
          </InputLabel>
          {!taskToEdit && taskData.frequencyType === FrequencyType.WEEKLY && (
            <FrequencyWeekly
              selectedWeekDays={selectedWeekDays}
              setSelectedWeekDays={setSelectedWeekDays}
            />
          )}
          {!taskToEdit && taskData.frequencyType === FrequencyType.MONTHLY && (
            <FrequencyMonthly
              selectedMonthDay={selectedMonthDay}
              setSelectedMonthDay={setSelectedMonthDay}
            />
          )}
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
            disabled={!isFormValid || taskMutation.isPending}
          >
            {taskToEdit ? "수정하기" : "만들기"}
          </Button>
        </form>
      </div>
    </Modal>
  );
}
