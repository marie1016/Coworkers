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
import axiosInstance from "@/core/api/axiosInstance";
import { SignupRequestDto } from "@/core/dtos/auth/authDto";
import {
  login as loginAPI,
  signup as signupAPI,
} from "@/core/api/auth/authApi";

interface ExtendedSession {
  user: {
    nickname: string;
    email: string;
    image?: string;
  };
  accessToken: string | null;
}

interface AuthContextType {
  user: any;
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const hasNavigated = useRef(false);
  const [loading, setLoading] = useState(false);

  const extendedSession = session as unknown as ExtendedSession;
  const { user, accessToken } = extendedSession || {};
  const { nickname, email, image } = user || {};

  useEffect(() => {
    if (status === "authenticated" && user && !hasNavigated.current) {
      console.log("로그인 상태입니다:");
      console.log("닉네임:", nickname);
      console.log("이메일:", email);

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
          nickname: session?.user?.name || "닉네임 없음", // 간편 로그인 시 name을 nickname으로 설정
          email: session?.user?.email,
          image: session?.user?.image,
        };

        await update({ user: updatedUser, accessToken: session?.accessToken });

        console.log("간편 로그인 성공:", updatedUser);
        router.push("/");
      } else {
        throw new Error("간편 로그인 실패");
      }
    } catch (error) {
      console.error("간편 로그인 실패:", error);
      alert("간편 로그인 실패");
    }
  };

  const handleEmailLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await loginAPI({ email, password });
      if (response.data) {
        const { accessToken, refreshToken, user } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${accessToken}`;

        const updatedUser = {
          nickname: user.nickname || "이름 없음",
          email: user.email,
          image: user.imageUrl || null,
        };

        setUser(updatedUser); // Update the user state directly
        setAccessToken(accessToken);

        console.log("로그인 성공:", updatedUser);
        alert("로그인 성공");
        router.push("/");
      }
    } catch (error: any) {
      console.error("로그인 실패:", error);
      if (error.response?.status === 401) {
        alert("인증에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
      } else if (error.response?.status === 403) {
        alert("접근 권한이 없습니다. 관리자에게 문의하세요.");
      } else {
        alert("로그인 실패");
      }
    } finally {
      setLoading(false);
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
      user,
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
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
