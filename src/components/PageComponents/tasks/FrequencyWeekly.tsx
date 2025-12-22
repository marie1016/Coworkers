import InputLabel from "@/components/@shared/UI/InputLabel";

interface FrequencyWeeklyProps {
  selectedWeekDays: number[];
  setSelectedWeekDays: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function FrequencyWeekly({
  selectedWeekDays,
  setSelectedWeekDays,
}: FrequencyWeeklyProps) {
  const dayOptions = [
    { label: "일", value: 0 },
    { label: "월", value: 1 },
    { label: "화", value: 2 },
    { label: "수", value: 3 },
    { label: "목", value: 4 },
    { label: "금", value: 5 },
    { label: "토", value: 6 },
  ];

  const handleDayClick = (day: number) => {
    setSelectedWeekDays((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      }
      return [...prev, day];
    });
  };

  return (
    <InputLabel className="text-md text-text-primary" label="반복 요일">
      <ul className="flex items-center justify-between">
        {dayOptions.map((dayOption) => (
          <li
            className={`flex h-12 w-[2.75rem] items-center justify-center rounded-xl ${selectedWeekDays.includes(dayOption.value) ? "bg-brand-primary" : "bg-[#18212F]"}`}
            key={dayOption.label}
            onClick={() => handleDayClick(dayOption.value)}
          >
            {dayOption.label}
          </li>
        ))}
      </ul>
    </InputLabel>
  );
}
