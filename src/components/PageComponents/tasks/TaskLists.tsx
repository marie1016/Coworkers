import { useQuery } from "@tanstack/react-query";
import getTeamData from "@/core/api/group/getTeamData";
import Link from "next/link";
import { GroupResponse } from "@/core/dtos/group/group";
import TaskListSkeleton from "./TaskListSkeleton";
import TaskError from "./TaskError";

interface TaskListsProps {
  teamId: string;
  selectedTaskListId: number;
  onTaskListClick: (taskListId: number) => void;
}

export default function TaskLists({
  teamId,
  selectedTaskListId,
  onTaskListClick,
}: TaskListsProps) {
  const {
    data: groupResponse,
    isPending,
    isError,
  } = useQuery<GroupResponse>({
    queryKey: ["group", teamId],
    queryFn: () => getTeamData(teamId),
    staleTime: 1000 * 60,
    enabled: !!teamId,
  });

  if (isError) {
    return <TaskError />;
  }

  if (isPending) {
    return <TaskListSkeleton />;
  }

  const group = groupResponse;
  const taskLists = group?.taskLists;

  if (taskLists?.length === 0) {
    return (
      <div className="mx-auto mt-96 text-center text-text-md text-text-default sm:mt-56">
        <p>아직 할 일 목록이 없습니다.</p>
        <p>새로운 목록을 추가해보세요.</p>
      </div>
    );
  }

  return (
    <ul className="flex items-center gap-3">
      {taskLists?.map((taskList) => (
        <li
          key={taskList.id}
          onClick={() => onTaskListClick(taskList.id)}
          className={`text-text-lg font-medium ${selectedTaskListId === taskList.id ? "text-text-tertiary underline" : "text-text-default"}`}
        >
          <Link href={`/${teamId}/tasks?tasklist=${taskList.id}`}>
            {taskList.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
