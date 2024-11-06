import { Task } from "@/core/dtos/tasks/tasks";
import Checkbox from "@/components/@shared/UI/Checkbox";
import Image from "next/image";
import { formatDate } from "@/lib/utils/date";
import { useRouter } from "next/router";
import useModalStore from "@/lib/hooks/stores/modalStore";
import { getFrequencyLabel } from "@/lib/constants/frequencyType";
import usePatchTaskDone from "@/lib/hooks/tasks/usePatchTaskDone";
import EditDropdown from "./EditDropdown";

interface TaskCardProps {
  taskItem: Task;
  selectedDate: Date | null;
  onTaskItemChange: (taskData: Task) => void;
}

export default function TaskCard({
  taskItem,
  selectedDate,
  onTaskItemChange,
}: TaskCardProps) {
  const { id, name, commentCount, frequency, doneAt } = taskItem;
  const router = useRouter();
  const teamId = router.query.teamId as string;
  const tasklist = router.query.tasklist as string;
  const { handleClick } = usePatchTaskDone(id, doneAt, selectedDate);

  const handleCheckboxChange = (checked: boolean) => {
    handleClick(checked);
  };

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const openTaskDetail = (taskData: Task) => {
    onTaskItemChange(taskData);
    openModal("taskDetail");
    router.push(
      `/${teamId}/tasks?tasklist=${tasklist}&taskItem=${taskData.id}`,
    );
  };

  const closeTaskDetail = () => {
    closeModal("taskDetail");
    router.push(`/${teamId}/tasks?tasklist=${tasklist}`);
  };

  const openEditTaskModal = (taskData: Task) => {
    onTaskItemChange(taskData);
    openModal("editTaskModal");
    closeTaskDetail();
  };

  const openDeleteTaskModal = (taskData: Task) => {
    onTaskItemChange(taskData);
    openModal("deleteTaskModal");
  };

  return (
    <>
      <div className="flex items-center justify-between sm:relative">
        <div className="flex items-center">
          <Checkbox
            className="max-w-[62.5rem] sm:w-[13rem] md:max-w-[37.5rem]"
            title={name}
            checked={!!doneAt}
            onChange={handleCheckboxChange}
            onTitleClick={() => openTaskDetail(taskItem)}
          />
          <div className="flex items-center sm:absolute sm:right-6">
            <Image
              className="ml-3 mr-0.5 sm:ml-12"
              src="/icons/icon-comment.svg"
              width={16}
              height={16}
              alt="댓글 아이콘"
            />
            <span> {commentCount}</span>
          </div>
        </div>
        <EditDropdown
          onEdit={() => openEditTaskModal(taskItem)}
          onDelete={() => openDeleteTaskModal(taskItem)}
        />
      </div>
      <div className="mt-2.5 flex items-center">
        <Image
          className="mr-1.5"
          src="/icons/icon-cardCalendar.svg"
          width={16}
          height={16}
          alt="카드캘린더 아이콘"
        />
        <span>{selectedDate && formatDate(selectedDate)}</span>
        <span className="mx-2.5 h-2 border-l border-background-tertiary" />
        <Image
          className="mr-1.5"
          src="/icons/icon-repeat.svg"
          width={16}
          height={16}
          alt="반복 아이콘"
        />
        <span>{getFrequencyLabel(frequency)}</span>
      </div>
    </>
  );
}
