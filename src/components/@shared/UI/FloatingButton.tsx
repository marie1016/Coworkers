// src/components/@shared/UI/FloatingButton.tsx

import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * FloatingButton 컴포넌트의 props를 정의합니다.
 *
 * @interface FloatingButtonProps
 * @extends React.ButtonHTMLAttributes<HTMLButtonElement>
 */
interface FloatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼의 크기를 지정합니다.
   *
   * - `'large'`: 높이 48px, 폰트 크기 16px
   * - `'medium'`: 높이 40px, 폰트 크기 14px
   */
  size: "large" | "medium";

  /**
   * 버튼의 스타일 변형을 지정합니다.
   *
   * - `'solid'`: 배경색이 채워진 스타일
   * - `'outlined'`: 테두리만 있는 스타일
   */
  variant: "solid" | "outlined";

  /**
   * 버튼의 비활성화 여부를 지정합니다.
   *
   * `true`로 설정하면 버튼이 비활성화되고 클릭할 수 없게 됩니다.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * 버튼의 내용으로 표시될 React 노드입니다.
   * 텍스트, 아이콘 또는 JSX 요소를 포함할 수 있습니다.
   */
  children: React.ReactNode;

  /**
   * 추가적인 CSS 클래스를 지정할 수 있습니다.
   * 기존의 스타일을 오버라이드하거나 새로운 스타일을 추가할 때 사용합니다.
   */
  className?: string;
}

/**
 * FloatingButton 컴포넌트입니다.
 * 다양한 스타일과 크기를 지원하며, 비활성화 상태를 처리할 수 있습니다.
 *
 * @param {FloatingButtonProps} props - FloatingButton 컴포넌트의 속성
 * @param {React.ReactNode} props.children - 버튼 내부에 표시될 콘텐츠
 * @param {'solid' | 'outlined'} props.variant - 버튼의 스타일 변형
 * @param {'large' | 'medium'} props.size - 버튼의 크기
 * @param {boolean} [props.disabled=false] - 버튼의 비활성화 상태
 * @param {string} [props.className] - 추가적인 커스텀 클래스 이름
 * @returns {JSX.Element} 렌더링된 FloatingButton 컴포넌트
 */
export default function FloatingButton({
  size,
  variant,
  disabled = false,
  children,
  className,
  ...rest
}: FloatingButtonProps): JSX.Element {
  // 사이즈와 스타일에 따른 상태 변수 설정
  const isLarge = size === "large";
  const isMedium = size === "medium";
  const isSolid = variant === "solid";
  const isOutlined = variant === "outlined";

  return (
    <button
      type="button"
      disabled={disabled}
      className={twMerge(
        clsx(
          // 공통 스타일
          "inline-flex items-center justify-center rounded-[40px] font-[Pretendard] font-semibold shadow-xl",
          "transition-all duration-200",
          "px-5",
          // 사이즈별 스타일
          isLarge && "h-12 text-base leading-[19px]",
          isMedium && "h-10 text-sm leading-[17px]",
          // Solid 스타일
          isSolid &&
            !disabled &&
            "bg-brand-primary text-text-primary hover:bg-interaction-hover active:bg-interaction-pressed",
          isSolid &&
            disabled &&
            "cursor-not-allowed bg-interaction-inactive text-text-primary",
          // Outlined 스타일
          isOutlined &&
            !disabled && [
              "border border-brand-primary bg-white text-brand-primary",
              "hover:border-interaction-hover hover:text-interaction-hover",
              "active:border-interaction-pressed active:text-interaction-pressed",
            ],
          isOutlined &&
            disabled &&
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
