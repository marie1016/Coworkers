import Image from "next/image";

interface CheckboxProps {
  title: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function Checkbox({ title, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />
      <Image
        src={checked ? "/icons/icon-faCheck.png" : "/icons/icon-faSquare.png"}
        width={24}
        height={24}
        alt="체크박스 아이콘"
      />
      <div className={`text-md font-regular ${checked ? "line-through" : ""}`}>
        {title}
      </div>
    </label>
  );
}
