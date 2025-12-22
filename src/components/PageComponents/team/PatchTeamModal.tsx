import Modal from "@/components/@shared/UI/Modal/Modal";
import TeamSubmitForm from "./TeamSubmitForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  submitCallback: () => void;
  formValues: {
    teamId: string;
    defaultName: string;
    defaultImage?: string;
  };
}

export default function PatchTeamModal({
  isOpen,
  onClose,
  submitCallback,
  formValues,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-[30.75rem]">
        <TeamSubmitForm submitCallback={submitCallback} {...formValues} />
      </div>
    </Modal>
  );
}
