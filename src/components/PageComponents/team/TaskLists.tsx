import { GroupTask } from "@/core/dtos/group/group";
import Link from "next/link";
import TaskListMenu from "./TaskListMenu";

interface Props {
  tasks: GroupTask[];
  teamId: string;
}

export default function TaskLists({ tasks, teamId }: Props) {
  const indexColors = [
    "bg-point-purple",
    "bg-point-blue",
    "bg-point-cyan",
    "bg-point-pink",
    "bg-point-rose",
    "bg-point-orange",
    "bg-point-yellow",
  ];

  return tasks.map((task, index) => {
    const indexClassName = `h-full w-3 absolute left-0 rounded-l-xl ${indexColors[index % 7]}`;

    return (
      <div
        className="relative flex h-10 items-center justify-between rounded-xl bg-background-secondary pl-6 pr-2 text-text-md font-medium text-text-primary"
        key={task.id}
      >
        <div className={indexClassName} />
        <Link href={`${teamId}/tasks?task=${task.id}`}>{task.name}</Link>
        <TaskListMenu
          teamId={teamId}
          taskListId={`${task.id}`}
          name={task.name}
        />
      </div>
    );
  });
}
