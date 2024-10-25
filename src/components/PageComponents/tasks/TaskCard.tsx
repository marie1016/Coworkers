import { Task } from "@/core/dtos/tasks/tasks";
import Checkbox from "@/components/@shared/UI/Checkbox";
import Image from "next/image";
import { useState } from "react";
import { formattedDate } from "@/lib/utils/date";
import useModalStore from "@/store/modalStore";
import EditDropdown from "./EditDropdown";
import TaskDetail from "./TaskDetail";

interface TaskCardProps {
  taskItem: Task;
  onTaskItemChange: (task: Task) => void;
}

export default function TaskCard({
  taskItem,
  onTaskItemChange,
}: TaskCardProps) {
  const [task, setTask] = useState<Task>(taskItem);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const { name, commentCount, frequency } = task;

  const handleCheckboxChange = (checked: boolean) => {
    const updateTask = { ...task, checked };
    setTask(updateTask);
  };

  const openTaskDetail = () => {
    setIsTaskDetailOpen(true);
  };

  const closeTaskDetail = () => {
    setIsTaskDetailOpen(false);
  };

  const openModal = useModalStore((state) => state.openModal);

  const openTaskFormModal = (taskData: Task) => {
    onTaskItemChange(taskData);
    openModal("taskFormModal");
    closeTaskDetail();
  };

  return (
    <>
      <div className="w-1200 mt-4 h-20 rounded-lg bg-background-secondary px-4 py-3 text-text-xs font-regular text-text-default">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox
              title={name}
              checked={task.checked}
              onChange={handleCheckboxChange}
              titleOnClick={openTaskDetail}
            />
            <Image
              className="ml-3 mr-0.5 sm:ml-12"
              src="/icons/icon-comment.svg"
              width={16}
              height={16}
              alt="댓글 아이콘"
            />
            {commentCount}
          </div>
          <EditDropdown onEdit={() => openTaskFormModal(task)} />
        </div>
        <div className="mt-2.5 flex items-center">
          <Image
            className="mr-1.5"
            src="/icons/icon-cardCalendar.svg"
            width={16}
            height={16}
            alt="카드캘린더 아이콘"
          />
          {formattedDate(task.date)}
          <span className="mx-2.5 h-2 border-l border-background-tertiary" />
          <Image
            className="mr-1.5"
            src="/icons/icon-repeat.svg"
            width={16}
            height={16}
            alt="반복 아이콘"
          />
          {frequency}
        </div>
      </div>
      {isTaskDetailOpen && (
        <TaskDetail
          taskItem={task}
          isTaskDetailOpen={isTaskDetailOpen}
          onCloseTaskDetail={closeTaskDetail}
          openTaskFormModal={() => openTaskFormModal(task)}
        />
      )}
    </>
  );
}
