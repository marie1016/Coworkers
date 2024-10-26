import { GroupTask } from "@/core/dtos/group/group";
import Link from "next/link";

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
      <Link href={`${teamId}/tasks?tasklist=${task.id}`} key={task.id}>
        <div className="relative flex h-10 items-center rounded-xl bg-background-secondary px-6 text-text-md font-medium text-text-primary">
          <div className={indexClassName} />
          {task.name}
        </div>
      </Link>
    );
  });
}
