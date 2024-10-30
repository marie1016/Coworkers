import { Task } from "@/core/dtos/tasks/tasks";
import Checkbox from "@/components/@shared/UI/Checkbox";
import Image from "next/image";
import { useRef, useState } from "react";
import { formattedDate } from "@/lib/utils/date";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import useModalStore from "@/lib/hooks/stores/modalStore";
import usePatchTaskDone from "@/lib/hooks/tasks/usePatchTaskDone";
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
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const { id, name, commentCount, frequency, doneAt, date } = taskItem;
  const router = useRouter();
  const teamId = router.query.teamId as string;
  const tasklist = router.query.tasklist as string;
  const { handleClick } = usePatchTaskDone(id);
  const taskDetailRef = useRef<HTMLDivElement>(null);

  const handleCheckboxChange = (checked: boolean) => {
    handleClick(checked);
  };

  const openTaskDetail = () => {
    setIsTaskDetailOpen(true);
    router.push(`/${teamId}/tasks?tasklist=${tasklist}&taskItem=${id}`);
  };

  const closeTaskDetail = () => {
    setIsTaskDetailOpen(false);
  };

  const outSideClick = (e: React.MouseEvent) => {
    if (taskDetailRef.current === e.target) {
      setIsTaskDetailOpen(false);
    }
  };

  const openModal = useModalStore((state) => state.openModal);

  const openEditTaskModal = (taskData: Task) => {
    onTaskItemChange(taskData);
    openModal("editTaskModal");
    closeTaskDetail();
  };

  const openDeleteTaskModal = (taskData: Task) => {
    onTaskItemChange(taskData);
    openModal("deleteTaskModal");
  };

  return (
    <>
      <div className="w-1200 mt-4 h-20 rounded-lg bg-background-secondary px-4 py-3 text-text-xs font-regular text-text-default">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox
              className="max-w-[62.5rem] sm:w-[13rem] md:max-w-[37.5rem]"
              title={name}
              checked={!!doneAt}
              onChange={handleCheckboxChange}
              onTitleClick={openTaskDetail}
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
          <EditDropdown
            onEdit={() => openEditTaskModal(taskItem)}
            onDelete={() => openDeleteTaskModal(taskItem)}
          />
        </div>
        <div className="mt-2.5 flex items-center">
          <Image
            className="mr-1.5"
            src="/icons/icon-cardCalendar.svg"
            width={16}
            height={16}
            alt="카드캘린더 아이콘"
          />
          {formattedDate(date)}
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
      <AnimatePresence>
        {isTaskDetailOpen && (
          <TaskDetail
            taskItem={taskItem}
            isTaskDetailOpen={isTaskDetailOpen}
            closeTaskDetail={closeTaskDetail}
            openEditTaskModal={() => openEditTaskModal(taskItem)}
            openDeleteTaskModal={() => openDeleteTaskModal(taskItem)}
            taskDetailRef={taskDetailRef}
            outSideClick={outSideClick}
          />
        )}
      </AnimatePresence>
    </>
  );
}
