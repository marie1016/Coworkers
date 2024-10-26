import AddTaskListModal from "@/components/@shared/AddTaskListModal";
import Dropdown from "@/components/@shared/UI/Dropdown";
import DropdownItem from "@/components/@shared/UI/Item";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import useModalStore from "@/lib/hooks/stores/modalStore";
import DeleteTaskListModal from "./DeleteTaskListModal";

interface Props {
  teamId: string;
  taskListId: string;
  name: string;
}

export default function TaskListMenu({ teamId, taskListId, name }: Props) {
  const patchModalName = "patchModal";
  const deleteModalName = "deleteModal";

  const isPatchModalOpen = useModalStore(
    (state) => state.modals[patchModalName],
  );
  const isDeleteModalOpen = useModalStore(
    (state) => state.modals[deleteModalName],
  );

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const queryClient = useQueryClient();
  const refreshGroup = () => {
    queryClient.invalidateQueries({ queryKey: ["group", teamId] });
  };

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
          onClick={() => openModal(patchModalName)}
          itemClassName="h-10 flex justify-center items-center"
        >
          수정하기
        </DropdownItem>
        <DropdownItem
          onClick={() => openModal(deleteModalName)}
          itemClassName="h-10 flex justify-center items-center"
        >
          삭제하기
        </DropdownItem>
      </Dropdown>
      <AddTaskListModal
        isOpen={isPatchModalOpen}
        onClose={() => closeModal(patchModalName)}
        teamId={teamId}
        submitCallback={refreshGroup}
        defaultPatchForm={{
          taskListId,
          name,
        }}
      />
      <DeleteTaskListModal
        isOpen={isDeleteModalOpen}
        onClose={() => closeModal(deleteModalName)}
        teamId={teamId}
        taskListId={taskListId}
      />
    </>
  );
}
