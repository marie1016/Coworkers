import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "@/core/context/AuthProvider";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";

export default function Profile() {
  const router = useRouter();
  const { logout } = useAuth();
  const profileImageUrl = "/icons/icon-user.png";

  // 드롭다운 항목 클릭 핸들러 정의 -> 수정 예정
  const handleMyHistoryClick = () => {
    router.push("/myhistory");
  };

  const handleJoinTeamClick = () => {
    router.push("/participate");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <Dropdown
      trigger={
        <Image
          src={profileImageUrl}
          width={24}
          height={24}
          alt="프로필 이미지"
          className="mt-[60px]flex cursor-pointer rounded-full"
        />
      }
      menuClassName="border-opacity-10 absolute top-full mt-2 z-10 w-[140px] max-h-[200px] overflow-y-auto border border-border-primary bg-background-secondary"
    >
      <DropdownItem
        onClick={handleMyHistoryClick}
        itemClassName="px-4 py-2 text-center text-md font-regular text-text-primary"
      >
        마이 히스토리
      </DropdownItem>
      <DropdownItem
        onClick={() => {}}
        itemClassName="px-4 py-2 text-center text-md font-regular text-text-primary"
      >
        계정 설정
      </DropdownItem>
      <DropdownItem
        onClick={handleJoinTeamClick}
        itemClassName="px-4 py-2 text-center text-md font-regular text-text-primary"
      >
        팀 참여
      </DropdownItem>
      <DropdownItem
        onClick={handleLogout}
        itemClassName="px-4 py-2 text-center text-md font-regular text-text-primary"
      >
        로그아웃
      </DropdownItem>
    </Dropdown>
  );
}
