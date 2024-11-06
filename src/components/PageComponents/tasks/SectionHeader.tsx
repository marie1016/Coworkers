import AddTaskListModal from "@/components/@shared/AddTaskListModal";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import TaskDate from "./TaskDate";

export interface SectionHeaderProps {
  teamId: string;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

export default function SectionHeader({
  teamId,
  selectedDate,
  setSelectedDate,
}: SectionHeaderProps) {
  const [isAddTaskListModalOpen, setIsAddTaskListModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const refreshGroup = () => {
    queryClient.invalidateQueries({ queryKey: ["group", teamId] });
  };

  return (
    <>
      <h1 className="text-text-xl font-bold text-text-primary">할 일</h1>
      <div className="my-6 flex items-center justify-between">
        <TaskDate
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <p
          className="cursor-pointer text-text-md font-regular text-brand-primary"
          onClick={() => setIsAddTaskListModalOpen(!isAddTaskListModalOpen)}
        >
          +새로운 목록 추가하기
        </p>
      </div>
      <AddTaskListModal
        isOpen={isAddTaskListModalOpen}
        onClose={() => setIsAddTaskListModalOpen(false)}
        teamId={teamId}
        submitCallback={refreshGroup}
      />
    </>
  );
}
