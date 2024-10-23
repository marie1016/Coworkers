import { Task } from "@/core/dtos/tasks/tasks";
import Checkbox from "@/components/@shared/UI/Checkbox";
import Image from "next/image";
import { useState } from "react";
import moment from "moment";
import "moment/locale/ko";
import EditDropdown from "./EditDropdown";

interface TaskCardProps {
  taskItem: Task;
  openAddTask: () => void;
}

export default function TaskCard({
  taskItem: initialTask,
  openAddTask,
}: TaskCardProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const { name, commentCount, frequency } = task;

  const handleCheckboxChange = (checked: boolean) => {
    const updateTask = { ...task, checked };
    setTask(updateTask);
  };

  const formattedDate = moment(task.date).format("yy년 MM월 DD일");

  return (
    <div className="w-1200 mt-4 h-20 rounded-lg bg-background-secondary px-4 py-3 text-text-xs font-regular text-text-default">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Checkbox
            title={name}
            checked={task.checked}
            onChange={handleCheckboxChange}
          />
          <Image
            className="ml-3 mr-0.5 sm:ml-12"
            src="/icons/icon-comment.svg"
            width={16}
            height={16}
            alt="댓글 아이콘"
          />
          {commentCount}
        </div>
        <div>
          <EditDropdown onEdit={openAddTask} />
        </div>
      </div>
      <div className="mt-2.5 flex items-center">
        <Image
          className="mr-1.5"
          src="/icons/icon-cardCalendar.svg"
          width={16}
          height={16}
          alt="카드캘린더 아이콘"
        />
        {formattedDate}
        <span className="mx-2.5 h-2 border-l border-background-tertiary" />
        <Image
          className="mr-1.5"
          src="/icons/icon-repeat.svg"
          width={16}
          height={16}
          alt="반복 아이콘"
        />
        {frequency}
      </div>
    </div>
  );
}
