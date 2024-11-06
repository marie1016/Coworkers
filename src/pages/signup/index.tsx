/* eslint-disable prefer-template */
/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import SetupHeader from "@/components/@shared/UI/SetupHeader";
import InputLabel from "@/components/@shared/UI/InputLabel";
import Input from "@/components/@shared/UI/Input";
import Button from "@/components/@shared/UI/Button";
import Image from "next/image";
import { useState } from "react";
import { validatePassword, validateEmail } from "@/lib/utils/validation";
import { SignupRequestDto } from "@/core/dtos/auth/authDto";
import { useAuth } from "@/core/context/AuthProvider";

export default function Signup() {
  const { handleSignup, handleLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleBlur = (target: HTMLInputElement) => {
    let error = "";
    switch (target.name) {
      case "name":
        error = target.value ? "" : "이름을 입력해주세요.";
        break;
      case "email":
        error = target.value
          ? validateEmail(target.value) || ""
          : "이메일을 입력해주세요.";
        break;
      case "password":
        error = target.value
          ? validatePassword(target.value) || ""
          : "비밀번호를 입력해주세요.";
        break;
      case "confirmPassword":
        if (!target.value) {
          error = "비밀번호를 다시 한 번 입력해주세요.";
        } else if (target.value !== formData.password) {
          error = "비밀번호가 일치하지 않습니다.";
        }
        break;
      default:
        break;
    }
    setFormErrors((prevErrors) => ({ ...prevErrors, [target.name]: error }));
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [target.name]: target.value || "" }));
    handleBlur(target);
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name ? "" : "이름을 입력해주세요.",
      email: formData.email
        ? validateEmail(formData.email) || ""
        : "이메일을 입력해주세요.",
      password: validatePassword(formData.password) || "",
      confirmPassword:
        formData.password !== formData.confirmPassword
          ? "비밀번호가 일치하지 않습니다."
          : "",
    };
    setFormErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const signupData: SignupRequestDto = {
        nickname: formData.name,
        email: formData.email,
        password: formData.password,
        passwordConfirmation: formData.confirmPassword,
      };

      try {
        setIsSubmitting(true);
        await handleSignup(signupData);
      } catch (error: unknown) {
        console.error("에러 :", error);
        if (error instanceof Error) {
          alert("회원가입 실패: " + error.message);
        }
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
          <h2 className="text-2xl text-white">회원가입</h2>
          <InputLabel label="이름">
            <Input
              name="name"
              placeholder="이름을 입력해주세요."
              value={formData.name}
              onChange={handleChange}
              isValid={!formErrors.name}
              errorMessage={formErrors.name}
              onBlur={(e) => handleBlur(e.target)}
            />
          </InputLabel>
          <InputLabel label="이메일">
            <Input
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요."
              value={formData.email}
              onChange={handleChange}
              isValid={!formErrors.email}
              errorMessage={formErrors.email}
              onBlur={(e) => handleBlur(e.target)}
            />
          </InputLabel>
          <InputLabel label="비밀번호">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요."
              value={formData.password}
              onChange={handleChange}
              isValid={!formErrors.password}
              errorMessage={formErrors.password}
              onBlur={(e) => handleBlur(e.target)}
              buttonContent={
                <Image
                  src={
                    showPassword
                      ? "/icons/icon-visibility.png"
                      : "/icons/icon-visibility_off.png"
                  }
                  width={24}
                  height={24}
                  alt="비밀번호 보기"
                />
              }
              buttonClassName="absolute top-1/2 transform -translate-y-1/2 right-3"
              onButtonClick={togglePasswordVisibility}
            />
          </InputLabel>
          <InputLabel label="비밀번호 확인">
            <Input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="비밀번호를 다시 한 번 입력해주세요."
              value={formData.confirmPassword}
              onChange={handleChange}
              isValid={!formErrors.confirmPassword}
              errorMessage={formErrors.confirmPassword}
              onBlur={(e) => handleBlur(e.target)}
              buttonContent={
                <Image
                  src={
                    showConfirmPassword
                      ? "/icons/icon-visibility.png"
                      : "/icons/icon-visibility_off.png"
                  }
                  width={24}
                  height={24}
                  alt="비밀번호 보기"
                />
              }
              buttonClassName="absolute right-3 top-1/2 transform -translate-y-1/2"
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
            {isSubmitting ? "처리 중..." : "회원가입"}
          </Button>

          <div className="mt-2 flex w-full items-center justify-center">
            <div className="w-full border-t border-border-primary" />
            <span className="px-4 text-center text-lg text-text-inverse">
              OR
            </span>
            <div className="w-full border-t border-border-primary" />
          </div>

          <div className="flex w-full items-center justify-between">
            <span className="text-lg text-text-inverse">간편 회원가입하기</span>
            <div className="flex flex-row items-center justify-center gap-4">
              <button type="button" onClick={() => handleLogin("google")}>
                <Image
                  src="/icons/icon-google.png"
                  alt="구글 간편 회원가입"
                  width={42}
                  height={42}
                />
              </button>
              <button type="button" onClick={() => handleLogin("kakao")}>
                <Image
                  src="/icons/icon-kakaotalk.png"
                  alt="카카오 간편 회원가입"
                  width={42}
                  height={42}
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
