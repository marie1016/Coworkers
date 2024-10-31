import { Task } from "@/core/dtos/tasks/tasks";
import Image from "next/image";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { motion } from "framer-motion";
import FloatingButton from "@/components/@shared/UI/FloatingButton";
import usePatchTaskDone from "@/lib/hooks/tasks/usePatchTaskDone";
import useClickOutside from "@/lib/hooks/useClickOutSide";
import TaskComments from "./TaskComments";
import TaskInfo from "./TaskInfo";
import CommentTextarea from "./CommentTextarea";

interface TaskDetailProps {
  taskItem: Task;
  isTaskDetailOpen: boolean;
  closeTaskDetail: () => void;
  openEditTaskModal: () => void;
  openDeleteTaskModal: () => void;
}
export default function TaskDetail({
  taskItem,
  isTaskDetailOpen,
  closeTaskDetail,
  openEditTaskModal,
  openDeleteTaskModal,
}: TaskDetailProps) {
  const { doneAt, id } = taskItem;
  const { handleClick } = usePatchTaskDone(id);
  const ref = useClickOutside(closeTaskDetail);

  const handleButtonClick = () => {
    const checked = doneAt ? null : new Date().toISOString();
    handleClick(!!checked);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeTaskDetail();
      }
    };

    if (isTaskDetailOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isTaskDetailOpen, closeTaskDetail]);

  if (!isTaskDetailOpen) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div
        className="z-100 fixed right-0 top-0 h-full w-[48.69rem] overflow-y-auto border-l border-border-primary bg-background-secondary p-10 sm:w-full md:w-[27.19rem]"
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
          openTaskFormModal={openEditTaskModal}
          deleteTask={openDeleteTaskModal}
        />
        <div className="mt-4 text-text-md text-text-primary">
          <CommentTextarea taskItem={taskItem} />
          <ErrorBoundary fallback={<div>error</div>}>
            <Suspense fallback={<div>loading...</div>}>
              <TaskComments taskItem={taskItem} />
            </Suspense>
          </ErrorBoundary>
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
