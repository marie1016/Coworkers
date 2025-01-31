import Button from "@/components/@shared/UI/Button";
import Input from "@/components/@shared/UI/Input";
import InputLabel from "@/components/@shared/UI/InputLabel";
import Modal from "@/components/@shared/UI/Modal/Modal";
import updatePassword from "@/core/api/user/updatePassword";
import { UpdatePasswordForm } from "@/core/dtos/user/auth";
import useModalStore from "@/lib/hooks/stores/modalStore";
import { validatePassword } from "@/lib/utils/validation";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface FormErrors {
  password: string | undefined;
  passwordConfirmation: string | undefined;
}

export default function ChangePasswordModal() {
  const modalName = "changePasswordModal";
  const isOpen = useModalStore((state) => state.modals[modalName] || false);
  const closeModal = useModalStore((state) => state.closeModal);

  const [formData, setFormData] = useState({
    password: "",
    passwordConfirmation: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    password: undefined,
    passwordConfirmation: undefined,
  });

  const closeChangePasswordModal = () => {
    closeModal("changePasswordModal");
    setFormData({ password: "", passwordConfirmation: "" });
    setFormErrors({ password: undefined, passwordConfirmation: undefined });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBlur = (target: HTMLInputElement) => {
    let error = "";
    switch (target.name) {
      case "password":
        error = validatePassword(target.value) ?? "";
        break;
      case "passwordConfirmation":
        if (!target.value) {
          error = "새 비밀번호를 다시 한 번 입력해주세요.";
        } else if (target.value !== formData.password) {
          error = "비밀번호가 일치하지 않습니다.";
        }
        break;
      default:
        break;
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, [target.name]: error }));
  };

  const validateForm = () => {
    const newErrors = {
      password: validatePassword(formData.password ?? ""),
      passwordConfirmation:
        formData.password !== formData.passwordConfirmation
          ? "비밀번호가 일치하지 않습니다."
          : undefined,
    };
    setFormErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== undefined);
  };

  const updatePasswordMutation = useMutation({
    mutationFn: (newFormData: UpdatePasswordForm) =>
      updatePassword(newFormData),
    onSuccess: () => {
      closeChangePasswordModal();
    },
    onError: (error) => {
      console.error("비밀번호 변경 중 오류 발생:", error);
    },
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    if (formData.password && formData.passwordConfirmation) {
      updatePasswordMutation.mutate(formData);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeChangePasswordModal}>
      <div className="h-auto w-[24rem] overflow-x-hidden px-6 py-8">
        <h2 className="pb-3 text-center text-text-lg text-text-primary">
          비밀번호 변경하기
        </h2>
        <form
          className="flex flex-col items-center gap-6"
          onSubmit={handleFormSubmit}
        >
          <InputLabel className="text-md text-text-primary" label="새 비밀번호">
            <Input
              name="password"
              type="password"
              value={formData.password}
              isValid={!formErrors.password}
              errorMessage={formErrors.password}
              className="w-[21rem]"
              placeholder="새 비밀번호를 입력해주세요."
              onChange={handleChange}
              onBlur={(e) => handleBlur(e.target)}
            />
          </InputLabel>
          <InputLabel
            className="text-md text-text-primary"
            label="새 비밀번호 확인"
          >
            <Input
              name="passwordConfirmation"
              type="password"
              value={formData.passwordConfirmation}
              isValid={!formErrors.passwordConfirmation}
              errorMessage={formErrors.passwordConfirmation}
              className="w-[21rem]"
              placeholder="새 비밀번호를 다시 한 번 입력해주세요."
              onChange={handleChange}
              onBlur={(e) => handleBlur(e.target)}
            />
          </InputLabel>
          <div className="mt-4 flex w-full justify-between gap-2">
            <Button
              variant="outlined"
              size="large"
              onClick={closeChangePasswordModal}
              className="w-1/2"
            >
              닫기
            </Button>
            <Button
              variant="solid"
              size="large"
              onClick={handleFormSubmit}
              className="w-1/2"
            >
              변경하기
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
