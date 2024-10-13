import { ReactNode } from "react";

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
  return (
    <li className={`cursor-pointer ${itemClassName}`}>
      <button onClick={onClick}>{children}</button>
    </li>
  );
}
