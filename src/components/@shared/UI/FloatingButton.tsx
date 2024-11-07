import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface FloatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "solid" | "outlined";
  size: "large" | "medium";
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * FloatingButton 컴포넌트입니다.
 * 다양한 스타일과 크기를 지원하며, 비활성화 상태를 처리할 수 있습니다.
 *
 * @param {FloatingButtonProps} props - FloatingButton 컴포넌트의 속성
 * @param {React.ReactNode} props.children - 버튼 내부에 표시될 콘텐츠
 * @param {'solid' | 'outlined'} [props.variant='solid'] - 버튼의 스타일 변형 (기본값: 'solid')
 * @param {'large' | 'medium'} [props.size='large'] - 버튼의 크기 (기본값: 'large')
 * @param {boolean} [props.disabled=false] - 버튼의 비활성화 상태 (기본값: false)
 * @param {string} [props.className] - 추가적인 커스텀 클래스 이름
 * @returns {JSX.Element} 렌더링된 FloatingButton 컴포넌트
 */
export default function FloatingButton({
  children,
  variant = "solid",
  size = "large",
  disabled = false,
  className,
  ...rest
}: FloatingButtonProps): JSX.Element {
  // 사이즈와 스타일에 따른 상태 변수 설정
  const isSolid = variant === "solid";
  const isOutlined = variant === "outlined";
  const isLarge = size === "large";
  const isMedium = size === "medium";
  const isDisabled = disabled;

  return (
    <button
      type="button"
      disabled={disabled}
      className={twMerge(
        clsx(
          // 공통 스타일
          "inline-flex items-center justify-center rounded-[40px] px-5 font-[Pretendard] font-semibold shadow-xl",
          "transition-all duration-200",
          // 사이즈별 스타일
          isLarge && "h-12 text-base leading-[19px]",
          isMedium && "h-10 text-sm leading-[17px]",
          // Solid 스타일
          isSolid &&
            !isDisabled &&
            "text-text-primary [&&]:bg-brand-primary [&&]:hover:bg-interaction-hover [&&]:active:bg-interaction-pressed",
          isSolid &&
            isDisabled &&
            "cursor-not-allowed text-text-primary [&&]:bg-interaction-inactive",
          // Outlined 스타일
          isOutlined &&
            !isDisabled && [
              "border border-brand-primary bg-white text-brand-primary",
              "hover:border-interaction-hover hover:text-interaction-hover",
              "active:border-interaction-pressed active:text-interaction-pressed",
            ],
          isOutlined &&
            isDisabled &&
            "cursor-not-allowed border border-interaction-inactive text-text-disabled",
          className,
        ),
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
