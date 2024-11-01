/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { SignupRequestDto } from "@/core/dtos/auth/authDto";
import { signup as signupAPI } from "@/core/api/auth/authApi";

interface ExtendedSession {
  user: {
    name: string;
    email: string;
  };
  accessToken: string | null;
}

interface AuthContextType {
  user: any;
  accessToken: string | null;
  handleLogin: (provider: "google" | "kakao") => void;
  handleSignup: (data: SignupRequestDto) => Promise<void>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const hasNavigated = useRef(false);

  const extendedSession = session as unknown as ExtendedSession;

  useEffect(() => {
    if (
      status === "authenticated" &&
      extendedSession?.user &&
      !hasNavigated.current
    ) {
      console.log("로그인 상태입니다:");
      console.log("이름:", extendedSession.user.name);
      console.log("이메일:", extendedSession.user.email);

      if (!hasNavigated.current) {
        hasNavigated.current = true;

        if (typeof window !== "undefined") {
          if (
            window.performance &&
            window.performance.navigation.type ===
              window.performance.navigation.TYPE_RELOAD
          ) {
            router.push("/");
          } else {
            alert("로그인 성공");
            router.push("/");
          }
        }
      }
    }
  }, [status, extendedSession, router]);

  const handleLogin = (provider: "google" | "kakao") => {
    signIn(provider);
  };

  const handleSignup = async (data: SignupRequestDto) => {
    try {
      const response = await signupAPI(data);
      if (response.data) {
        alert("회원가입 성공");
        router.push("/login");
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        alert("이미 존재하는 계정입니다.");
        router.push("/login");
      } else if (error.response) {
        console.error("회원가입 실패:", error.response.data);
        alert(`회원가입 실패: ${error.response.data?.message ?? "오류 발생"}`);
      } else {
        console.error("회원가입 실패:", error);
        alert(`회원가입 실패: ${error.message}`);
      }
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const value = useMemo(
    () => ({
      user: extendedSession?.user || null,
      accessToken: extendedSession?.accessToken ?? null,
      handleLogin,
      handleSignup,
      handleLogout,
    }),
    [extendedSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
