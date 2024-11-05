import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { SignupRequestDto } from "@/core/dtos/auth/authDto";
import { signup as signupAPI } from "@/core/api/auth/authApi";
import axios, { AxiosError } from "axios";

interface ExtendedSession {
  user: {
    name: string;
    email: string;
    image?: string;
  };
  accessToken: string | null;
}

interface AuthContextType {
  user: ExtendedSession["user"] | null;
  accessToken: string | null;
  handleLogin: (provider: "google" | "kakao") => void;
  handleEmailLogin: (email: string, password: string) => Promise<void>;
  handleSignup: (data: SignupRequestDto) => Promise<void>;
  handleLogout: () => void;
  loading: boolean;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  accessToken: null,
  handleLogin: () => {},
  handleEmailLogin: async () => {},
  handleSignup: async () => {},
  handleLogout: () => {},
  loading: false,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const hasNavigated = useRef(false);
  const [loading, setLoading] = useState(false);

  const extendedSession = session as unknown as ExtendedSession;
  const { user, accessToken } = extendedSession || {};
  const defaultImage = "/images/image-dafaultProfile.png";
  const { name, email: userEmail, image = defaultImage } = user || {};

  useEffect(() => {
    if (status === "authenticated" && user && !hasNavigated.current) {
      console.log("로그인 상태입니다:");
      console.log("닉네임:", name);
      console.log("이메일:", userEmail);

      hasNavigated.current = true;
      alert("로그인 성공");
      router.push("/");
    }
  }, [status, user, router]);

  const handleLogin = async (provider: "google" | "kakao") => {
    try {
      const result = await signIn(provider, { redirect: false });
      if (result?.ok) {
        const updatedUser = {
          name: session?.user?.name ?? "닉네임 없음",
          email: session?.user?.email,
          image: session?.user?.image ?? defaultImage,
        };

        await update({
          user: updatedUser,
          accessToken: extendedSession?.accessToken,
        });

        console.log("간편 로그인 성공:", updatedUser);
        router.push("/");
      } else {
        throw new Error("간편 로그인 실패");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("간편 로그인 실패:", error.message);
        alert(`간편 로그인 실패 : ${error.message}`);
      } else {
        console.error("알 수 없는 오류 발생 :", error);
        alert("간편 로그인 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const handleEmailLogin = async (email: string, password: string) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        alert(`로그인 실패: ${result.error}`);
      } else {
        alert("로그인 성공");
        router.push("/");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패");
    }
  };

  const handleSignup = async (data: SignupRequestDto) => {
    try {
      setLoading(true);
      const response = await signupAPI(data);
      if (response.data) {
        alert("회원가입 성공");
        router.push("/login");
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axios.isAxiosError(axiosError)) {
        if (axiosError.response?.status === 400) {
          alert("이미 존재하는 계정입니다.");
          router.push("/login");
        } else if (axiosError.response) {
          console.error("회원가입 실패:", axiosError.response.data);
          alert(
            `회원가입 실패: ${axiosError.response.data?.message ?? "오류 발생"}`,
          );
        }
      } else {
        console.error("회원가입 실패:", error);
        alert(`회원가입 실패: ${(error as Error).message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    signOut({ callbackUrl: "/" });
  };

  const value = useMemo(
    () => ({
      user: { ...user, image },
      accessToken,
      handleLogin,
      handleEmailLogin,
      handleSignup,
      handleLogout,
      loading,
    }),
    [user, accessToken, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
