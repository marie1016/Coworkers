import getTasks, { SelectedDate } from "@/core/api/tasks/getTasks";
import getTaskLists from "@/core/api/tasks/getTaskLists";
import { Task, TaskListsResponse } from "@/core/dtos/tasks/tasks";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import TaskCard from "@/components/PageComponents/tasks/TaskCard";
import "moment/locale/ko";
import FloatingButton from "@/components/@shared/UI/FloatingButton";
import TaskDetail from "@/components/PageComponents/tasks/TaskDetail";

export default function Tasks() {
  const router = useRouter();
  const groupId = router.query.teamId as string;
  const { task } = router.query;
  const numericTaskId = parseInt(task as string, 10);

  const [selectedTaskListId, setSelectedTaskListId] = useState<number | null>(
    numericTaskId,
  );
  const [selectedTaskItem, setSelectedTaskItem] = useState<Task | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  const {
    data: taskListsData,
    isLoading: loadingTaskLists,
    error: taskListsError,
  } = useQuery<TaskListsResponse>({
    queryKey: ["taskLists", groupId],
    queryFn: () => getTaskLists(groupId),
    enabled: !!groupId,
    retry: 0,
  });

  const taskLists = taskListsData?.taskLists ?? [];

  const handleTaskListClick = useCallback((taskListId: number) => {
    setSelectedTaskListId(taskListId);
  }, []);

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const utcDate = new Date(selectedDate as Date).toISOString();

  const { data: tasksData, isLoading: loadingTasks } = useQuery<Task[]>({
    queryKey: ["tasks", selectedTaskListId, utcDate],
    queryFn: () =>
      getTasks({
        groupId,
        id: selectedTaskListId,
        date: utcDate,
      }),
    staleTime: 0,
  });

  const taskItems = tasksData ?? [];

  moment.locale("ko");

  const formattedDate =
    selectedDate instanceof Date &&
    moment(selectedDate).format("MM월 DD일 (ddd)");

  if (loadingTaskLists || loadingTasks) return <div>Loading...</div>;
  if (taskListsError) return <div>Error</div>;

  return (
    <>
      <div className="mx-auto mt-10 w-[75rem] sm:w-[21.44rem] md:w-[43.5rem]">
        <section className="relative">
          <h1 className="text-text-xl font-bold text-text-primary">할 일</h1>
          <div className="my-6 flex items-center justify-between">
            <div className="flex items-center">
              <h2 className="mr-3 text-text-lg font-medium text-text-primary">
                {formattedDate}
              </h2>
              <Image
                src="/icons/icon-leftArrow.svg"
                width={16}
                height={16}
                alt="왼쪽 버튼 아이콘"
              />
              <Image
                className="ml-1"
                src="/icons/icon-rightArrow.svg"
                width={16}
                height={16}
                alt="오른쪽 버튼 아이콘"
              />
              <Image
                className="ml-3"
                src="/icons/icon-calendar.svg"
                width={24}
                height={24}
                alt="캘린더 아이콘"
                onClick={toggleCalendar}
              />
              {isCalendarOpen && (
                <Calendar
                  className="text-text-md"
                  onChange={setSelectedDate}
                  value={selectedDate}
                />
              )}
            </div>
            <p className="text-text-md font-regular text-brand-primary">
              +새로운 목록 추가하기
            </p>
          </div>
          <FloatingButton
            className="md: md: absolute -right-8 right-0 top-[55.25rem] top-[62.06rem] sm:top-[41.06rem]"
            variant="solid"
            size="large"
          >
            + 할 일 추가
          </FloatingButton>
        </section>
        <section>
          {taskLists.length > 0 ? (
            <ul className="flex items-center gap-3">
              {taskLists.map((taskList) => (
                <li key={taskList.id}>
                  <button
                    onClick={() => handleTaskListClick(taskList.id)}
                    className={`text-text-lg font-medium ${selectedTaskListId === taskList.id ? "text-text-tertiary underline" : "text-text-default"}`}
                  >
                    {taskList.name}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-text-center mt-96 text-text-md text-text-default sm:mt-56">
              <p>아직 할 일 목록이 없습니다.</p>
              <p>새로운 목록을 추가해보세요.</p>
            </div>
          )}
          {taskItems.length > 0 ? (
            <ul>
              {taskItems.map((taskItem) => (
                <li
                  key={taskItem.id}
                  onClick={() => setSelectedTaskItem(taskItem)}
                >
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

      {selectedTaskItem && <TaskDetail selectedTaskItem={selectedTaskItem} />}
    </>
  );
}
