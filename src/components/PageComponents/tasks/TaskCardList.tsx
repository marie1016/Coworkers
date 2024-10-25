import getTasks from "@/core/api/tasks/getTasks";
import { Task } from "@/core/dtos/tasks/tasks";
import { useSuspenseQuery } from "@tanstack/react-query";
import TaskCard from "@/components/PageComponents/tasks/TaskCard";

interface TaskCardListProps {
  groupId: string;
  selectedTaskListId: number;
  selectedDate: Date | null;
  onTaskItemChange: (task: Task) => void;
}

export default function TaskCardList({
  groupId,
  selectedTaskListId,
  selectedDate,
  onTaskItemChange,
}: TaskCardListProps) {
  const { data: tasksData } = useSuspenseQuery<Task[]>({
    queryKey: ["tasks", selectedTaskListId, selectedDate],
    queryFn: () =>
      getTasks({
        groupId,
        id: selectedTaskListId,
        date: selectedDate,
      }),
  });

  const taskItems = tasksData ?? [];

  return taskItems.length > 0 ? (
    <div>
      {taskItems.map((taskItem) => (
        <TaskCard
          key={taskItem.id}
          taskItem={taskItem}
          onTaskItemChange={onTaskItemChange}
        />
      ))}
    </div>
  ) : (
    <div className="mt-80 text-center text-text-md text-text-default sm:mt-48">
      <p>아직 할 일이 없습니다.</p>
      <p>할 일을 추가해주세요.</p>
    </div>
  );
}
