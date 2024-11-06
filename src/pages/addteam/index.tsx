import TeamSubmitForm from "@/components/PageComponents/team/TeamSubmitForm";
import { useAuth } from "@/core/context/AuthProvider";

export default function Addteam() {
  const { user } = useAuth(true);

  if (!user) return null;

  return (
    <div className="mx-auto mt-52 max-w-[30.75rem] px-4">
      <TeamSubmitForm />
    </div>
  );
}
 