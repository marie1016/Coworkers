import Dropdown from "@/components/@shared/UI/Dropdown";
import DropdownItem from "@/components/@shared/UI/DropdownItem";
import Image from "next/image";
import useModalStore from "@/lib/hooks/stores/modalStore";
import PatchTeamModal from "./PatchTeamModal";
import DeleteTeamModal from "./DeleteTeamModal";
import DeleteMemberModal from "./DeleteMemberModal";

interface Props {
  teamId: string;
  teamName: string;
  teamImage: string;
  memberId: number;
  isAdmin: boolean;
  refreshGroup: () => void;
}

export default function TeamGear({
  teamId,
  teamName,
  teamImage,
  memberId,
  isAdmin,
  refreshGroup,
}: Props) {
  const patchTeamModalName = "patchTeamModal";
  const deleteTeamModalName = "deleteTeamModal";
  const deleteMemberModalName = "deleteMemberModal";

  const isPatchModalOpen = useModalStore(
    (state) => state.modals[patchTeamModalName],
  );
  const isDeleteTeamModalOpen = useModalStore(
    (state) => state.modals[deleteTeamModalName],
  );
  const isDeleteMemberModalOpen = useModalStore(
    (state) => state.modals[deleteMemberModalName],
  );

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const patchTeamForm = {
    teamId,
    defaultName: teamName,
    defaultImage: teamImage,
  };
  const patchTeamCallback = () => {
    refreshGroup();
    closeModal(patchTeamModalName);
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
        {isAdmin ? (
          <>
            <DropdownItem
              onClick={() => openModal(patchTeamModalName)}
              itemClassName="h-10 flex justify-center items-center"
            >
              수정하기
            </DropdownItem>
            <DropdownItem
              onClick={() => openModal(deleteTeamModalName)}
              itemClassName="h-10 flex justify-center items-center"
            >
              삭제하기
            </DropdownItem>
          </>
        ) : null}
        <DropdownItem
          onClick={() => openModal(deleteMemberModalName)}
          itemClassName="h-10 flex justify-center items-center"
        >
          탈퇴하기
        </DropdownItem>
      </Dropdown>
      <PatchTeamModal
        isOpen={isPatchModalOpen}
        onClose={() => closeModal(patchTeamModalName)}
        submitCallback={patchTeamCallback}
        formValues={patchTeamForm}
      />
      <DeleteTeamModal
        isOpen={isDeleteTeamModalOpen}
        onClose={() => closeModal(deleteTeamModalName)}
        teamId={teamId}
      />
      <DeleteMemberModal
        isOpen={isDeleteMemberModalOpen}
        onClose={() => closeModal(deleteMemberModalName)}
        teamId={teamId}
        memberId={`${memberId}`}
      />
    </>
  );
}
