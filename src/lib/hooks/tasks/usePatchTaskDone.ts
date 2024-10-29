import { EditTaskForm } from "@/core/dtos/tasks/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import editTask from "@/core/api/tasks/editTask";

const usePatchTaskDone = (id: number) => {
  const queryClient = useQueryClient();

  const taskDoneMutation = useMutation({
    mutationFn: (editTaskForm: EditTaskForm) =>
      editTask({ taskId: id }, editTaskForm),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Error editing task:", error);
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