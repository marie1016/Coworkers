import { Task } from "@/core/dtos/tasks/tasks";
import Image from "next/image";
import {
  formattedDate,
  formattedShortDate,
  formattedTime,
} from "@/lib/utils/date";

import "moment/locale/ko";
import EditDropdown from "./EditDropdown";

interface TaskInfoProps {
  taskItem: Task;
  openTaskFormModal: () => void;
  deleteTask: () => void;
}

export default function TaskInfo({
  taskItem,
  openTaskFormModal,
  deleteTask,
}: TaskInfoProps) {
  const { name, writer, updatedAt, date, frequency, description, doneAt } =
    taskItem;

  const timeString = formattedTime(new Date(date));

  const writerImage = writer.image ?? "/images/image-defaultProfile.png";

  return (
    <>
      {doneAt && (
        <div className="my-3 flex items-center gap-1.5">
          <Image
            src="/icons/icon-check_green.svg"
            width={16}
            height={16}
            alt="완료 체크 아이콘"
          />
          <span className="text-text-xs text-brand-tertiary">완료</span>
        </div>
      )}
      <section className="my-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span
            className={`text-text-xl text-text-primary ${doneAt ? "line-through" : ""}`}
          >
            {name}
          </span>
          <EditDropdown onEdit={openTaskFormModal} onDelete={deleteTask} />
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center justify-between gap-2">
            <Image
              src={writerImage}
              width={32}
              height={32}
              alt="프로필 이미지"
            />
            <span className="text-text-md text-text-primary">
              {writer.nickname}
            </span>
          </span>
          <span className="text-text-md text-text-secondary">
            {formattedShortDate(updatedAt)}
          </span>
        </div>
        <div className="flex items-center text-text-xs text-text-default">
          <Image
            className="mr-1.5"
            src="/icons/icon-cardCalendar.svg"
            width={16}
            height={16}
            alt="카드캘린더 아이콘"
          />
          {formattedDate(date)}
          <span className="mx-2.5 h-2 border-l border-background-tertiary" />
          <Image
            className="mr-1.5"
            src="/icons/icon-time.svg"
            width={16}
            height={16}
            alt="시계 아이콘"
          />
          {timeString}
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
      </section>
      <p className="my-6 h-40 text-text-md text-text-primary">{description}</p>
    </>
  );
}
