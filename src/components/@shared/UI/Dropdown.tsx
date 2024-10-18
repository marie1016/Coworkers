import useClickOutside from "@/lib/hooks/useClickOutSide";
import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

interface DropdownProps {
  children: ReactNode;
  trigger: ReactNode;
  menuClassName?: string;
}

export default function Dropdown({
  trigger,
  children,
  menuClassName,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const dropDownRef = useClickOutside(handleClose);
  const menuClassCombined = twMerge("absolute rounded-xl z-10", menuClassName);

  return (
    <div ref={dropDownRef} className="relative flex items-center">
      <button type="button" onClick={toggleDropdown}>
        {trigger}
      </button>
      {isOpen && <ul className={menuClassCombined}>{children}</ul>}
    </div>
  );
}
