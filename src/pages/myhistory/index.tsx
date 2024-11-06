import { useAuth } from "@/core/context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { TaskDone, History } from "@/core/dtos/tasks/tasks";
import getHistory from "@/core/api/user/getHistory";
import { formatDate } from "@/lib/utils/date";
import Image from "next/image";
import FloatingButton from "@/components/@shared/UI/FloatingButton";
import MyhistorySkeleton from "@/components/PageComponents/myhistory/MyhistorySkeleton";

export default function Myhistory() {
  const { user } = useAuth(true);
  const [visibleDates, setVisibleDates] = useState<string[]>([]);
  const [currentCount, setCurrentCount] = useState(3);

  const {
    data: historyData,
    isPending,
    isError,
  } = useQuery<History>({
    queryKey: ["History"],
    queryFn: () => getHistory(),
  });

  const allHistory: TaskDone[] = historyData?.tasksDone ?? [];
  const sortedHistory = allHistory.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const dates = sortedHistory.map((taskDone: TaskDone) =>
    formatDate(taskDone.date),
  );

  const newDates = dates.reduce((acc: string[], value: string) => {
    if (!acc.includes(value)) {
      acc.push(value);
    }
    return acc;
  }, []);

  useEffect(() => {
    setVisibleDates(newDates.slice(0, currentCount));
  }, [currentCount, isPending]);

  const loadMore = () => {
    setCurrentCount((prev) => prev + 3);
  };

  if ((isPending || visibleDates.length === 0) && allHistory.length > 0) {
    return <MyhistorySkeleton />;
  }

  if (isError) {
    return (
      <div className="mx-auto flex h-screen max-w-[75rem] flex-col px-6 pb-24 pt-10 font-medium">
        <h1 className="text-text-xl font-bold text-text-primary">
          마이 히스토리
        </h1>
        <div className="my-auto text-center text-text-md text-text-default">
          <p>마이 히스토리를 불러오는데 에러가 발생했습니다.</p>
          <p>잠시 후 다시 접속해주세요.</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (allHistory.length === 0) {
    return (
      <div className="mx-auto flex h-screen max-w-[75rem] flex-col px-6 pb-24 pt-10 font-medium">
        <h1 className="text-text-xl font-bold text-text-primary">
          마이 히스토리
        </h1>
        <div className="my-auto text-center text-text-md text-text-default">
          아직 히스토리가 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto h-auto max-w-[75rem] px-6 pb-24 pt-10">
      <h1 className="text-text-xl font-bold text-text-primary">
        마이 히스토리
      </h1>
      <div className="my-6 flex flex-col gap-10">
        {visibleDates.map((visibleDate) => (
          <div key={visibleDate}>
            <h2 className="mb-4 text-text-lg font-medium">{visibleDate}</h2>
            <ul className="flex flex-col gap-4">
              {sortedHistory
                .filter((taskDone) => formatDate(taskDone.date) === visibleDate)
                .map((taskDone) => (
                  <li
                    key={taskDone.id}
                    className="flex min-h-[2.75rem] items-center gap-2 rounded-xl bg-background-secondary px-4 py-2.5"
                  >
                    <Image
                      src="/icons/icon-faCheck.svg"
                      width={24}
                      height={24}
                      alt="체크박스 아이콘"
                    />
                    <span className="text-text-md text-text-primary line-through">
                      {taskDone.name}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        {visibleDates < newDates && (
          <FloatingButton variant="solid" size="large" onClick={loadMore}>
            더 불러오기
          </FloatingButton>
        )}
      </div>
    </div>
  );
}
