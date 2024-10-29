import { Task } from "@/core/dtos/tasks/tasks";
import { useState, Suspense } from "react";
import { useRouter } from "next/router";
import FloatingButton from "@/components/@shared/UI/FloatingButton";
import TaskLists from "@/components/PageComponents/tasks/TaskLists";
import TaskCardList from "@/components/PageComponents/tasks/TaskCardList";
import useModalStore from "@/lib/hooks/stores/modalStore";
import TaskFormModal from "@/components/PageComponents/tasks/TaskFormModal";
import { ErrorBoundary } from "react-error-boundary";
import SectionHeader from "@/components/PageComponents/tasks/SectionHeader";
import DeleteTaskModal from "@/components/PageComponents/tasks/DeleteTaskModal";

export default function Tasks() {
  const router = useRouter();
  const teamId = router.query.teamId as string;
  const { tasklist } = router.query;
  const numericTaskListId = parseInt(tasklist as string, 10);

  const [selectedTaskListId, setSelectedTaskListId] =
    useState<number>(numericTaskListId);
  const [selectedTaskItem, setSelectedTaskItem] = useState<Task | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleTaskListClick = (taskListId: number) => {
    setSelectedTaskListId(taskListId);
  };

  const openModal = useModalStore((state) => state.openModal);

  const openTaskFormModal = (taskItem: Task | null) => {
    setSelectedTaskItem(taskItem);
    openModal("taskFormModal");
  };

  const handleTaskItemChange = (taskItem: Task) => {
    setSelectedTaskItem(taskItem);
  };
  console.log(selectedTaskItem);

  return (
    <div className="relative mx-auto mt-10 w-[75rem] sm:w-[21.44rem] md:w-[43.5rem]">
      <section>
        <SectionHeader
          teamId={teamId}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </section>
      <section>
        <TaskLists
          teamId={teamId}
          selectedTaskListId={selectedTaskListId}
          onTaskListClick={handleTaskListClick}
        />
        <ErrorBoundary fallback={<div>error</div>}>
          <Suspense fallback={<div>loading...</div>}>
            <TaskCardList
              teamId={teamId}
              selectedTaskListId={selectedTaskListId}
              selectedDate={selectedDate}
              onTaskItemChange={handleTaskItemChange}
            />
          </Suspense>
        </ErrorBoundary>
      </section>
      <FloatingButton
        className="md: md: absolute -right-8 right-0 top-[55.25rem] top-[62.06rem] sm:top-[41.06rem]"
        variant="solid"
        size="large"
        onClick={() => openTaskFormModal(null)}
      >
        + 할 일 추가
      </FloatingButton>
      <TaskFormModal
        teamId={teamId}
        selectedTaskListId={selectedTaskListId}
        taskToEdit={selectedTaskItem}
      />
      <DeleteTaskModal taskItem={selectedTaskItem} />
    </div>
  );
}
