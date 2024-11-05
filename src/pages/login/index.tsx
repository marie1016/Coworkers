import SetupHeader from "@/components/@shared/UI/SetupHeader";
import InputLabel from "@/components/@shared/UI/InputLabel";
import Input from "@/components/@shared/UI/Input";
import Button from "@/components/@shared/UI/Button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/constants/AuthContext";
import { validatePassword, validateEmail } from "@/lib/utils/validation";

interface FormData {
  email: string | undefined;
  password: string | undefined;
}

interface FormErrors {
  email: string | undefined;
  password: string | undefined;
}

export default function Login() {
  const { handleLogin, handleEmailLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: undefined,
    password: undefined,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBlur = ({
    target: { name, value },
  }: React.FocusEvent<HTMLInputElement>) => {
    if (name === "email") {
      if (!value) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: "이메일을 입력해주세요.",
        }));
      } else {
        const emailError = validateEmail(value);
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: emailError ?? undefined, // 이메일 형식 검사 결과 처리
        }));
      }
    }

    if (name === "password") {
      if (!value) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          password: "비밀번호를 입력해주세요.",
        }));
      } else if (validatePassword(value)) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          password: validatePassword(value),
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          password: undefined,
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: !formData.email
        ? "이메일을 입력해주세요."
        : validateEmail(formData.email ?? ""),
      password: validatePassword(formData.password ?? ""),
    };
    setFormErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("입력 값이 올바르지 않습니다. 이메일과 비밀번호를 확인해주세요.");
      return;
    }

    if (formData.email && formData.password) {
      await handleEmailLogin(formData.email, formData.password);
    } else {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
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
          <h2 className="text-2xl text-text-primary">로그인</h2>
          <InputLabel label="이메일" className="text-lg text-text-primary">
            <Input
              name="email"
              type="email"
              className="h-[48px] gap-2.5 px-4 py-2.5 sm:h-[44px] sm:w-[343px]"
              placeholder="이메일을 입력해주세요."
              value={formData.email}
              onChange={handleChange}
              isValid={!formErrors.email}
              errorMessage={formErrors.email}
              onBlur={handleBlur}
            />
          </InputLabel>
          <InputLabel label="비밀번호" className="text-lg text-text-primary">
            <div className="relative w-full items-center">
              <Input
                name="password"
                className="h-[48px] gap-2.5 px-4 py-2.5 sm:h-[44px] sm:w-[343px]"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요."
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
            </div>
            <Link
              href="/resetPassword"
              className="flex items-center justify-end text-lg text-brand-primary underline"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </InputLabel>

          <Button type="submit" variant="solid" size="large" className="mt-4">
            로그인
          </Button>

          <div className="mt-4 flex gap-x-3 text-center text-lg">
            <span>아직 계정이 없으신가요?</span>
            <Link href="/signup" className="text-brand-primary underline">
              가입하기
            </Link>
          </div>

          <div className="mt-2 flex w-full items-center justify-center">
            <div className="w-full border-t border-border-primary" />
            <span className="px-4 text-center text-lg text-text-inverse">
              OR
            </span>
            <div className="w-full border-t border-border-primary" />
          </div>

          <div className="flex w-full items-center justify-between">
            <span className="text-lg text-text-inverse">간편 로그인하기</span>
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
