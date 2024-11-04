import { useAuth } from "@/core/context/AuthProvider";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Login() {
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignInForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(signInForm);
    } catch {
      alert("로그인 실패: 에러 정보는 콘솔에서 확인");
      return;
    }
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
