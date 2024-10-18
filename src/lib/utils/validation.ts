// 비밀번호 유효성 검사 함수
export function validatePassword(password: string): string | undefined {
  const minLength = 8;
  const regex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?`~]).{8,}$/;

  if (password.length < minLength) {
    return `비밀번호는 최소 ${minLength}자 이상이어야 합니다.`;
  }

  if (!regex.test(password)) {
    return "비밀번호는 영문, 숫자, 특수 문자를 모두 포함해야 합니다.";
  }
  return undefined;
}

export function validateEmail(email: string): string | undefined {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "유효한 이메일 주소가 아닙니다.";
  }
  return undefined;
}
