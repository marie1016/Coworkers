import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

interface User {
  id?: string;
  nickname: string;
  email: string;
  image?: string;
}

interface SignInResponse {
  user: User;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
    }),
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;

        try {
          const response = await axios.post<SignInResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/signIn`,
            { email, password },
          );
          const { user } = response.data;

          return {
            id: user.id ?? "default-id",
            ...user,
          };
        } catch (error) {
          console.error("로그인 실패:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, account, user }) {
      const updatedToken = { ...token };
      if (account) {
        updatedToken.accessToken = account.access_token;
        updatedToken.provider = account.provider;
      }
      if (user) {
        const userWithNickname = user as User & { nickname?: string };
        updatedToken.name = userWithNickname.nickname ?? userWithNickname.name;
      }

      return updatedToken;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name ?? "이름 없음",
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
