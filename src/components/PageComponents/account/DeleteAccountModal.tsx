import Modal from "@/components/@shared/UI/Modal/Modal";
import Image from "next/image";
import useModalStore from "@/lib/hooks/stores/modalStore";
import Button from "@/components/@shared/UI/Button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import deleteUser from "@/core/api/user/deleteUser";
import { useRouter } from "next/router";
import { removeTokens } from "@/lib/utils/tokenStorage";

export default function DeleteAccountModal() {
  const router = useRouter();
  const modalName = "deleteAccountModal";
  const isOpen = useModalStore((state) => state.modals[modalName] || false);
  const closeModal = useModalStore((state) => state.closeModal);

  const closeDeleteModal = () => {
    closeModal("deleteAccountModal");
  };

  const deleteMutation = useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      closeDeleteModal();
      router.push("/login");
      removeTokens();
      toast.success("회원 탈퇴가 완료됐습니다!");
    },
    onError: (error) => {
      console.error("Delete failed:", error);
      toast.error("에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
    },
  });

  const handleDeleteAccount = () => {
    deleteMutation.mutate();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => closeDeleteModal()}>
      <div className="flex w-80 flex-col items-center justify-between font-medium">
        <Image
          src="/icons/icon-alert.svg"
          width={24}
          height={24}
          alt="경고 아이콘"
        />
        <p className="mt-4 text-center">회원 탈퇴를 진행하시겠어요?</p>
        <p className="mt-2 text-center text-text-md text-text-secondary">
          그룹장으로 있는 그룹은 자동으로 삭제되고,
          <br />
          모든 그룹에서 나가집니다.
        </p>

        <div className="mt-6 flex w-full gap-2">
          <Button
            variant="outlined"
            size="large"
            className="[&&]:bg-background-inverse"
            onClick={closeDeleteModal}
          >
            닫기
          </Button>
          <Button
            variant="solid"
            size="large"
            className="[&&]:bg-status-danger"
            onClick={handleDeleteAccount}
          >
            삭제하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
