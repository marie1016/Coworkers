import { OauthLogin } from "@/core/api/auth/authApi";

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          prompt: () => void;
        };
      };
    };
  }
}

const handleGoogleCallback = async (response: { credential: string }) => {
  const token = response.credential;
  await OauthLogin("google", token);
};

const initializeGoogleLogin = () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  console.log("google : ", clientId);

  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleGoogleCallback,
    });
  }
};

export default initializeGoogleLogin;
