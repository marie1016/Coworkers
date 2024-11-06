export interface SignupRequestDto {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface ResetPasswordEmailRequestDto {
  email: string;
  redirectUrl: string;
}

export interface ResetPasswordRequestDto {
  passwordConfirmation: string;
  password: string;
  token: string;
}

export interface PasswordRequestDto {
  passwordConfirmation: string;
  password: string;
}

export type SignupResponseDto = AuthResponseDto;
export type LoginResponseDto = AuthResponseDto;
