import Image from "next/image";

export default function GoogleLogin() {
    const handleGoogleLogin = () => {
        const state = crypto.randomUUID();
    
        sessionStorage.setItem("oauth_state", state);
    
        const googleAuthUrl =
          `https://accounts.google.com/o/oauth2/v2/auth` +
          `?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}` +
          `&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}` +
          `&response_type=code` +
          `&scope=openid email profile` +
          `&state=${state}`;
    
        window.location.href = googleAuthUrl;
      };
  return (
    <button type="button" onClick={handleGoogleLogin}>
    <Image
      src="/icons/icon-google.png"
      alt="구글 간편 회원가입"
      width={42}
      height={42}
    />
  </button>
  );
}