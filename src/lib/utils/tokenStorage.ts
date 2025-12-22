import { Tokens } from "@/core/dtos/user/auth";

export const TOKENS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};

export function saveTokens(tokens: Tokens) {
  localStorage.setItem(TOKENS.ACCESS_TOKEN, tokens.accessToken);
  localStorage.setItem(TOKENS.REFRESH_TOKEN, tokens.refreshToken);
}

export function removeTokens() {
  localStorage.removeItem(TOKENS.ACCESS_TOKEN);
  localStorage.removeItem(TOKENS.REFRESH_TOKEN);
}
