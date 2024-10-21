// /src/store/modalStore.ts
import { create } from "zustand";

interface ModalState {
  modals: Record<string, boolean>;
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
}

/**
 * `useModalStore`는 여러 모달의 열림/닫힘 상태를 관리하는 Zustand 스토어입니다.
 * 각 모달은 고유한 이름을 가지며, 해당 이름을 통해 상태를 제어할 수 있습니다.
 *
 * - `modals`: 각 모달의 이름을 키로 하고, 열림 여부를 값으로 가지는 객체입니다.
 * - `openModal`: 특정 모달을 여는 함수입니다.
 * - `closeModal`: 특정 모달을 닫는 함수입니다.
 *
 * @example
 *
 * ```typescript
 * // ExampleComponent.tsx
 * import React from "react";
 * import useModalStore from "@/store/modalStore";
 *
 * const ExampleComponent: React.FC = () => {
 *   const openModal = useModalStore((state) => state.openModal);
 *   const closeModal = useModalStore((state) => state.closeModal);
 *   const isExampleModalOpen = useModalStore((state) => state.modals["exampleModal"] || false);
 *
 *   return (
 *     <div>
 *       <button onClick={() => openModal("exampleModal")}>모달 열기</button>
 *
 *       {isExampleModalOpen && (
 *         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
 *           <div className="bg-white p-4 rounded">
 *             <h2>Example Modal</h2>
 *             <button onClick={() => closeModal("exampleModal")}>닫기</button>
 *           </div>
 *         </div>
 *       )}
 *     </div>
 *   );
 * };
 *
 * export default ExampleComponent;
 * ```
 */
const useModalStore = create<ModalState>((set) => ({
  modals: {},
  openModal: (modalName: string) =>
    set((state) => ({
      modals: { ...state.modals, [modalName]: true },
    })),
  closeModal: (modalName: string) =>
    set((state) => ({
      modals: { ...state.modals, [modalName]: false },
    })),
}));

export default useModalStore;
