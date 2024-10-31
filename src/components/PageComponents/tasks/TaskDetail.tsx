import { Task } from "@/core/dtos/tasks/tasks";
import Image from "next/image";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import FloatingButton from "@/components/@shared/UI/FloatingButton";
import usePatchTaskDone from "@/lib/hooks/tasks/usePatchTaskDone";
import TaskComments from "./TaskComments";
import TaskInfo from "./TaskInfo";
import CommentTextarea from "./CommentTextarea";

interface TaskDetailProps {
  taskItem: Task;
  isTaskDetailOpen: boolean;
  closeTaskDetail: () => void;
  openEditTaskModal: () => void;
  openDeleteTaskModal: () => void;
  taskDetailRef: React.ForwardedRef<HTMLDivElement>;
  outSideClick: (e: React.MouseEvent) => void;
}
export default function TaskDetail({
  taskItem,
  isTaskDetailOpen,
  closeTaskDetail,
  openEditTaskModal,
  openDeleteTaskModal,
  taskDetailRef,
  outSideClick,
}: TaskDetailProps) {
  const { doneAt, id } = taskItem;
  const { handleClick } = usePatchTaskDone(id);

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
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTaskDetailOpen, closeTaskDetail]);

  if (!isTaskDetailOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50"
      ref={taskDetailRef}
      onClick={(e) => outSideClick(e)}
    >
      <div className="z-100 fixed right-0 top-0 h-full w-[48.69rem] border-l border-border-primary bg-background-secondary p-10 sm:w-full md:w-[27.19rem]">
        <div className="relative h-full">
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
            className="absolute bottom-10 right-10 right-4 right-6 flex items-center gap-1 sm:bottom-6 md:bottom-5"
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
            <span
              className={doneAt ? "text-brand-primary" : "text-text-inverse"}
            >
              {doneAt ? "완료 취소하기" : "완료하기"}
            </span>
          </FloatingButton>
        </div>
      </div>
    </div>
  );
}
