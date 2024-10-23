import SetupHeader from "@/components/@shared/UI/SetupHeader";
import InputLabel from "@/components/@shared/UI/InputLabel";
import Input from "@/components/@shared/UI/Input";
import Button from "@/components/@shared/UI/Button";
import Image from "next/image";
import { useState } from "react";
import { validatePassword, validateEmail } from "@/lib/utils/validation";

interface FormData {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
}

interface FormErrors {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = ({
    target: { name, value },
  }: React.FocusEvent<HTMLInputElement>) => {
    if (name === "name") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        name: !value ? "이름을 입력해주세요." : undefined,
      }));
    }

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

    if (name === "confirmPassword") {
      if (!value) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "비밀번호를 다시 한 번 입력해주세요.",
        }));
      } else if (value !== formData.password) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "비밀번호가 일치하지 않습니다.",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: undefined,
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: !formData.name ? "이름을 입력해주세요." : undefined,
      email: !formData.email
        ? "이메일을 입력해주세요."
        : validateEmail(formData.email ?? ""),
      password: validatePassword(formData.password ?? ""),
      confirmPassword:
        formData.password !== formData.confirmPassword
          ? "비밀번호가 일치하지 않습니다."
          : undefined,
    };
    setFormErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== undefined);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert("폼 성공적으로 제출 완료");
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
              className="h-[48px] gap-2.5 px-4 py-2.5 sm:h-[44px] sm:w-[343px]"
              placeholder="이름을 입력해주세요."
              value={formData.name}
              onChange={handleChange}
              isValid={!formErrors.name}
              errorMessage={formErrors.name}
              onBlur={handleBlur}
            />
          </InputLabel>
          <InputLabel label="이메일">
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
          <InputLabel label="비밀번호">
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
          </InputLabel>
          <InputLabel label="비밀번호 확인">
            <div className="relative w-full">
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="h-[48px] gap-2.5 px-4 py-2.5 sm:h-[44px] sm:w-[343px]"
                placeholder="비밀번호를 다시 한 번 입력해주세요."
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
                    alt={
                      showConfirmPassword ? "비밀번호 숨김" : "비밀번호 보기"
                    }
                  />
                }
                buttonClassName="absolute right-3 top-1/2 transform -translate-y-1/2"
                onButtonClick={toggleConfirmPasswordVisibility}
              />
            </div>
          </InputLabel>

          <Button variant="solid" size="large" className="mt-4">
            회원가입
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
              <button>
                <Image
                  src="/icons/icon-google.png"
                  alt="구글 간편 회원가입"
                  width={42}
                  height={42}
                />
              </button>
              <button>
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
