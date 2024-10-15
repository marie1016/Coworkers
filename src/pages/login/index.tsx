import axiosInstance from "@/core/api/axiosInstance";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    teamId: string;
    email: string;
    nickname: string;
    image: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export default function Login() {
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignInForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let res: AxiosResponse<SignInResponse>;
    try {
      res = await axiosInstance.post("auth/signIn", signInForm);
    } catch (error) {
      alert("로그인 실패: 에러 정보는 콘솔에서 확인");
      console.error(error);
      return;
    }

    localStorage.setItem("accessToken", res.data.accessToken);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        이메일
        <input
          name="email"
          value={signInForm.email}
          className="text-black"
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        패스워드
        <input
          name="password"
          value={signInForm.password}
          className="text-black"
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">로그인</button>
    </form>
  );
}
