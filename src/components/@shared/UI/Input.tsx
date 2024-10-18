import { InputHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  buttonContent?: ReactNode; // 버튼에 들어갈 이지미, 텍스트
  errorMessage?: string; // 에러 메시지
  isValid?: boolean; // 유효성 검사
  buttonClassName?: string; // 버튼 스타일
  onButtonClick?: () => void; // 버튼 클릭 핸들러
}

export default function Input({
  buttonContent = null,
  errorMessage = "",
  isValid = true,
  buttonClassName = "",
  onButtonClick,
  className,
  ...props
}: InputProps) {
  const inputClasses = twMerge(
    `h-[48px] w-[460px] rounded-xl border-border-primary border-opacity-10 bg-background-secondary p-4 placeholder:text-text-default hover:border-interaction-hover focus:border-interaction-hover focus:outline-none focus:ring-0 
    ${isValid ? "border-border-primary" : "border-status-danger focus:border-status-danger"}`,
    className,
  );

  return (
    <div className="relative flex flex-col gap-1">
      <input {...props} className={inputClasses} />
      {buttonContent && (
        <button
          type="button"
          onClick={onButtonClick}
          className={buttonClassName}
        >
          {buttonContent}
        </button>
      )}
      {!isValid && errorMessage && (
        <span className="text-md text-status-danger">{errorMessage}</span>
      )}
    </div>
  );
}

Input.defaultProps = {
  buttonContent: null,
  errorMessage: "",
  isValid: true,
  buttonClassName: "",
  onButtonClick: () => {},
};
