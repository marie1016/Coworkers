import { Task } from "@/core/dtos/tasks/tasks";
import Image from "next/image";
import TaskComment from "./TaskComments";
import TaskInfo from "./TaskInfo";

interface TaskDetailProps {
  selectedTaskItem: Task;
  isTaskDetailOpen: boolean;
  onCloseTaskDetail: () => void;
}
export default function TaskDetail({
  selectedTaskItem,
  isTaskDetailOpen,
  onCloseTaskDetail,
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
      <TaskInfo selectedTaskItem={selectedTaskItem} />
      <TaskComment selectedTaskItem={selectedTaskItem} />
    </div>
  );
}
