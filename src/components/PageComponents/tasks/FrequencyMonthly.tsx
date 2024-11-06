import InputLabel from "@/components/@shared/UI/InputLabel";
import Input from "@/components/@shared/UI/Input";

interface FrequencyMonthlyProps {
  selectedMonthDay: number;
  setSelectedMonthDay: React.Dispatch<React.SetStateAction<number>>;
}

export default function FrequencyMonthly({
  selectedMonthDay,
  setSelectedMonthDay,
}: FrequencyMonthlyProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setSelectedMonthDay(value);
  };

  return (
    <InputLabel className="text-md text-text-primary" label="반복 일자">
      <Input
        name="frequencyDate"
        type="number"
        value={selectedMonthDay}
        onChange={handleInputChange}
        className="w-[21rem]"
        placeholder="반복 일자를 입력해주세요."
      />
    </InputLabel>
  );
}
