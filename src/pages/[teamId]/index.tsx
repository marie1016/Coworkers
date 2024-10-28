import AddTaskListModal from "@/components/@shared/AddTaskListModal";
import Members from "@/components/PageComponents/team/Members";
import SectionHeader from "@/components/PageComponents/team/SectionHeader";
import TaskLists from "@/components/PageComponents/team/TaskLists";
import TeamGear from "@/components/PageComponents/team/TeamGear";
import TeamLinkModal from "@/components/PageComponents/team/TeamLinkModal";
import getTeamData from "@/core/api/group/getTeamData";
import useModalStore from "@/lib/hooks/stores/modalStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function Team() {
  const addTaskListModalName = "addTaskListModal";
  const teamLinkModalName = "teamLinkModal";

  const isAddTaskListModalOpen = useModalStore(
    (state) => state.modals[addTaskListModalName],
  );
  const isTeamLinkModalOpen = useModalStore(
    (state) => state.modals[teamLinkModalName],
  );

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const router = useRouter();
  const teamId = router.query.teamId as string;
  const queryClient = useQueryClient();

  const groupResponse = useQuery({
    queryKey: ["group", teamId],
    queryFn: () => getTeamData(teamId),
    staleTime: 1000 * 60,
    enabled: !!teamId,
  });

  const group = groupResponse.data;
  const refreshGroup = () => {
    queryClient.invalidateQueries({ queryKey: ["group", teamId] });
  };

  if (!group) return null;

  return (
    <>
      <main className="mx-auto mt-[5.25rem] max-w-[78rem] px-6">
        <div className="mb-6 flex h-16 w-full cursor-default justify-between rounded-xl border border-solid border-border-primary bg-background-secondary bg-[url('/images/image-thumbnailTeam.png')] bg-[right_5rem_top_0] bg-no-repeat px-6 py-5 text-text-xl font-bold text-text-inverse">
          {group.name}
          <TeamGear
            teamId={teamId}
            teamName={group.name}
            teamImage={group.image}
            refreshGroup={refreshGroup}
          />
        </div>
        <section className="mb-12 flex flex-col gap-4">
          <SectionHeader
            title="할 일 목록"
            length={`${group.taskLists.length}개`}
            addText="+ 새로운 목록 추가하기"
            onAddClick={() => openModal(addTaskListModalName)}
          />
          {group.taskLists.length ? (
            <TaskLists tasks={group.taskLists} teamId={teamId} />
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
            onAddClick={() => openModal(teamLinkModalName)}
          />
          <Members members={group.members} />
        </section>
      </main>
      <AddTaskListModal
        isOpen={isAddTaskListModalOpen}
        onClose={() => closeModal(addTaskListModalName)}
        teamId={teamId}
        submitCallback={refreshGroup}
      />
      <TeamLinkModal
        isOpen={isTeamLinkModalOpen}
        onClose={() => closeModal(teamLinkModalName)}
        teamId={teamId}
      />
    </>
  );
}
