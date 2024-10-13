import useClickOutside from "@/lib/hooks/useClickOutSide";
import { ReactNode, useState } from "react";

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

  return (
    <div ref={dropDownRef} className="relative">
      <button type="button" onClick={toggleDropdown}>
        {trigger}
      </button>
      {isOpen && (
        <ul className={`${menuClassName} absolute rounded-xl`}>{children}</ul>
      )}
    </div>
  );
}
