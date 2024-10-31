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

  const { data: tasksData } = useQuery<Task[]>({
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
  const [taskItems, setTaskItems] = useState(initialTask);

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

  return taskItems.length > 0 ? (
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
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : (
    <div className="mt-80 text-center text-text-md text-text-default sm:mt-48">
      <p>아직 할 일이 없습니다.</p>
      <p>할 일을 추가해주세요.</p>
    </div>
  );
}
