import useClickOutside from "@/lib/hooks/useClickOutSide";
import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

interface DropdownProps {
  children: ReactNode;
  trigger: ReactNode;
  menuClassName?: string;
  disabled?: boolean;
}

export default function Dropdown({
  trigger,
  children,
  menuClassName,
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const dropDownRef = useClickOutside(handleClose);
  const menuClassCombined = twMerge("absolute rounded-xl z-10", menuClassName);

  return (
    <div ref={dropDownRef} className="relative flex items-center">
      <button type="button" onClick={toggleDropdown} disabled={disabled}>
        {trigger}
      </button>
      {isOpen && <ul className={menuClassCombined}>{children}</ul>}
    </div>
  );
}
