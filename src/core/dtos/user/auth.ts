import { Membership } from "./membership";

export interface UserBase {
  id: number;

  teamId: string;

  email: string;

  nickname: string;

  image: string;

  createdAt: string;

  updatedAt: string;
}

export interface Tokens {
  accessToken: string;

  refreshToken: string;
}

export interface RefreshTokenForm {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface User extends UserBase {
  memberships: Membership[];
}

export interface LoginForm {
  email: string;

  password: string;
}

export interface LoginResponse extends Tokens, UserBase {}

export interface UpdateUserForm {
  nickname?: string;

  image: string;
}

export interface UpdateUserResponse {
  message: string;
}
