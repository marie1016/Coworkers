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
import signIn from "../api/user/signIn";
import updateUser from "../api/user/updateUser";
import deleteUser from "../api/user/deleteUser";

interface AuthValues {
  user: User | null;
  isPending: boolean;
}

interface AuthContextValues {
  user: User | null;
  isPending: boolean;
  login: (loginForm: LoginForm) => Promise<LoginResponse>;
  isLoginPending: boolean;
  logout: () => void;
  updateMe: (updateUserForm: UpdateUserForm) => Promise<UpdateUserResponse>;
  isUpdatePending: boolean;
  deleteMe: () => Promise<unknown>;
  isDeletionPending: boolean;
}

const INITIAL_AUTH_VALUES: AuthContextValues = {
  user: null,
  isPending: true,
  login: () => Promise.reject(),
  isLoginPending: false,
  logout: () => {},
  updateMe: () => Promise.reject(),
  isUpdatePending: false,
  deleteMe: () => Promise.reject(),
  isDeletionPending: false,
};

const AuthContext = createContext<AuthContextValues>(INITIAL_AUTH_VALUES);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthValues>({
    user: null,
    isPending: true,
  });

  const { mutate: getMe } = useMutation({
    mutationFn: getUser,
    onMutate: () => {
      setAuthState((prev) => ({
        ...prev,
        isPending: true,
      }));
    },
    onSuccess: (data) => {
      setAuthState({
        user: data,
        isPending: false,
      });
    },
    onError: (e) => {
      setAuthState({
        user: null,
        isPending: false,
      });
      console.error(e);
    },
  });

  const { mutateAsync: login, isPending: isLoginPending } = useMutation({
    mutationFn: (loginForm: LoginForm) => signIn(loginForm),
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data;
      saveTokens({ accessToken, refreshToken });
      getMe();
    },
    onError: (e) => {
      console.error(e);
      return e;
    },
  });

  const logout = useCallback(() => {
    removeTokens();
    setAuthState({
      user: null,
      isPending: false,
    });
  }, []);

  const { mutateAsync: updateMe, isPending: isUpdatePending } = useMutation({
    mutationFn: (updateUserForm: UpdateUserForm) => updateUser(updateUserForm),
    onSuccess: () => getMe(),
    onError: (e) => {
      console.error(e);
      return e;
    },
  });

  const { mutateAsync: deleteMe, isPending: isDeletionPending } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => logout(),
    onError: (e) => {
      console.error(e);
      return e;
    },
  });

  useEffect(() => {
    if (localStorage.getItem(TOKENS.REFRESH_TOKEN)) {
      getMe();
      return;
    }
    setAuthState({
      user: null,
      isPending: false,
    });
  }, [getMe]);

  const { user, isPending } = authState;
  const authValues = useMemo(
    () => ({
      user,
      isPending,
      login,
      isLoginPending,
      logout,
      updateMe,
      isUpdatePending,
      deleteMe,
      isDeletionPending,
    }),
    [
      user,
      isPending,
      login,
      isLoginPending,
      logout,
      updateMe,
      isUpdatePending,
      deleteMe,
      isDeletionPending,
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
  const { asPath, isReady } = router;
  useEffect(() => {
    if (required && !user && !isPending && isReady) {
      router.replace(`/unauthorized?direction=${asPath}`);
    }
  }, [required, user, isPending, isReady]);

  return context;
}
