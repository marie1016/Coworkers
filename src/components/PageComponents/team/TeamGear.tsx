import Dropdown from "@/components/@shared/UI/Dropdown";
import DropdownItem from "@/components/@shared/UI/Item";
import Image from "next/image";
import { useState } from "react";
import PatchTeamModal from "./PatchTeamModal";
import DeleteTeamModal from "./DeleteTeamModal";

interface Props {
  teamId: string;
  teamName: string;
  teamImage: string;
  refreshGroup: () => void;
}

export default function TeamGear({
  teamId,
  teamName,
  teamImage,
  refreshGroup,
}: Props) {
  const [isPatchModalOpen, setIsPatchModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const patchTeamForm = {
    teamId,
    defaultName: teamName,
    defaultImage: teamImage,
  };
  const patchTeamCallback = () => {
    refreshGroup();
    setIsPatchModalOpen(false);
  };

  return (
    <>
      <Dropdown
        trigger={
          <div className="relative h-6 w-6">
            <Image fill src="/icons/icon-gear.svg" alt="팀 설정" />
          </div>
        }
        menuClassName="flex flex-col text-text-primary font-regular text-text-md w-[7.5rem] bg-background-secondary border border-solid border-border-primary right-0 top-8"
      >
        <DropdownItem
          onClick={() => setIsPatchModalOpen(!isPatchModalOpen)}
          itemClassName="h-10 flex justify-center items-center"
        >
          수정하기
        </DropdownItem>
        <DropdownItem
          onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
          itemClassName="h-10 flex justify-center items-center"
        >
          삭제하기
        </DropdownItem>
      </Dropdown>
      <PatchTeamModal
        isOpen={isPatchModalOpen}
        onClose={() => setIsPatchModalOpen(false)}
        submitCallback={patchTeamCallback}
        formValues={patchTeamForm}
      />
      <DeleteTeamModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        teamId={teamId}
      />
    </>
  );
}
