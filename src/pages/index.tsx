import Link from "next/link";

export default function Home() {
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
    </div>
  );
}
