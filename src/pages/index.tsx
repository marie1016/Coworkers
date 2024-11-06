
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axiosInstance from "@/core/api/axiosInstance";
import { AxiosResponse } from "axios";

import Link from "next/link";

export default function Home() {

  const [userInfo, setUserInfo] = useState(INITIAL_USER_INFO);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/user");
      if (response && response.data) {
        const { nickname, email } = response.data;
        console.log("User Info:", { nickname, email });
      } else {
        console.error("User data is not available");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);


  return (
    <div>
      <Link href="/signup">회원가입 페이지</Link>
      <br />
      <Link href="/login">로그인 페이지</Link>
      <br />
      <Link href="/addteam">팀 생성하기 페이지</Link>
      <br />
      <Link href="/mypage">마이페이지</Link>
      <br />
      <Link href="/boards">자유게시판</Link>
      <br />
      <Link href="/addboard">게시물 등록 페이지</Link>
      <br />
      <Link href={`/participate${user ? `?email=${user.email}` : ""}`}>
        팀 참여 페이지
      </Link>
      <br />
      <Link href="/landing">랜딩 페이지</Link>
      <br />
      <Link href="/account">계정 설정 페이지</Link>
      <br />
      <br />
      <h2 className="text-text-3xl">내가 속한 팀</h2>
      <br />
      {user?.memberships.map((membership) => (
        <>
          <Link href={`/${membership.groupId}`} key={membership.groupId}>
            {membership.group.name}
          </Link>
          <br />
        </>
      ))}
    </div>
  );
}
