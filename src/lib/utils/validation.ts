// 비밀번호 유효성 검사 함수
export function validatePassword(password: string): string | undefined {
  const minLength = 8;
  const maxLength = 12;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password);

  if (!password) {
    return "비밀번호를 입력해주세요";
  }

  if (password.length < minLength || password.length > maxLength) {
    if (!hasLetter || !hasNumber || !hasSpecialChar) {
      return "영문, 숫자, 특수 문자를 모두 포함해야 하며 8자 이상 12자 이내로 작성해주세요.";
    }
    return "8자 이상 12자 이내로 작성해주세요.";
  }
  if (!hasLetter || !hasNumber || !hasSpecialChar) {
    return "영문, 숫자, 특수 문자를 모두 포함하여 작성해주세요.";
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
