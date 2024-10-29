import TaskDate from "./TaskDate";

export interface DateProps {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

export default function SectionHeader({
  selectedDate,
  setSelectedDate,
}: DateProps) {
  return (
    <>
      <h1 className="text-text-xl font-bold text-text-primary">할 일</h1>
      <div className="my-6 flex items-center justify-between">
        <TaskDate
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <p className="text-text-md font-regular text-brand-primary">
          +새로운 목록 추가하기
        </p>
      </div>
    </>
  );
}
