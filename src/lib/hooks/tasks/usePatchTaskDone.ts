import { EditTaskForm, Task } from "@/core/dtos/tasks/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import editTask from "@/core/api/tasks/editTask";
import { useRouter } from "next/router";

const usePatchTaskDone = (
  id: number,
  doneAt: string | null,
  selectedDate: Date | null,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { tasklist } = router.query;
  const numericTaskListId = parseInt(tasklist as string, 10);

  const taskDoneMutation = useMutation<
    void,
    Error,
    EditTaskForm,
    { previousTasks?: Task[] }
  >({
    mutationFn: async (editTaskForm: EditTaskForm) => {
      await editTask({ taskId: id }, editTaskForm);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["tasks", numericTaskListId, selectedDate],
      });

      const previousTasks: Task[] =
        queryClient.getQueryData(["tasks", numericTaskListId, selectedDate]) ??
        [];

      const updatedTasks = previousTasks.map((task) =>
        task.id === id
          ? { ...task, doneAt: doneAt ? null : new Date().toISOString() }
          : task,
      );

      if (previousTasks) {
        queryClient.setQueryData(
          ["tasks", numericTaskListId, selectedDate],
          updatedTasks,
        );
      }

      // eslint-disable-next-line consistent-return
      return { previousTasks };
    },
    onError: (error, variables, context) => {
      console.error("Error editing task:", error);

      if (context?.previousTasks) {
        queryClient.setQueryData(
          ["tasks", numericTaskListId, selectedDate],
          context.previousTasks,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", numericTaskListId, selectedDate],
      });
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
