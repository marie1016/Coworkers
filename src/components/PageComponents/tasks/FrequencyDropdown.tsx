import Dropdown from "@/components/@shared/UI/Dropdown";
import DropdownItem from "@/components/@shared/UI/Item";
import Image from "next/image";
import { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface FrequencyDropdownProps {
  onChange: (value: string) => void;
  editModeFrequency?: string;
}

export default function FrequencyDropdown({
  onChange,
  editModeFrequency,
}: FrequencyDropdownProps) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
  };

  const options: Option[] = [
    { label: "한 번", value: "ONCE" },
    { label: "매일", value: "DAILY" },
    { label: "주 반복", value: "WEEKLY" },
    { label: "월 반복", value: "MONTHLY" },
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
              ? selectedOption.label
              : (editModeFrequency ?? "반복 안함")}
          </span>
          <Image
            src="/icons/icon-toggle.svg"
            width={24}
            height={24}
            alt="토글 아이콘"
          />
        </div>
      }
      disabled={!!editModeFrequency}
    >
      {options.map((option) => (
        <DropdownItem
          key={option.label}
          onClick={() => handleSelect(option)}
          itemClassName="py-3 px-4 text-left text-text-md"
        >
          {option.label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}
