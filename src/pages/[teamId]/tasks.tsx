import { Task } from "@/core/dtos/tasks/tasks";
import { useState, Suspense } from "react";
import { useRouter } from "next/router";
import FloatingButton from "@/components/@shared/UI/FloatingButton";
import TaskLists from "@/components/PageComponents/tasks/TaskLists";
import TaskCardList from "@/components/PageComponents/tasks/TaskCardList";
import useModalStore from "@/lib/hooks/stores/modalStore";
import AddTaskModal from "@/components/PageComponents/tasks/AddTaskModal";
import EditTaskModal from "@/components/PageComponents/tasks/EditTaskModal";
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

  const openTaskFormModal = () => {
    openModal("addTaskModal");
  };

  const handleTaskItemChange = (taskItem: Task) => {
    setSelectedTaskItem(taskItem);
  };

  return (
    <div className="mx-auto my-10 h-auto w-[75rem] sm:w-[21.44rem] md:w-[43.5rem]">
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
        className="fixed bottom-8 right-8"
        variant="solid"
        size="large"
        onClick={openTaskFormModal}
      >
        + 할 일 추가
      </FloatingButton>
      <AddTaskModal teamId={teamId} selectedTaskListId={selectedTaskListId} />
      {selectedTaskItem && <EditTaskModal taskToEdit={selectedTaskItem} />}
      {selectedTaskItem && <DeleteTaskModal taskItem={selectedTaskItem} />}
    </div>
  );
}
