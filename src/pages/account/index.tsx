import FileInput from "@/components/@shared/UI/FileInput";
import Input from "@/components/@shared/UI/Input";
import Button from "@/components/@shared/UI/Button";
import Image from "next/image";
import useImageUpload from "@/lib/hooks/useImageUpload";
import InputLabel from "@/components/@shared/UI/InputLabel";
import { useAuth } from "@/core/context/AuthProvider";
import AuthHeader from "@/components/@shared/UI/AuthHeader";
import useModalStore from "@/lib/hooks/stores/modalStore";
import DeleteAccountModal from "@/components/PageComponents/account/DeleteAccountModal";

export default function AccountSettings() {
  const { user } = useAuth(true);
  const openModal = useModalStore((state) => state.openModal);
  const defaultProfileImage = "/icons/icon-addProfile.png";
  const {
    fileInputValue,
    file,
    handleFileInputChange,
    getImageUrl,
    imagePreview,
  } = useImageUpload(defaultProfileImage);

  const handleProfileClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleUploadClick = async () => {
    if (!file) return;
    try {
      await getImageUrl(file);
    } catch (e) {
      alert("이미지 업로드 실패");
    }
  };

  const openDeleteAccountModal = () => {
    openModal("deleteAccountModal");
  };

  return (
    <div>
      <AuthHeader />
      <div className="mt-[84px] flex w-full justify-center lg:mt-[100px]">
        <div className="flex w-full max-w-[792px] flex-col items-start gap-y-5 px-4 sm:px-6 md:px-6">
          <h2 className="text-lg font-bold">계정 설정</h2>
          <div
            onClick={handleProfileClick}
            className="flex items-center"
            style={{ width: "64px", height: "64px", position: "relative" }}
          >
            <Image
              src={imagePreview ?? defaultProfileImage}
              alt="프로필 이미지"
              width={64}
              height={64}
              className="rounded-full object-cover"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <FileInput
            id="fileInput"
            value={fileInputValue}
            onInputChange={handleFileInputChange}
            className="hidden"
          />
          <form className="flex w-full flex-col items-start gap-y-6 lg:max-w-[792px]">
            <InputLabel label="이름">
              <Input
                type="text"
                placeholder={user?.nickname}
                className="w-full rounded-xl bg-gray-800 px-4 py-2 text-white"
              />
            </InputLabel>

            <InputLabel label="이메일">
              <Input
                type="email"
                placeholder={user?.email}
                className="w-full rounded-xl bg-gray-800 px-4 py-2 text-white"
                disabled
              />
            </InputLabel>

            <InputLabel label="비밀번호">
              <Input
                type="password"
                placeholder="비밀번호"
                disabled
                className="relative w-full rounded-xl bg-gray-800 px-4 py-2 text-white"
                buttonContent="변경하기"
                buttonClassName="absolute top-1/2 transform -translate-y-1/2 right-3 flex items-center justify-center gap-2.5 rounded-xl text-center font-[Pretendard] font-semibold transition-all duration-200 h-8 w-auto min-w-[80px] text-sm leading-[17px]    text-text-primary [&&]:bg-brand-primary
              [&&]:hover:bg-interaction-hover
              [&&]:active:bg-interaction-pressed"
              />
            </InputLabel>

            <div className="flex w-full justify-start">
              <Button
                variant="solid"
                size="large"
                className="mt-4 flex items-center"
                onClick={handleUploadClick}
              >
                저장하기
              </Button>
            </div>
          </form>
          <button
            className="mt-2 flex items-center gap-2 text-point-red"
            onClick={openDeleteAccountModal}
          >
            <Image
              src="/icons/icon-secession.png"
              width={24}
              height={24}
              alt="회원 탈퇴하기"
            />
            회원 탈퇴하기
          </button>
        </div>
      </div>
      <DeleteAccountModal />
    </div>
  );
}
