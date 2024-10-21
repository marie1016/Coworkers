import getTaskComments from "@/core/api/tasks/getTaskComments";
import { Task, TaskComment } from "@/core/dtos/tasks/tasks";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import moment from "moment";
import EditDropdown from "./EditDropdown";

interface TaskCommentsProps {
  selectedTaskItem: Task;
}

export default function TaskComments({ selectedTaskItem }: TaskCommentsProps) {
  const { id } = selectedTaskItem;
  const {
    data: commentsData,
    isLoading: loadingComments,
    isError: commentsError,
  } = useQuery<TaskComment[]>({
    queryKey: ["taskComments", id],
    queryFn: () => getTaskComments(id),
  });

  const taskComments = commentsData ?? [];

  const formattedDate = (date: Date) => moment(date).format("YY.MM.DD");

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  if (loadingComments) return <div>Loading...</div>;
  if (commentsError) return <div>Error</div>;

  return (
    <div className="mt-4 text-text-md text-text-primary">
      <div className="relative">
        <textarea
          onInput={handleInput}
          className="h-auto w-full resize-none overflow-hidden rounded-none border-b border-l-0 border-r-0 border-border-primary bg-background-secondary py-4 pl-0 pr-8 text-text-md outline-none placeholder:text-text-md placeholder:text-text-primary"
          placeholder="댓글을 입력하세요."
        />
        <Image
          src="/icons/icon-enter_gray.svg"
          width={24}
          height={24}
          alt="인풋 엔터 버튼"
          className="absolute right-0 top-3"
        />
      </div>
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
                src={
                  taskComment.user.image ?? "/images/image-defaultProfile.png"
                }
                width={32}
                height={32}
                alt="프로필 이미지"
              />
              <span className="shrink grow basis-auto">
                {taskComment.user.nickname}
              </span>
              <span className="text-text-secondary">
                {formattedDate(taskComment.updatedAt)}
              </span>
            </div>
            <hr className="border-t border-border-primary" />
          </li>
        ))}
      </ul>
    </div>
  );
}
