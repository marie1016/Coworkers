import Dropdown from "@/components/@shared/UI/Dropdown";
import DropdownItem from "@/components/@shared/UI/Item";
import Image from "next/image";

export default function MemberMenu() {
  return (
    <Dropdown
      trigger={
        <div className="relative h-4 w-4">
          <Image fill src="/icons/icon-kebab.svg" alt="메뉴" />
        </div>
      }
      menuClassName="flex flex-col text-text-primary font-regular text-text-md w-[7.5rem] bg-background-secondary border border-solid border-border-primary right-0 top-6"
    >
      <DropdownItem
        onClick={() => {}}
        itemClassName="h-10 flex justify-center items-center"
      >
        프로필 보기
      </DropdownItem>
      <DropdownItem
        onClick={() => {}}
        itemClassName="h-10 flex justify-center items-center"
      >
        강퇴
      </DropdownItem>
    </Dropdown>
  );
}
