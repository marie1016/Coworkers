import Dropdown from "@/components/@shared/UI/Dropdown";
import DropdownItem from "@/components/@shared/UI/DropdownItem";
import Image from "next/image";
import { useState } from "react";
import {
  FrequencyType,
  getFrequencyLabel,
} from "@/lib/constants/frequencyType";

interface Option {
  value: FrequencyType;
}

interface FrequencyDropdownProps {
  onChange: (value: FrequencyType) => void;
}

export default function FrequencyDropdown({
  onChange,
}: FrequencyDropdownProps) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
  };

  const options: Option[] = [
    { value: FrequencyType.ONCE },
    { value: FrequencyType.DAILY },
    { value: FrequencyType.WEEKLY },
    { value: FrequencyType.MONTHLY },
  ];

  return (
    <Dropdown
      menuClassName="w-28 left-0 top-12 border border-border-primary bg-background-secondary"
      trigger={
        <div className="flex h-[2.75rem] w-[6.81rem] items-center justify-between rounded-xl bg-[#18212F] px-3 py-3 text-text-md">
          <span
            className={
              selectedOption ? "text-text-primary" : "text-text-default"
            }
          >
            {selectedOption
              ? getFrequencyLabel(selectedOption.value)
              : "반복 안함"}
          </span>
          <Image
            src="/icons/icon-toggle.svg"
            width={24}
            height={24}
            alt="토글 아이콘"
          />
        </div>
      }
    >
      {options.map((option) => (
        <DropdownItem
          key={getFrequencyLabel(option.value)}
          onClick={() => handleSelect(option)}
          itemClassName="py-3 px-4 text-left text-text-md"
        >
          {getFrequencyLabel(option.value)}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}
