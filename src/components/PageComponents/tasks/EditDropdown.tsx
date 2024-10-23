import Dropdown from "@/components/@shared/UI/Dropdown";
import DropdownItem from "@/components/@shared/UI/Item";
import Image from "next/image";

interface EditDropdownProps {
  onEdit: () => void;
}

interface Option {
  label: string;
}

export default function EditDropdown({ onEdit }: EditDropdownProps) {
  const handleSelect = (option: Option, e: React.MouseEvent) => {
    e.stopPropagation();
    if (option.label === "수정하기") {
      onEdit();
    }
  };

  const options: Option[] = [{ label: "수정하기" }, { label: "삭제하기" }];

  return (
    <Dropdown
      menuClassName="w-32 -right-3.5 border border-border-primary bg-background-secondary"
      trigger={
        <Image
          src="/icons/icon-kebab.svg"
          width={16}
          height={16}
          alt="케밥 아이콘"
        />
      }
    >
      {options.map((option) => (
        <DropdownItem
          key={option.label}
          onClick={(e: React.MouseEvent) => handleSelect(option, e)}
          itemClassName="py-3 px-8 text-center"
        >
          {option.label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}
