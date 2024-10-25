import Image from "next/image";

interface CheckboxProps {
  title: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  titleOnClick?: () => void;
}

export default function Checkbox({
  title,
  checked,
  onChange,
  titleOnClick,
}: CheckboxProps) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          e.stopPropagation();
        }}
        className="hidden"
      />
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
          if (titleOnClick) titleOnClick();
        }}
      >
        {title}
      </div>
    </label>
  );
}
