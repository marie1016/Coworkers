/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import { useAuth } from "@/core/context/AuthProvider";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Profile from "./Profile";

export default function AuthHeader() {
  const router = useRouter();

  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  const teamList =
    user?.memberships.map((team) => ({
      id: team.groupId,
      name: team.group.name,
      image: team.group.image,
    })) ?? [];

  const hasTeam = teamList.length > 0;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectTeam = (teamId: number) => {
    setSelectedTeamId(teamId);
    setIsDropdownOpen(false);
  };

  const selectedTeam =
    teamList.find((team) => team.id === selectedTeamId)?.name ?? null;

  useEffect(() => {
    if (router.isReady && typeof router.query.teamId === "string") {
      setSelectedTeamId(Number(router.query.teamId));
      return;
    }
    setSelectedTeamId(null);
  }, [router.isReady, router.query.teamId]);

  return (
    <div>
      <header className="fixed left-0 right-0 top-0 z-40 flex h-[60px] items-center justify-between gap-2.5 border-b border-border-primary border-opacity-10 bg-background-secondary px-4">
        <div className="flex w-full items-center justify-between gap-4 md:gap-8 lg:mx-auto lg:max-w-[1200px]">
          <div className="flex items-center gap-4 md:gap-8 lg:gap-12">
            {/* 햄버거 버튼: 모바일에서만 보임 */}
            <button onClick={toggleSidebar} className="md:hidden lg:hidden">
              <Image
                src="/icons/icon-gnb_menu.png"
                width={24}
                height={24}
                alt="메뉴 버튼"
              />
            </button>

            <Link href="/" className="flex items-center">
              <Image
                src="/icons/icon-logo_coworkers_large.png"
                width={102}
                height={20}
                alt="홈 바로가기"
              />
            </Link>

            <div className="relative flex items-center [&&]:sm:hidden">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2.5"
              >
                {selectedTeam ?? "내가 속한 팀"}
                <Image
                  src="/icons/icon-check.png"
                  width={16}
                  height={16}
                  alt="드롭다운"
                />
              </button>

              {isDropdownOpen && (
                <div className="fixed left-4 top-[68px] z-50 w-[218px] gap-2.5 rounded-xl bg-background-secondary p-4 lg:left-[calc((100vw-1200px)/2+10px)] lg:top-[68px]">
                  {hasTeam ? (
                    <ul className="font-lg gap-4">
                      {teamList.map((team) => (
                        <li
                          key={team.id}
                          className={`mb-3 flex cursor-pointer items-center justify-between gap-2.5 rounded-lg px-2 py-[7px] hover:bg-background-tertiary ${
                            selectedTeamId === team.id
                              ? "bg-background-tertiary"
                              : ""
                          }`}
                          onClick={() => router.push(`/${team.id}`)}
                        >
                          <div
                            className="flex w-full items-center gap-2"
                            onClick={() => selectTeam(team.id)}
                          >
                            <Image
                              src={team.image ?? "/icons/icon-user.png"}
                              width={32}
                              height={32}
                              alt="팀 이미지"
                              className="rounded-md"
                            />
                            <span>{team.name}</span>
                          </div>
                          {/* 케밥 버튼 */}
                          <button
                            className="cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Image
                              src="/icons/icon-kebab.png"
                              width={16}
                              height={16}
                              alt="케밥 버튼"
                              onClick={() => console.log("케밥 버튼 클릭")}
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {/* 팀 추가하기 버튼 */}
                  <button
                    onClick={() => router.push("/addteam")}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-border-primary py-3 text-center"
                  >
                    <Image
                      src="/icons/icon-plus.png"
                      width={16}
                      height={16}
                      alt="플러스"
                    />
                    팀 추가하기
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 프로필 */}
          <div className="flex items-center">
            <div className="flex items-center justify-center gap-2">
              <Profile />
              <span className="text-lg leading-tight sm:hidden md:hidden lg:block">
                {user?.nickname ?? "guest"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 사이드바 */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-[204px] transform border-r border-border-primary border-opacity-10 bg-background-secondary transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between p-4">
          {/* 사이드바 닫기 버튼 */}
          <button onClick={toggleSidebar} className="ml-auto">
            <Image src="/icons/icon-x.png" width={24} height={24} alt="닫기" />
          </button>
        </div>

        <div className="p-4 text-text-md">
          {hasTeam ? (
            <ul className="flex flex-col gap-[35px] text-text-primary">
              {teamList.map((team) => (
                <li key={team.id}>{team.name}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      {/* 배경 어둡게 (사이드바 열림 시) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
