// /src/pages/HomePage.tsx

// import React from "react";
// import ExampleModal from "@/components/@shared/UI/Modal/ExampleModal";
// import useModalStore from "@/lib/hooks/stores/modalStore";

// export default function HomePage() {
//   const openModal = useModalStore((state) => state.openModal);
//   const closeModal = useModalStore((state) => state.closeModal);
//   const isExampleModalOpen = useModalStore(
//     (state) => state.modals.exampleModal || false,
//   );

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center space-y-4 bg-gray-100">
//       {/* 모달 열기 버튼 */}
//       <button
//         type="button"
//         onClick={() => openModal("exampleModal")}
//         className="rounded-md bg-brand-primary px-6 py-3 text-white hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary"
//       >
//         모달 열기
//       </button>

//       {/* ExampleModal 사용 */}
//       <ExampleModal
//         isOpen={isExampleModalOpen}
//         onClose={() => closeModal("exampleModal")}
//       />
//     </div>
//   );
// }
