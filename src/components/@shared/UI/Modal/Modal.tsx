// /src/components/@shared/UI/Modal/Modal.tsx

import React, { useEffect, useRef, useState } from "react";
import FocusTrap from "focus-trap-react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isCloseButton?: boolean; // X 버튼 표시 여부
}

/**
 * 모달 컴포넌트는 사용자에게 중요한 정보를 표시하거나 사용자 상호작용을 요구하는 오버레이 창을 제공합니다.
 * 모달이 열리면 포커스가 모달 내부로 이동하며, 닫힐 때 이전 포커스로 돌아갑니다.
 *
 * @param {ModalProps} props - 모달 컴포넌트의 속성들.
 * @param {boolean} props.isOpen - 모달이 열려 있는지 여부를 결정합니다.
 * @param {() => void} props.onClose - 모달을 닫는 함수입니다.
 * @param {React.ReactNode} props.children - 모달 내부에 표시될 콘텐츠입니다.
 * @param {boolean} [props.isCloseButton=false] - 닫기 버튼을 표시할지 여부입니다.
 */
export default function Modal({
  isOpen,
  onClose,
  children,
  isCloseButton = false,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const [animationState, setAnimationState] = useState<
    "fadeIn" | "fadeOut" | "none"
  >("none");

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      setAnimationState("fadeIn");
      setTimeout(() => {
        modalRef.current?.focus();
      }, 600);
    } else if (animationState === "fadeIn") {
      setAnimationState("fadeOut");
      setTimeout(() => {
        setAnimationState("none");
        document.body.style.overflow = "";
        previouslyFocusedElement.current?.focus();
      }, 600);
    }
  }, [isOpen, animationState]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // 모달이 닫히는 애니메이션이 완료될 때까지 렌더링 유지
  if (!isOpen && animationState === "none") {
    return null;
  }

  return (
    <FocusTrap active={isOpen}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-element-interactions */}
      <div
        className={twMerge(
          clsx(
            "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",
            animationState === "fadeIn" && "animate-fadeIn",
            animationState === "fadeOut" && "animate-fadeOut",
            "sm:items-end",
          ),
        )}
        role="dialog"
        aria-modal="true"
        onClick={onClose} // 배경 클릭 시 모달 닫기
      >
        {/* 모달 창 */}
        <div
          className={twMerge(
            clsx(
              "modal",
              "relative bg-background-secondary transition-transform duration-300",
              "w-auto sm:w-full",
              "mx-4 sm:mx-0",
              "max-h-full overflow-auto",
              "rounded-xl sm:rounded-b-none sm:rounded-t-xl",
              "flex flex-col p-4 pb-8",
              "sm:animate-slideUp md:animate-scaleIn lg:animate-scaleIn",
              animationState === "fadeOut" &&
                "animate-scaleOut sm:animate-slideDown",
            ),
          )}
          onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 배경 클릭 이벤트 차단
          ref={modalRef}
          tabIndex={-1}
        >
          {/* 닫기 바 */}
          <div className="flex h-6 flex-none items-center justify-end">
            {isCloseButton && (
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={onClose}
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          {/* 모달 내용 */}
          <div className="mt-2 flex flex-grow items-center justify-center">
            {children}
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}
