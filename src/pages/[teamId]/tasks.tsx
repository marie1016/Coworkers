import { Task } from "@/core/dtos/tasks/tasks";
import { useState, Suspense } from "react";
import { useRouter } from "next/router";
import FloatingButton from "@/components/@shared/UI/FloatingButton";
import TaskLists from "@/components/PageComponents/tasks/TaskLists";
import TaskCardList from "@/components/PageComponents/tasks/TaskCardList";
import TaskDate from "@/components/PageComponents/tasks/TaskDate";
import useModalStore from "@/store/modalStore";
import TaskFormModal from "@/components/PageComponents/tasks/TaskFormModal";
import { ErrorBoundary } from "react-error-boundary";

export default function Tasks() {
  const router = useRouter();
  const groupId = router.query.teamId as string;
  const { task } = router.query;
  const numericTaskId = parseInt(task as string, 10);

  const [selectedTaskListId, setSelectedTaskListId] =
    useState<number>(numericTaskId);
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

  return (
    <div className="relative mx-auto mt-10 w-[75rem] sm:w-[21.44rem] md:w-[43.5rem]">
      <section>
        <h1 className="text-text-xl font-bold text-text-primary">할 일</h1>
        <div className="my-6 flex items-center justify-between">
          <TaskDate
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <p className="text-text-md font-regular text-brand-primary">
            +새로운 목록 추가하기
          </p>
        </div>
      </section>
      <section>
        <TaskLists
          groupId={groupId}
          selectedTaskListId={selectedTaskListId}
          onHandleTaskListClick={handleTaskListClick}
        />
        <ErrorBoundary fallback={<div>error</div>}>
          <Suspense fallback={<div>loading...</div>}>
            <TaskCardList
              groupId={groupId}
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
        groupId={groupId}
        selectedTaskListId={selectedTaskListId}
        taskToEdit={selectedTaskItem}
      />
    </div>
  );
}
