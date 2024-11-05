import AddTaskListModal from "@/components/@shared/AddTaskListModal";
import Dropdown from "@/components/@shared/UI/Dropdown";
import DropdownItem from "@/components/@shared/UI/Item";
import Image from "next/image";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import DeleteTaskListModal from "./DeleteTaskListModal";

interface Props {
  teamId: string;
  taskListId: string;
  name: string;
}

export default function TaskListMenu({ teamId, taskListId, name }: Props) {
  const [isPatchModalOpen, setIsPatchModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
      <AddTaskListModal
        isOpen={isPatchModalOpen}
        onClose={() => setIsPatchModalOpen(false)}
        teamId={teamId}
        submitCallback={refreshGroup}
        defaultPatchForm={{
          taskListId,
          name,
        }}
      />
      <DeleteTaskListModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        teamId={teamId}
        taskListId={taskListId}
      />
    </>
  );
}
