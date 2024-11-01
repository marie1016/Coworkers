import Dropdown from "@/components/@shared/UI/Dropdown";
import DropdownItem from "@/components/@shared/UI/Item";
import Image from "next/image";

export default function TeamGear() {
  return (
    <Dropdown
      trigger={
        <div className="relative h-6 w-6">
          <Image fill src="/icons/icon-gear.svg" alt="팀 설정" />
        </div>
      }
      menuClassName="flex flex-col text-text-primary font-regular text-text-md w-[7.5rem] bg-background-secondary border border-solid border-border-primary right-0 top-8"
    >
      <DropdownItem
        onClick={() => {}}
        itemClassName="h-10 flex justify-center items-center"
      >
        수정하기
      </DropdownItem>
      <DropdownItem
        onClick={() => {}}
        itemClassName="h-10 flex justify-center items-center"
      >
        삭제하기
      </DropdownItem>
    </Dropdown>
  );
}
