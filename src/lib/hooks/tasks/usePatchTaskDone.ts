import { EditTaskForm } from "@/core/dtos/tasks/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import editTask from "@/core/api/tasks/editTask";
import { useRouter } from "next/router";

const usePatchTaskDone = (id: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { tasklist } = router.query;
  const numericTaskListId = parseInt(tasklist as string, 10);

  const taskDoneMutation = useMutation({
    mutationFn: async (editTaskForm: EditTaskForm) => {
      await editTask({ taskId: id }, editTaskForm);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["tasks", numericTaskListId],
      });
    },
    onError: (error) => {
      console.error("Error editing task:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", numericTaskListId] });
    },
  });

  const handleClick = (checked: boolean) => {
    const editTaskForm = { done: checked };
    taskDoneMutation.mutate(editTaskForm);
  };
  return {
    handleClick,
  };
};

export default usePatchTaskDone;
