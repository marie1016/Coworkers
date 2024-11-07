import { Task } from "@/core/dtos/tasks/tasks";
import Image from "next/image";
import { useEffect } from "react";
import { motion } from "framer-motion";
import FloatingButton from "@/components/@shared/UI/FloatingButton";
import usePatchTaskDone from "@/lib/hooks/tasks/usePatchTaskDone";
import useClickOutside from "@/lib/hooks/useClickOutSide";
import useModalStore from "@/lib/hooks/stores/modalStore";
import TaskComments from "./TaskComments";
import TaskInfo from "./TaskInfo";
import CommentTextarea from "./CommentTextarea";

interface TaskDetailProps {
  selectedDate: Date | null;
  taskItem: Task;
  setSelectedTaskItem: React.Dispatch<React.SetStateAction<Task | null>>;
  closeTaskDetail: () => void;
  openEditTaskModal: () => void;
  openDeleteTaskModal: () => void;
}
export default function TaskDetail({
  selectedDate,
  taskItem,
  setSelectedTaskItem,
  closeTaskDetail,
  openEditTaskModal,
  openDeleteTaskModal,
}: TaskDetailProps) {
  const { doneAt, id } = taskItem;
  const { handleClick } = usePatchTaskDone(id, doneAt, selectedDate);

  const modalName = "taskDetail";
  const isOpen = useModalStore((state) => state.modals[modalName] || false);

  const ref = useClickOutside(closeTaskDetail);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const checked = doneAt ? null : new Date().toISOString();
    handleClick(!!checked);
    setSelectedTaskItem({ ...taskItem, doneAt: checked });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeTaskDetail();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, closeTaskDetail]);

  if (!isOpen) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-10 bg-opacity-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div
        className="taskDetail fixed right-0 top-0 z-20 h-full w-[48.69rem] overflow-y-auto border-l border-border-primary bg-background-secondary pb-16 pt-[6rem] sm:w-full sm:px-4 sm:pt-20 md:w-[27.19rem] md:px-6 md:pt-[5.25rem] [&&]:lg:px-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        ref={ref}
      >
        <Image
          className="mb-4 cursor-pointer"
          src="/icons/icon-x.svg"
          width={24}
          height={24}
          alt="닫기 아이콘"
          onClick={closeTaskDetail}
        />
        <TaskInfo
          taskItem={taskItem}
          doneAt={doneAt}
          openTaskFormModal={openEditTaskModal}
          deleteTask={openDeleteTaskModal}
          selectedDate={selectedDate}
        />
        <div className="my-4 text-text-md text-text-primary">
          <CommentTextarea taskItem={taskItem} />
          <TaskComments taskItem={taskItem} />
        </div>
        <FloatingButton
          onClick={handleButtonClick}
          className="fixed bottom-8 right-8 flex items-center gap-1"
          variant={doneAt ? "outlined" : "solid"}
          size="medium"
        >
          <Image
            src={
              doneAt
                ? "/icons/icon-check_green.svg"
                : "/icons/icon-check_white.svg"
            }
            width={16}
            height={16}
            alt="완료 체크 아이콘"
          />
          <span className={doneAt ? "text-brand-primary" : "text-text-inverse"}>
            {doneAt ? "완료 취소하기" : "완료하기"}
          </span>
        </FloatingButton>
      </motion.div>
    </motion.div>
  );
}
