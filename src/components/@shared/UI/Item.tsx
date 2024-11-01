import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface DropdownItemProps {
  children: ReactNode;
  onClick: () => void;
  itemClassName?: string;
}

export default function DropdownItem({
  children,
  onClick,
  itemClassName,
}: DropdownItemProps) {
  const classCombined = twMerge("cursor-pointer", itemClassName);

  return (
    <li className={classCombined} onClick={onClick}>
      {children}
    </li>
  );
}
