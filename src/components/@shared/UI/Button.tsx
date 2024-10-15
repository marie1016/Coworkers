import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import React from "react";

/**
 * 기본 버튼 속성을 정의합니다.
 * 확장된 HTML 버튼 속성도 포함됩니다.
 */
interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼의 자식 요소입니다.
   */
  children: React.ReactNode;

  /**
   * 추가적인 CSS 클래스를 지정할 수 있습니다.
   */
  className?: string;
}

/**
 * 버튼의 스타일과 크기를 정의합니다.
 */
interface StyleProps {
  /**
   * 버튼의 변형 스타일을 지정합니다.
   * - "solid": 실버튼 스타일
   * - "outlined": 외곽선 버튼 스타일
   */
  variant?: "solid" | "outlined";

  /**
   * 버튼의 크기를 지정합니다.
   * - "large": 부모 요소의 너비에 맞춰 확장되는 크기
   * - "x-small": 자식 요소의 텍스트 양에 따라 자동으로 크기가 조절되는 크기
   */
  size?: "large" | "x-small";
}

/**
 * Button 컴포넌트의 속성을 정의합니다.
 */
interface ButtonProps extends BaseButtonProps, StyleProps {
  /**
   * 버튼의 비활성화 상태를 설정합니다.
   */
  disabled?: boolean;
}

/**
 * 버튼 공용 컴포넌트입니다.
 * 다양한 스타일과 크기를 지원하며, 비활성화 상태를 처리할 수 있습니다.
 *
 * @param {ButtonProps} props - 버튼 컴포넌트의 속성
 * @param {React.ReactNode} props.children - 버튼 내부에 표시될 콘텐츠
 * @param {"solid" | "outlined"} [props.variant="solid"] - 버튼의 변형 스타일
 * @param {"large" | "x-small"} [props.size="large"] - 버튼의 크기
 * @param {boolean} [props.disabled=false] - 버튼의 비활성화 상태
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
              "bg-brand-primary text-text-primary",
              "hover:bg-interaction-hover",
              "active:bg-interaction-pressed",
            ],
          isSolid &&
            isDisabled && [
              "bg-interaction-inactive text-text-primary",
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
