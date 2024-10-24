import getTaskComments from "@/core/api/tasks/getTaskComments";
import { Task, TaskComment } from "@/core/dtos/tasks/tasks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { formattedShortDate } from "@/lib/utils/date";
import Image from "next/image";
import EditDropdown from "./EditDropdown";

interface TaskCommentsProps {
  selectedTaskItem: Task;
}

export default function TaskComments({ selectedTaskItem }: TaskCommentsProps) {
  const { id } = selectedTaskItem;
  const { data: commentsData } = useSuspenseQuery<TaskComment[]>({
    queryKey: ["taskComments", id],
    queryFn: () => getTaskComments(id),
  });

  const taskComments = commentsData ?? [];

  return (
    <ul>
      {taskComments.map((taskComment) => (
        <li key={taskComment.id} className="mt-4">
          <div className="flex items-center justify-between">
            <span>{taskComment.content}</span>
            <EditDropdown />
          </div>
          <div className="my-4 flex items-center">
            <Image
              className="mr-3"
              src={taskComment.user.image ?? "/images/image-defaultProfile.png"}
              width={32}
              height={32}
              alt="프로필 이미지"
            />
            <span className="shrink grow basis-auto">
              {taskComment.user.nickname}
            </span>
            <span className="text-text-secondary">
              {formattedShortDate(taskComment.updatedAt)}
            </span>
          </div>
          <hr className="border-t border-border-primary" />
        </li>
      ))}
    </ul>
  );
}
