import Dropdown from "@/components/@shared/UI/Dropdown";
import DropdownItem from "@/components/@shared/UI/Item";
import Image from "next/image";
import { useState } from "react";

interface Option {
  label: string;
}

export default function FrequencyDropdown() {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
  };

  const options: Option[] = [
    { label: "한 번" },
    { label: "매일" },
    { label: "주 반복" },
    { label: "월 반복" },
  ];

  return (
    <Dropdown
      menuClassName="w-28 left-0 top-12 border border-border-primary border-opacity-10"
      trigger={
        <div className="flex h-11 w-28 items-center justify-between px-1.5 py-2.5">
          <span>{selectedOption ? selectedOption.label : "반복 안함"}</span>
          <Image
            src="/icons/icon-toggle.png"
            width={24}
            height={24}
            alt="토글 아이콘"
          />
        </div>
      }
    >
      {options.map((option) => (
        <DropdownItem
          key={option.label}
          onClick={() => handleSelect(option)}
          itemClassName="py-3 px-4 text-left"
        >
          {option.label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}
