import InputLabel from "@/components/@shared/UI/InputLabel";

export default function FrequencyDay() {
  const dayOptions = [
    { label: "일" },
    { label: "월" },
    { label: "화" },
    { label: "수" },
    { label: "목" },
    { label: "금" },
    { label: "토" },
  ];
  return (
    <InputLabel className="text-md text-text-primary" label="반복 요일">
      <ul className="flex items-center justify-between">
        {dayOptions.map((dayOption) => (
          <li
            className="flex h-12 w-[2.75rem] items-center justify-center rounded-xl bg-[#18212F]"
            key={dayOption.label}
          >
            {dayOption.label}
          </li>
        ))}
      </ul>
    </InputLabel>
  );
}
