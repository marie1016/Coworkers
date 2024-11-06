import { LabelHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
}

export default function InputLabel({
  className,
  label,
  children,
  ...props
}: Props) {
  const classCombined = twMerge(
    "flex w-full flex-col gap-3 text-lg font-medium text-text-primary",
    className,
  );

  return (
    <label className={classCombined} {...props}>
      {label}
      {children}
    </label>
  );
}
