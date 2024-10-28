import SetupHeader from "@/components/@shared/UI/SetupHeader";
import InputLabel from "@/components/@shared/UI/InputLabel";
import Input from "@/components/@shared/UI/Input";
import Button from "@/components/@shared/UI/Button";
import React, { useState } from "react";
import { validatePassword } from "@/lib/utils/validation";
import Image from "next/image";

interface FormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [formData, setFormData] = useState<FormData>({
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = ({
    target: { name, value },
  }: React.FocusEvent<HTMLInputElement>) => {
    if (name === "password") {
      let passwordError;
      if (!value) {
        passwordError = "새 비밀번호를 입력해주세요.";
      } else {
        passwordError = validatePassword(value);
      }
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordError,
      }));
    }

    if (name === "confirmPassword") {
      let confirmPasswordError;
      if (!value) {
        confirmPasswordError = "비밀번호를 다시 입력해주세요.";
      } else if (value !== formData.password) {
        confirmPasswordError = "비밀번호가 일치하지 않습니다.";
      } else {
        confirmPasswordError = undefined;
      }
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: confirmPasswordError,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const passwordError = validatePassword(formData.password) ?? undefined;
    const confirmPasswordError =
      formData.password !== formData.confirmPassword
        ? "비밀번호가 일치하지 않습니다."
        : undefined;

    setFormErrors({
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    if (!passwordError && !confirmPasswordError) {
      alert("비밀번호가 성공적으로 재설정되었습니다.");
    }
  };

  return (
    <div>
      <SetupHeader />
      <div className="mt-[160px] flex w-full items-center justify-center sm:mt-[84px]">
        <form
          className="flex flex-col items-center gap-6 sm:w-[343px]"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl text-text-primary">비밀번호 재설정</h2>

          {/* 새 비밀번호 입력 필드 */}
          <InputLabel label="새 비밀번호" className="text-lg text-text-primary">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              className="h-[48px] gap-2.5 px-4 py-2.5 text-text-md sm:h-[44px] sm:w-[343px]"
              placeholder="비밀번호 (영문, 숫자, 특수문자 포함, 12자 이내)를 입력해주세요."
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={!formErrors.password}
              errorMessage={formErrors.password}
              buttonContent={
                <Image
                  src={
                    showPassword
                      ? "/icons/icon-visibility.png"
                      : "/icons/icon-visibility_off.png"
                  }
                  width={24}
                  height={24}
                  alt={showPassword ? "비밀번호 숨김" : "비밀번호 보기"}
                />
              }
              buttonClassName="absolute top-1/2 transform -translate-y-1/2 right-3"
              onButtonClick={togglePasswordVisibility}
            />
          </InputLabel>

          {/* 비밀번호 확인 입력 필드 */}
          <InputLabel
            label="비밀번호 확인"
            className="text-lg text-text-primary"
          >
            <Input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="h-[48px] gap-2.5 px-4 py-2.5 sm:h-[44px] sm:w-[343px]"
              placeholder="새 비밀번호를 다시 한번 입력해주세요."
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              isValid={!formErrors.confirmPassword}
              errorMessage={formErrors.confirmPassword}
              buttonContent={
                <Image
                  src={
                    showConfirmPassword
                      ? "/icons/icon-visibility.png"
                      : "/icons/icon-visibility_off.png"
                  }
                  width={24}
                  height={24}
                  alt={showConfirmPassword ? "비밀번호 숨김" : "비밀번호 보기"}
                />
              }
              buttonClassName="absolute top-1/2 transform -translate-y-1/2 right-3"
              onButtonClick={toggleConfirmPasswordVisibility}
            />
          </InputLabel>

          <Button variant="solid" size="large" className="mt-4">
            재설정
          </Button>
        </form>
      </div>
    </div>
  );
}
