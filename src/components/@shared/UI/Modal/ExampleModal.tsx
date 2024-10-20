// /src/components/@shared/UI/Modal/ExampleModal.tsx

import React from "react";
import Modal from "./Modal";

interface ExampleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExampleModal({ isOpen, onClose }: ExampleModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCloseButton>
      <div className="inline-flex h-[131px] flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="font-['Pretendard'] text-base font-medium leading-[19px] text-slate-50">
            멤버 초대
          </div>
          <div className="font-['Pretendard'] text-sm font-medium leading-[17px] text-slate-300">
            그룹에 참여할 수 있는 링크를 복사합니다.
          </div>
        </div>
        <div className="inline-flex h-[47px] w-[280px] items-center justify-center gap-2.5 rounded-xl bg-emerald-500 py-3.5">
          <div className="text-center font-['Pretendard'] text-base font-semibold leading-[19px] text-white">
            링크 복사하기
          </div>
        </div>
      </div>
    </Modal>
  );
}
