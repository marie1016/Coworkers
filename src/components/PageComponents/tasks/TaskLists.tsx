import { TaskList } from "@/core/dtos/tasks/tasks";

interface TaskListsProps {
  taskLists: TaskList[];
  selectedTaskListId: number | null;
  onHandleTaskListClick: (taskListId: number) => void;
}

export default function TaskLists({
  taskLists,
  selectedTaskListId,
  onHandleTaskListClick,
}: TaskListsProps) {
  return (
    <ul className="flex items-center gap-3">
      {taskLists.map((taskList) => (
        <li
          key={taskList.id}
          onClick={() => onHandleTaskListClick(taskList.id)}
          className={`text-text-lg font-medium ${selectedTaskListId === taskList.id ? "text-text-tertiary underline" : "text-text-default"}`}
        >
          {taskList.name}
        </li>
      ))}
    </ul>
  );
}
