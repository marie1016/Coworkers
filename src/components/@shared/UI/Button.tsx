import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

interface StyleProps {
  variant: "solid" | "outlined";
  size: "large" | "x-small";
}

interface ButtonProps extends BaseButtonProps, StyleProps {
  disabled?: boolean;
}

/**
 * 버튼 공용 컴포넌트입니다.
 * 다양한 스타일과 크기를 지원하며, 비활성화 상태를 처리할 수 있습니다.
 *
 * @param {React.ReactNode} children - 버튼 내부에 표시될 콘텐츠
 * @param {"solid" | "outlined"} [variant="solid"] - 버튼의 변형 스타일 (기본값: "solid")
 * @param {"large" | "x-small"} [size="large"] - 버튼의 크기 (기본값: "large")
 * @param {Function} onClick - 클릭 이벤트 핸들러
 * @param {string} [className] - 추가적인 커스텀 클래스 이름
 * @param {boolean} [disabled=false] - 버튼의 비활성화 상태 (기본값: false)
 * @returns {JSX.Element} 렌더링된 버튼 컴포넌트
 */
export default function Button({
  children,
  variant = "solid",
  size = "large",
  onClick,
  className,
  disabled = false,
  ...rest
}: ButtonProps): JSX.Element {
  const isSolid = variant === "solid";
  const isOutlined = variant === "outlined";
  const isLarge = size === "large";
  const isXSmall = size === "x-small";
  const isDisabled = disabled;

  return (
    <button
      type="button"
      onClick={isDisabled ? undefined : onClick}
      className={twMerge(
        clsx(
          /* 기본 버튼 스타일 */
          "flex items-center justify-center gap-2.5 rounded-xl text-center font-[Pretendard] font-semibold transition-all duration-200",
          /* Size 스타일 */
          isLarge && "h-12 w-full text-base leading-[19px]",
          isXSmall && "h-8 w-auto min-w-[80px] text-sm leading-[17px]",
          /* Solid 스타일 */
          isSolid &&
            !isDisabled && [
              "text-text-primary [&&]:bg-brand-primary",
              "[&&]:hover:bg-interaction-hover",
              "[&&]:active:bg-interaction-pressed",
            ],
          isSolid &&
            isDisabled && [
              "text-text-primary [&&]:bg-interaction-inactive",
              "cursor-not-allowed",
            ],
          /* Outlined 스타일 */
          isOutlined &&
            !isDisabled && [
              isLarge &&
                "border border-brand-primary bg-white text-brand-primary",
              isXSmall &&
                "border border-brand-primary bg-transparent text-brand-primary",
              "hover:border-interaction-hover hover:text-interaction-hover",
              "active:border-interaction-pressed active:text-interaction-pressed",
            ],
          isOutlined &&
            isDisabled && [
              "cursor-not-allowed",
              isLarge && "border border-interaction-inactive bg-white",
              isXSmall && "border border-interaction-inactive bg-transparent",
              "text-text-disabled",
            ],
          className,
        ),
      )}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      {...rest}
    >
      <span className="flex-1 text-center">{children}</span>
    </button>
  );
}
