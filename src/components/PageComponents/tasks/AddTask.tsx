import Input from "@/components/@shared/UI/Input";
import InputLabel from "@/components/@shared/UI/InputLabel";
import React, { useState } from "react";
import moment from "moment";
import Button from "@/components/@shared/UI/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FrequencyDropdown from "./FrequencyDropdown";
import "react-calendar/dist/Calendar.css";
import FrequencyDay from "./FrequencyDay";
import FrequencyDate from "./FrequencyDate";

interface AddTaskProps {
  onCloseAddTask: () => void;
}

export default function AddTask({ onCloseAddTask }: AddTaskProps) {
  const [taskData, setTaskData] = useState({
    title: "",
    frequency: "",
    description: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(
    null,
  );

  const handleInputChange = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleFrequencyChange = (value: string) => {
    setTaskData({ ...taskData, frequency: value });
    setSelectedFrequency(value);
  };

  const handleFormSubmit = () => {
    onCloseAddTask();
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
  };

  const formattedNewDate = moment(new Date()).format("yyyy년 MM월 DD일");

  return (
    <div className="h-auto w-[24rem] px-6 py-8">
      <h2 className="text-center text-text-lg text-text-primary">
        할 일 만들기
      </h2>
      <p className="mb-6 mt-4 text-center text-text-md text-text-default">
        할 일은 실제로 행동 가능한 작업 중심으로 <br />
        작성해주시면 좋습니다.
      </p>
      <form
        className="flex flex-col items-center gap-6"
        onSubmit={handleFormSubmit}
      >
        <InputLabel className="text-md text-text-primary" label="할 일 제목">
          <Input
            name="title"
            type="text"
            value={taskData.title}
            onChange={handleInputChange}
            className="w-[21rem]"
            placeholder="할 일 제목을 입력해주세요"
          />
        </InputLabel>
        <InputLabel
          className="text-md text-text-primary"
          label="시작 날짜 및 시간"
        >
          <DatePicker
            className="h-12 w-[21rem] rounded-xl border-border-primary bg-background-secondary text-text-primary placeholder:text-text-default hover:border-interaction-hover focus:border-interaction-hover focus:outline-none focus:ring-0"
            onChange={handleDateChange}
            selected={selectedDate}
            showTimeSelect
            placeholderText={`${formattedNewDate} 00:00`}
            dateFormat="yyyy년 MM월 dd일 HH:mm aa"
            timeFormat="HH:mm aa"
            timeIntervals={30}
          />
        </InputLabel>
        <InputLabel className="text-md text-text-primary" label="반복 설정">
          <FrequencyDropdown onChange={handleFrequencyChange} />
        </InputLabel>
        {selectedFrequency === "WEEKLY" && <FrequencyDay />}
        {selectedFrequency === "MONTHLY" && <FrequencyDate />}
        <InputLabel className="text-md text-text-primary" label="할 일 메모">
          <textarea
            onInput={handleInput}
            className="h-auto w-full resize-none overflow-hidden rounded-xl border-border-primary bg-background-secondary p-4 placeholder:text-text-default hover:border-interaction-hover focus:border-interaction-hover focus:outline-none focus:ring-0"
            placeholder="메모를 입력해주세요."
          />
        </InputLabel>
        <Button variant="solid" size="large" onClick={handleFormSubmit}>
          만들기
        </Button>
      </form>
    </div>
  );
}
