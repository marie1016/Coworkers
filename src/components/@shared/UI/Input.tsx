import { ReactNode } from "react";

interface InputProps {
  type?: string; // 입력 필드 타입
  placeholder?: string; // placeholder
  buttonContent?: ReactNode; // 버튼에 들어갈 이지미, 텍스트
  errorMessage?: string; // 에러 메시지
  isValid?: boolean; // 유효성 검사
  inputClassName?: string; // input 스타일
  buttonClassName?: string; // 버튼 스타일
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 입력 값 변경 핸들러
  onButtonClick?: () => void; // 버튼 클릭 핸들러
}

export default function Input({
  type = "text",
  placeholder = "",
  buttonContent = null,
  errorMessage = "",
  isValid = true,
  inputClassName = "",
  buttonClassName = "",
  value = "",
  onChange,
  onButtonClick,
}: InputProps) {
  return (
    <div className="relative flex flex-col gap-1">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`h-[48px] w-[460px] rounded-xl border-border-primary border-opacity-10 bg-background-secondary p-4 placeholder:text-text-default hover:border-interaction-hover focus:border-interaction-hover focus:outline-none focus:ring-0 ${isValid ? "border-border-primary" : "border-status-danger focus:border-status-danger"} ${inputClassName}`}
      />
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
  type: "text",
  placeholder: "",
  buttonContent: null,
  errorMessage: "",
  isValid: true,
  inputClassName: "",
  buttonClassName: "",
  value: "",
  onChange: () => {},
  onButtonClick: () => {},
};
