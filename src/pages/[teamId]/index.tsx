import Members from "@/components/PageComponents/team/Members";
import SectionHeader from "@/components/PageComponents/team/SectionHeader";
import TaskLists from "@/components/PageComponents/team/TaskLists";
import getTeamData from "@/core/api/group/getTeamData";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function Team() {
  const router = useRouter();
  const groupId = router.query.teamId as string;

  const response = useQuery({
    queryKey: ["group", groupId],
    queryFn: () => getTeamData(groupId),
    staleTime: 1000 * 60,
  });

  const group = response.data?.data;
  console.log(group);

  const addTask = () => {
    alert("addTask 함수 동작");
  };

  if (!group) return null;

  return (
    <main className="mx-auto mt-[5.25rem] max-w-[78rem] px-6">
      <div className="mb-6 flex h-16 w-full cursor-default justify-between rounded-xl border border-solid border-border-primary bg-background-secondary bg-[url('/images/image-thumbnailTeam.png')] bg-[right_5rem_top_0] bg-no-repeat px-6 py-5 text-text-xl font-bold text-text-inverse">
        {group.name}
      </div>
      <section className="mb-16 flex flex-col gap-4">
        <SectionHeader
          title="할 일 목록"
          length={`${group.taskLists.length}개`}
          addText="+ 새로운 목록 추가하기"
          onAddClick={addTask}
        />
        {group.taskLists.length ? (
          <TaskLists tasks={group.taskLists} teamId={groupId} />
        ) : (
          <div className="flex w-full items-center justify-center py-16 text-text-md font-medium text-text-default">
            아직 할 일 목록이 없습니다.
          </div>
        )}
      </section>
      <section className="flex flex-col gap-4">
        <SectionHeader
          title="멤버"
          length={`${group.members.length}명`}
          addText="+ 새로운 멤버 초대하기"
        />
        <Members members={group.members} />
      </section>
    </main>
  );
}
