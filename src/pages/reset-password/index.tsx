import SetupHeader from "@/components/@shared/UI/SetupHeader";
import InputLabel from "@/components/@shared/UI/InputLabel";
import Input from "@/components/@shared/UI/Input";
import Button from "@/components/@shared/UI/Button";
import React, { useState, useEffect } from "react";
import { validatePassword } from "@/lib/utils/validation";
import Image from "next/image";
import { resetPasswordWithToken } from "@/core/api/auth/authApi";
import { useRouter } from "next/router";

interface FormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

export default function ResetPassword() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [token, setToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const urlToken = router.query.token as string;
    if (urlToken) setToken(urlToken);
    console.log("Token from URL:", urlToken);
  }, [router.query.token]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = ({
    target: { name, value },
  }: React.FocusEvent<HTMLInputElement>) => {
    if (name === "password") {
      setFormErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
    if (name === "confirmPassword") {
      setFormErrors((prev) => ({
        ...prev,
        confirmPassword:
          value === formData.password
            ? undefined
            : "비밀번호가 일치하지 않습니다.",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const passwordError = validatePassword(formData.password);
    const confirmPasswordError =
      formData.password === formData.confirmPassword
        ? undefined
        : "비밀번호가 일치하지 않습니다.";

    setFormErrors({
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    if (!passwordError && !confirmPasswordError && token) {
      setIsSubmitting(true);
      try {
        const response = await resetPasswordWithToken({
          password: formData.password,
          passwordConfirmation: formData.confirmPassword,
          token,
        });

        if (response.status === 200) {
          alert("비밀번호가 성공적으로 재설정되었습니다.");

          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          router.push("/login");
        }
      } catch (error) {
        console.error("비밀번호 재설정 실패:", error);
        alert("비밀번호 재설정 중 오류가 발생했습니다. 다시 시도해주세요.");
      } finally {
        setIsSubmitting(false);
      }
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

          <Button
            type="submit"
            variant="solid"
            size="large"
            className="mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "처리 중..." : "재설정"}
          </Button>
        </form>
      </div>
    </div>
  );
}
