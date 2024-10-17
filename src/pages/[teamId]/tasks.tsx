import getTasks, { SelectedDate } from "@/core/api/tasks/getTask";
import getTaskLists from "@/core/api/tasks/getTaskLists";
import { Task, TaskListsResponse } from "@/core/dtos/tasks/taskList";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import TaskCard from "@/components/PageComponents/tasks/TaskCard";
import "moment/locale/ko";

export default function Tasks() {
  const router = useRouter();
  const { teamId } = router.query;
  const stringTeamId = Array.isArray(teamId) ? teamId[0] : (teamId ?? "");

  const [selectedTaskListId, setSelectedTaskListId] = useState<number | null>(
    null,
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  const {
    data: taskListsData,
    isLoading: loadingTaskLists,
    error: taskListsError,
  } = useQuery<TaskListsResponse>({
    queryKey: ["taskLists", stringTeamId],
    queryFn: () => getTaskLists(stringTeamId),
    enabled: !!teamId,
    retry: 0,
  });

  const taskLists = taskListsData?.taskLists ?? [];

  const handleTaskListClick = useCallback((taskListId: number) => {
    setSelectedTaskListId(taskListId);
  }, []);

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const { data: tasksData, isLoading: loadingTasks } = useQuery<Task[]>({
    queryKey: ["tasks", selectedTaskListId, selectedDate],
    queryFn: () =>
      getTasks({
        teamId: stringTeamId,
        id: selectedTaskListId,
        date: selectedDate,
      }),
    staleTime: 0,
  });

  const tasks = tasksData ?? [];

  moment.locale("ko");

  const formattedDate =
    selectedDate instanceof Date &&
    moment(selectedDate).format("MM월 DD일 (ddd)");

  if (loadingTaskLists || loadingTasks) return <div>Loading...</div>;
  if (taskListsError) return <div>Error</div>;

  return (
    <div className="w-1200 mx-auto mt-10">
      <section>
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
              <Calendar onChange={setSelectedDate} value={selectedDate} />
            )}
          </div>
          <p className="text-text-md font-regular text-brand-primary">
            +새로운 목록 추가하기
          </p>
        </div>
      </section>
      <section>
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
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskCard task={task} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
