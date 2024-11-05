import { TaskList, TaskListsResponse } from "@/core/dtos/tasks/tasks";
import { useQuery } from "@tanstack/react-query";
import getTaskLists from "@/core/api/tasks/getTaskLists";

interface TaskListsProps {
  groupId: string;
  selectedTaskListId: number | null;
  onTaskListClick: (taskListId: number) => void;
}

export default function TaskLists({
  groupId,
  selectedTaskListId,
  onTaskListClick,
}: TaskListsProps) {
  const { data: taskListsData } = useQuery<TaskListsResponse>({
    queryKey: ["taskLists", groupId],
    queryFn: () => getTaskLists(groupId),
    enabled: !!groupId,
    retry: 0,
  });

  const taskLists: TaskList[] = taskListsData?.taskLists ?? [];

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
