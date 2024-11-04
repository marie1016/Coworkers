import Dropdown from "@/components/@shared/UI/Dropdown";
import DropdownItem from "@/components/@shared/UI/Item";
import Image from "next/image";

interface EditDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

interface Option {
  label: string;
}

export default function EditDropdown({ onEdit, onDelete }: EditDropdownProps) {
  const handleSelect = (e: React.MouseEvent, option: Option) => {
    e.stopPropagation();
    if (option.label === "수정하기") {
      onEdit();
      return;
    }
    onDelete();
  };

  const options: Option[] = [{ label: "수정하기" }, { label: "삭제하기" }];

  return (
    <Dropdown
      menuClassName="w-32  right-0 top-6 border border-border-primary bg-background-secondary"
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
          onClick={(e) => handleSelect(e, option)}
          itemClassName="py-3 px-8 text-center text-text-primary"
        >
          {option.label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}
