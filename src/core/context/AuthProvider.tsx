
import axios, { AxiosError } from "axios";

import { useMutation } from "@tanstack/react-query";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/router";
import { removeTokens, saveTokens, TOKENS } from "@/lib/utils/tokenStorage";
import getUser from "../api/user/getUser";
import {
  LoginForm,
  LoginResponse,
  UpdateUserForm,
  UpdateUserResponse,
  User,
} from "../dtos/user/auth";

import updateUser from "../api/user/updateUser";
import deleteUser from "../api/user/deleteUser";
import { SignupRequestDto } from "../dtos/auth/authDto";
import { signup, login } from "../api/auth/authApi";


interface AuthValues {
  user: User | null;
  isPending: boolean;
}

interface AuthContextValues {
  user: User | null;
  isPending: boolean;

  isLoginPending: boolean;
  login: (loginForm: LoginForm) => Promise<LoginResponse>;
  logout: () => void;
  updateMe: (updateUserForm: UpdateUserForm) => Promise<UpdateUserResponse>;
  deleteMe: () => Promise<unknown>;
  handleLogin: (provider: "google" | "kakao") => Promise<void>;
  handleEmailLogin: (email: string, password: string) => Promise<void>;
  handleSignup: (data: SignupRequestDto) => Promise<void>;
  handleLogout: () => void;
  loading: boolean;
v
}

const INITIAL_AUTH_VALUES: AuthContextValues = {
  user: null,
  isPending: true,

  isLoginPending: false,
  login: () => Promise.reject(),
  logout: () => {},
  updateMe: () => Promise.reject(),
  deleteMe: () => Promise.reject(),
  handleLogin: async () => {},
  handleEmailLogin: async () => {},
  handleSignup: async () => {},
  handleLogout: () => {},
  loading: false,

};

const AuthContext = createContext<AuthContextValues>(INITIAL_AUTH_VALUES);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthValues>({
    user: null,
    isPending: true,
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { mutate: getMe } = useMutation({
    mutationFn: getUser,
    onMutate: () => setAuthState((prev) => ({ ...prev, isPending: true })),
    onSuccess: (data) => setAuthState({ user: data, isPending: false }),
    onError: (e) => {
      setAuthState({ user: null, isPending: false });

      console.error(e);
    },
  });


  const { mutateAsync: updateMe, isLoading: isUpdatePending } = useMutation({

    mutationFn: (updateUserForm: UpdateUserForm) => updateUser(updateUserForm),
    onSuccess: () => getMe(),
    onError: (e) => {
      console.error(e);
      return e;
    },
  });

  const { mutateAsync: deleteMe, isLoading: isDeletionPending } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      removeTokens();
      setAuthState({ user: null, isPending: false });
      router.push("/login");
    },

    onError: (e) => {
      console.error(e);
      return e;
    },
  });


  const handleLogin = async (provider: "google" | "kakao") => {
    try {
      const response = await login({ provider });
      if (response.data) {
        saveTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
        setAuthState({ user: response.data.user, isPending: false });
        alert("로그인 성공");
        router.push("/");
      } else {
        throw new Error("간편 로그인 실패");
      }
    } catch (error) {
      console.error("간편 로그인 실패:", error);
      alert("간편 로그인 중 오류가 발생했습니다.");
    }
  };

  const handleEmailLogin = async (email: string, password: string) => {
    try {
      const response = await login({ email, password });
      if (response.data) {
        const user = response.data.user;
        saveTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
        setAuthState({ user, isPending: false });
        alert("로그인 성공");
        router.push("/");
      } else {
        throw new Error("로그인 실패");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  const handleSignup = async (data: SignupRequestDto) => {
    try {
      setLoading(true);
      const response = await signup(data);

      if (response.data) {
        alert("회원가입 성공");
        router.push("/login");
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axios.isAxiosError(axiosError)) {
        if (axiosError.response?.status === 400) {
          alert("이미 존재하는 계정입니다.");
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

  useEffect(() => {
    if (localStorage.getItem(TOKENS.REFRESH_TOKEN)) {
      getMe();
    } else {
      setAuthState({ user: null, isPending: false });
    }
  }, [getMe]);

  const authValues = useMemo(
    () => ({
      ...authState,
      isLoginPending: loading,
      login,
      logout: () => {
        removeTokens();
        setAuthState({ user: null, isPending: false });
        router.push("/login");
      },
      updateMe,
      deleteMe,
      handleLogin,
      handleEmailLogin,
      handleSignup,
      handleLogout: () => router.push("/login"),
      loading,
    }),
    [
      authState,
      loading,
      router,
      getMe,
      handleLogin,
      handleEmailLogin,
      handleSignup,
      updateMe,
      deleteMe,

    ],
  );

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
}

export function useAuth(required?: boolean) {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Out of provider scope: AuthContext");

  const { user, isPending } = context;
  const router = useRouter();


  useEffect(() => {
    if (required && !user && !isPending) {
      router.replace(`/unauthorized`);
    }
  }, [required, user, isPending, router]);


  return context;
}
