import getTasks from "@/core/api/tasks/getTasks";
import { Task } from "@/core/dtos/tasks/tasks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TaskCard from "@/components/PageComponents/tasks/TaskCard";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useEffect, useState, useMemo } from "react";
import patchTaskOrder from "@/core/api/tasks/patchTaskOrder";
import TaskSkeleton from "./TaskSkeleton";
import TaskError from "./TaskError";

interface TaskCardListProps {
  teamId: string;
  selectedTaskListId: number;
  selectedDate: Date | null;
  onTaskItemChange: (task: Task) => void;
}

export default function TaskCardList({
  teamId,
  selectedTaskListId,
  selectedDate,
  onTaskItemChange,
}: TaskCardListProps) {
  const queryClient = useQueryClient();

  const {
    data: tasksData,
    isPending,
    isError,
  } = useQuery<Task[]>({
    queryKey: ["tasks", selectedTaskListId, selectedDate],
    queryFn: () =>
      getTasks({
        teamId,
        id: selectedTaskListId,
        date: selectedDate,
      }),
    enabled: !!selectedTaskListId,
  });

  const initialTask = useMemo(() => tasksData ?? [], [tasksData]);
  const [taskItems, setTaskItems] = useState<Task[]>(initialTask);

  useEffect(() => {
    setTaskItems(initialTask);
  }, [initialTask]);

  const orderMutation = useMutation({
    mutationFn: async ({
      taskId,
      newIndex,
    }: {
      taskId: string;
      newIndex: number;
    }) => {
      await patchTaskOrder(selectedTaskListId, taskId, {
        displayIndex: newIndex,
      });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["tasks", selectedTaskListId, selectedDate],
      });
    },
    onError: (e) => {
      console.error(e);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", selectedTaskListId, selectedDate],
      });
    },
  });

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.index === source.index) return;

    const newTaskItems = Array.from(taskItems);
    const [reorderedTask] = newTaskItems.splice(source.index, 1);
    newTaskItems.splice(destination.index, 0, reorderedTask);

    setTaskItems(newTaskItems);

    orderMutation.mutate({ taskId: draggableId, newIndex: destination.index });
  };

  if (!selectedTaskListId) {
    return null;
  }

  if (isError) {
    return <TaskError />;
  }

  if (isPending) {
    return <TaskSkeleton />;
  }

  if (taskItems.length === 0) {
    return (
      <div className="pt-[19rem] text-center text-text-md font-medium text-text-default sm:pt-48 md:pt-[16rem]">
        <p>아직 할 일이 없습니다.</p>
        <p>할 일을 추가해주세요.</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(droppableProvided) => (
          <div
            {...droppableProvided.droppableProps}
            ref={droppableProvided.innerRef}
          >
            {taskItems.map((taskItem, index) => (
              <Draggable
                key={taskItem.id}
                draggableId={`${taskItem.id}`}
                index={index}
              >
                {(draggableProvided) => (
                  <div
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    ref={draggableProvided.innerRef}
                  >
                    <TaskCard
                      taskItem={taskItem}
                      onTaskItemChange={onTaskItemChange}
                      selectedDate={selectedDate}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
