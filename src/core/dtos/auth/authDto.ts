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
  user: {
    id: number;
    nickname: string;
    createdAt: string;
    updatedAt: string;
    imageUrl: string | null;
    teamId: string;
    email: string;
  };
}

export type SignupResponseDto = AuthResponseDto;
export type LoginResponseDto = AuthResponseDto;
