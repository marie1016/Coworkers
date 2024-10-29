import Image from "next/image";

interface CheckboxProps {
  title: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onTitleClick?: () => void;
}

export default function Checkbox({
  title,
  checked,
  onChange,
  onTitleClick,
}: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={checked ? "/icons/icon-faCheck.svg" : "/icons/icon-faSquare.svg"}
        width={24}
        height={24}
        alt="체크박스 아이콘"
        onClick={(e) => {
          e.stopPropagation();
          onChange(!checked);
        }}
      />
      <div
        className={`cursor-pointer text-text-md font-regular text-text-primary hover:underline ${checked ? "line-through" : ""}`}
        onClick={() => {
          if (onTitleClick) onTitleClick();
        }}
      >
        {title}
      </div>
    </div>
  );
}
