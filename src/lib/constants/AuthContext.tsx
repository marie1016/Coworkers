import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { useRouter } from "next/router";
import { login, signup, OauthLogin } from "@/core/api/auth/authApi";
import {
  LoginRequestDto,
  SignupResponseDto,
  SignupRequestDto,
} from "@/core/dtos/auth/authDto";

interface AuthContextType {
  user: SignupResponseDto["user"] | null;
  accessToken: string | null;
  login: (data: LoginRequestDto) => Promise<void>;
  signup: (data: SignupRequestDto) => Promise<void>;
  logout: () => void;
  handleOAuthLogin: (
    provider: "google" | "kakao",
    token: string,
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<SignupResponseDto["user"] | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userInfo = localStorage.getItem("user");

    if (token && userInfo) {
      setAccessToken(token);
      try {
        const parsedUserInfo: SignupResponseDto["user"] = JSON.parse(userInfo);
        setUser(parsedUserInfo);
      } catch (error) {
        console.error("User info parsing error:", error);
        setUser(null);
      }
    }
  }, []);

  const handleLogin = async (data: LoginRequestDto): Promise<void> => {
    const response = await login(data);
    const userData: SignupResponseDto["user"] = response.data.user;
    setAccessToken(response.data.accessToken);
    setUser(userData);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("user", JSON.stringify(userData));
    router.push("/");
  };

  const handleSignup = async (data: SignupRequestDto): Promise<void> => {
    const response = await signup(data);
    const userData: SignupResponseDto["user"] = response.data.user;
    setAccessToken(response.data.accessToken);
    setUser(userData);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("user", JSON.stringify(userData));
    router.push("/");
  };

  const handleLogout = (): void => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  const handleOAuthLogin = async (
    provider: "google" | "kakao",
    token: string,
  ): Promise<void> => {
    try {
      const response = await OauthLogin(provider, token);
      console.log("login response :", response);
      if (response.status === 403) {
        router.push("/auth/signup");
      } else {
        console.error(
          "OAuth Login Error:",
          error.response?.data || error.message,
        );
      }
    } catch (error) {
      console.error("OAuth 로그인 에러:", error);
    }
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      accessToken,
      login: handleLogin,
      signup: handleSignup,
      logout: handleLogout,
      handleOAuthLogin,
    }),
    [user, accessToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext가 없습니다.");
  }
  return context;
};
