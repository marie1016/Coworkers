import { Task } from "@/core/dtos/tasks/tasks";
import Image from "next/image";
import moment from "moment";
import "moment/locale/ko";
import EditDropdown from "./EditDropdown";

interface TaskInfoProps {
  selectedTaskItem: Task;
}

export default function TaskInfo({ selectedTaskItem }: TaskInfoProps) {
  const { name, writer, updatedAt, date, frequency, description } =
    selectedTaskItem;

  const formattedUpdatedAt = moment(updatedAt).format("yy.MM.DD");
  const formattedDate = moment(date).format("yy년 MM월 DD일");

  let hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();

  const period = hours >= 12 ? "오후" : "오전";
  hours = hours % 12 || 12;

  const timeString = `${period} ${hours}시 ${minutes}분`;

  const WRITER_IMAGE = writer.image ?? "/images/image-defaultProfile.png";

  return (
    <>
      <div className="my-4 flex items-center justify-between">
        <span className="text-text-xl text-text-primary">{name}</span>
        <EditDropdown />
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center justify-between gap-2">
          <Image
            src={WRITER_IMAGE}
            width={32}
            height={32}
            alt="프로필 이미지"
          />
          <span className="text-text-md text-text-primary">
            {writer.nickname}
          </span>
        </span>
        <span className="text-text-md text-text-secondary">
          {formattedUpdatedAt}
        </span>
      </div>
      <div className="mb-6 mt-4 flex items-center text-text-xs text-text-default">
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
      <p className="h-40 text-text-md text-text-primary">{description}</p>
    </>
  );
}
