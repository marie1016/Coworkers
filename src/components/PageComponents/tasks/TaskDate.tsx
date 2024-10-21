import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { SelectedDate } from "@/core/api/tasks/getTasks";

interface DateProps {
  selectedDate: SelectedDate;
  setSelectedDate: React.Dispatch<React.SetStateAction<SelectedDate>>;
}

export default function TaskDate({ selectedDate, setSelectedDate }: DateProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const formattedDate =
    selectedDate instanceof Date &&
    moment(selectedDate).format("MM월 DD일 (ddd)");

  return (
    <div className="flex items-center">
      <h2 className="mr-3 text-text-lg font-medium text-text-primary">
        {formattedDate}
      </h2>
      <Image
        src="/icons/icon-leftArrow.svg"
        width={16}
        height={16}
        alt="왼쪽 버튼 아이콘"
      />
      <Image
        className="ml-1"
        src="/icons/icon-rightArrow.svg"
        width={16}
        height={16}
        alt="오른쪽 버튼 아이콘"
      />
      <Image
        className="ml-3"
        src="/icons/icon-calendar.svg"
        width={24}
        height={24}
        alt="캘린더 아이콘"
        onClick={toggleCalendar}
      />
      {isCalendarOpen && (
        <Calendar
          className="text-text-md"
          onChange={setSelectedDate}
          value={selectedDate}
        />
      )}
    </div>
  );
}
