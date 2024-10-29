import { useQuery } from "@tanstack/react-query";
import getTeamData from "@/core/api/group/getTeamData";

interface TaskListsProps {
  teamId: string;
  selectedTaskListId: number | null;
  onTaskListClick: (taskListId: number) => void;
}

export default function TaskLists({
  teamId,
  selectedTaskListId,
  onTaskListClick,
}: TaskListsProps) {
  const groupResponse = useQuery({
    queryKey: ["group", teamId],
    queryFn: () => getTeamData(teamId),
    staleTime: 1000 * 60,
    enabled: !!teamId,
  });

  const group = groupResponse.data?.data;
  const taskLists = group?.taskLists ?? [];

  return taskLists.length > 0 ? (
    <ul className="flex items-center gap-3">
      {taskLists.map((taskList) => (
        <li
          key={taskList.id}
          onClick={() => onTaskListClick(taskList.id)}
          className={`text-text-lg font-medium ${selectedTaskListId === taskList.id ? "text-text-tertiary underline" : "text-text-default"}`}
        >
          {taskList.name}
        </li>
      ))}
    </ul>
  ) : (
    <div className="mt-text-center mt-96 text-text-md text-text-default sm:mt-56">
      <p>아직 할 일 목록이 없습니다.</p>
      <p>새로운 목록을 추가해보세요.</p>
    </div>
  );
}
