import Dropdown from "@/components/@shared/UI/Dropdown";
import DropdownItem from "@/components/@shared/UI/Item";
import Image from "next/image";
import { useState } from "react";
import MemberProfileModal from "./MemberProfileModal";
import DeleteMemberModal from "./DeleteMemberModal";

interface Props {
  teamId: string;
  memberId: string;
  image: string;
  name: string;
  email: string;
}

export default function MemberMenu({
  teamId,
  memberId,
  image,
  name,
  email,
}: Props) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMemberDeleteModalOpen, setIsMemberDeleteModalOpen] = useState(false);

  return (
    <>
      <Dropdown
        trigger={
          <div className="relative h-4 w-4">
            <Image fill src="/icons/icon-kebab.svg" alt="메뉴" />
          </div>
        }
        menuClassName="flex flex-col text-text-primary font-regular text-text-md w-[7.5rem] bg-background-secondary border border-solid border-border-primary right-0 top-6"
      >
        <DropdownItem
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          itemClassName="h-10 flex justify-center items-center"
        >
          프로필 보기
        </DropdownItem>
      </Dropdown>
      <MemberProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        image={image}
        name={name}
        email={email}
      />
      <DeleteMemberModal
        isOpen={isMemberDeleteModalOpen}
        onClose={() => setIsMemberDeleteModalOpen(false)}
        teamId={teamId}
        memberId={memberId}
      />
    </>
  );
}
