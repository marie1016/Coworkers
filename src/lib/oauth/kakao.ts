import { OauthLogin } from "@/core/api/auth/authApi";

declare global {
  interface Window {
    Kakao: {
      Auth: {
        login: (options: {
          success: (response: { access_token: string }) => void;
          fail: (error: any) => void;
        }) => void;
      };
      init: (key: string) => void;
      isInitialized: () => boolean;
    };
  }
}

const handleKakaoLogin = async () => {
  if (typeof window.Kakao !== "undefined") {
    // Kakao SDK가 초기화되어 있지 않다면 초기화
    if (!window.Kakao.isInitialized()) {
      console.log("kakao :", process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY as string);
    }

    // Kakao 로그인 호출
    window.Kakao.Auth.login({
      success: async (response) => {
        const token = response.access_token;
        try {
          await OauthLogin("kakao", token); // OAuth 로그인 함수 호출
        } catch (error) {
          console.log("oauth :", error.response?.data || error.message);
        }
      },
      fail: (error) => {
        console.error("Kakao login failed:", error);
      },
    });
  } else {
    console.error("Kakao SDK is not loaded.");
  }
};

export default handleKakaoLogin;
