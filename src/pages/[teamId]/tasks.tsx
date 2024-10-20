import getTasks, { SelectedDate } from "@/core/api/tasks/getTasks";
import getTaskLists from "@/core/api/tasks/getTaskLists";
import { Task, TaskList, TaskListsResponse } from "@/core/dtos/tasks/tasks";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import moment from "moment";
import TaskCard from "@/components/PageComponents/tasks/TaskCard";
import "moment/locale/ko";
import FloatingButton from "@/components/@shared/UI/FloatingButton";
import TaskDetail from "@/components/PageComponents/tasks/TaskDetail";
import TaskLists from "@/components/PageComponents/tasks/TaskLists";
import TaskDate from "@/components/PageComponents/tasks/TaskDate";
import AddTask from "@/components/PageComponents/tasks/AddTask";

export default function Tasks() {
  const router = useRouter();
  const groupId = router.query.teamId as string;
  const { task } = router.query;
  const numericTaskId = parseInt(task as string, 10);

  const [selectedTaskListId, setSelectedTaskListId] =
    useState<number>(numericTaskId);
  const [selectedTaskItem, setSelectedTaskItem] = useState<Task | null>(null);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const {
    data: taskListsData,
    isLoading: loadingTaskLists,
    isError: taskListsError,
  } = useQuery<TaskListsResponse>({
    queryKey: ["taskLists", groupId],
    queryFn: () => getTaskLists(groupId),
    enabled: !!groupId,
    retry: 0,
  });

  const taskLists: TaskList[] = taskListsData?.taskLists ?? [];

  const utcDate = new Date(selectedDate as Date).toISOString();

  const {
    data: tasksData,
    isLoading: loadingTasks,
    isError: tasksError,
  } = useQuery<Task[]>({
    queryKey: ["tasks", selectedTaskListId, utcDate],
    queryFn: () =>
      getTasks({
        groupId,
        id: selectedTaskListId,
        date: utcDate,
      }),
  });

  const taskItems = tasksData ?? [];

  moment.locale("ko");

  const handleTaskListClick = (taskListId: number) => {
    setSelectedTaskListId(taskListId);
  };

  const openTaskDetail = (taskItem: Task) => {
    setSelectedTaskItem(taskItem);
    setIsTaskDetailOpen(true);
  };
  const closeTaskDetail = () => {
    setIsTaskDetailOpen(false);
  };

  const openAddTask = () => {
    setIsAddTaskOpen(true);
  };

  const closeAddTask = () => {
    setIsAddTaskOpen(false);
  };

  if (loadingTaskLists || loadingTasks) return <div>Loading...</div>;
  if (taskListsError || tasksError) return <div>Error</div>;

  return (
    <>
      <div className="mx-auto mt-10 w-[75rem] sm:w-[21.44rem] md:w-[43.5rem]">
        <section className="relative">
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
          <FloatingButton
            className="md: md: absolute -right-8 right-0 top-[55.25rem] top-[62.06rem] sm:top-[41.06rem]"
            variant="solid"
            size="large"
            onClick={openAddTask}
          >
            + 할 일 추가
          </FloatingButton>
        </section>
        <section>
          {taskLists.length > 0 ? (
            <TaskLists
              taskLists={taskLists}
              selectedTaskListId={selectedTaskListId}
              onHandleTaskListClick={handleTaskListClick}
            />
          ) : (
            <div className="mt-text-center mt-96 text-text-md text-text-default sm:mt-56">
              <p>아직 할 일 목록이 없습니다.</p>
              <p>새로운 목록을 추가해보세요.</p>
            </div>
          )}
          {taskItems.length > 0 ? (
            <ul>
              {taskItems.map((taskItem) => (
                <li key={taskItem.id} onClick={() => openTaskDetail(taskItem)}>
                  <TaskCard taskItem={taskItem} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-80 text-center text-text-md text-text-default sm:mt-48">
              <p>아직 할 일이 없습니다.</p>
              <p>할 일을 추가해주세요.</p>
            </div>
          )}
        </section>
      </div>

      {isTaskDetailOpen && selectedTaskItem && (
        <TaskDetail
          selectedTaskItem={selectedTaskItem}
          isTaskDetailOpen={isTaskDetailOpen}
          onCloseTaskDetail={closeTaskDetail}
        />
      )}

      {isAddTaskOpen && (
        <AddTask
          onCloseAddTask={closeAddTask}
          groupId={groupId}
          selectedTaskListId={selectedTaskListId}
        />
      )}
    </>
  );
}
