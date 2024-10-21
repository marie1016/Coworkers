import InputLabel from "@/components/@shared/UI/InputLabel";
import Input from "@/components/@shared/UI/Input";
import { useState } from "react";

export default function FrequencyMonthly() {
  const [value, setValue] = useState();
  const handleInputChange = () => {
    setValue(value);
  };

  return (
    <InputLabel className="text-md text-text-primary" label="반복 일자">
      <Input
        name="frequencyDate"
        type="text"
        value={value}
        onChange={handleInputChange}
        className="w-[21rem]"
      />
    </InputLabel>
  );
}
