import { Task } from "@/core/dtos/tasks/tasks";
import Image from "next/image";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import TaskComments from "./TaskComments";
import TaskInfo from "./TaskInfo";
import CommentTextarea from "./CommentTextarea";

interface TaskDetailProps {
  selectedTaskItem: Task;
  isTaskDetailOpen: boolean;
  onCloseTaskDetail: () => void;
  openTaskFormModal: (selectedTaskItem: Task) => void;
}
export default function TaskDetail({
  selectedTaskItem,
  isTaskDetailOpen,
  onCloseTaskDetail,
  openTaskFormModal,
}: TaskDetailProps) {
  if (!isTaskDetailOpen) {
    return null;
  }

  return (
    <div className="fixed right-0 top-0 h-full w-[48.69rem] border-l border-border-primary bg-background-secondary p-10 sm:w-full md:w-[27.19rem]">
      <Image
        src="/icons/icon-x.svg"
        width={24}
        height={24}
        alt="닫기 아이콘"
        onClick={onCloseTaskDetail}
      />
      <TaskInfo
        selectedTaskItem={selectedTaskItem}
        openTaskFormModal={() => openTaskFormModal(selectedTaskItem)}
      />
      <div className="mt-4 text-text-md text-text-primary">
        <CommentTextarea />
        <ErrorBoundary fallback={<div>error</div>}>
          <Suspense fallback={<div>loading...</div>}>
            <TaskComments selectedTaskItem={selectedTaskItem} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
