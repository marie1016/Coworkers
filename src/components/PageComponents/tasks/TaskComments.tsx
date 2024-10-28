import getTaskComments from "@/core/api/tasks/getTaskComments";
import { Task, TaskComment, TaskCommentForm } from "@/core/dtos/tasks/tasks";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { formattedShortDate } from "@/lib/utils/date";
import Image from "next/image";
import editTaskComment from "@/core/api/tasks/editTaskComment";
import { useState } from "react";
import Button from "@/components/@shared/UI/Button";
import deleteTaskComment from "@/core/api/tasks/deleteTaskComment";
import EditDropdown from "./EditDropdown";

interface TaskCommentsProps {
  taskItem: Task;
}

export default function TaskComments({ taskItem }: TaskCommentsProps) {
  const queryClient = useQueryClient();
  const { id } = taskItem;

  const [comment, setComment] = useState<string>("");
  const [isEditingId, setIsEditingId] = useState<number | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const { data: commentsData } = useSuspenseQuery<TaskComment[]>({
    queryKey: ["taskComments", id],
    queryFn: () => getTaskComments(id),
  });

  const taskComments = commentsData ?? [];

  const editMutation = useMutation({
    mutationFn: ({
      commentId,
      editTaskCommentForm,
    }: {
      commentId: number;
      editTaskCommentForm: TaskCommentForm;
    }) => editTaskComment({ commentId, editTaskCommentForm }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskComments", id] });
    },
    onError: (error) => {
      console.error("Edit failed:", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId: number) => deleteTaskComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskComments", id] });
    },
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });

  const editComment = (taskComment: TaskComment) => {
    setIsEditingId(taskComment.id);
    setComment(taskComment.content);
  };

  const deleteComment = (commentId: number) => {
    deleteMutation.mutate(commentId);
  };

  const submitCommentForm = (e: React.FormEvent, commentId: number) => {
    e.preventDefault();
    const editTaskCommentForm = { content: comment };
    editMutation.mutate({ commentId, editTaskCommentForm });
    setIsEditingId(null);
  };

  return (
    <ul>
      {taskComments.map((taskComment) => (
        <li key={taskComment.id} className="mt-4">
          {isEditingId !== taskComment.id ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span>{taskComment.content}</span>
                <EditDropdown
                  onEdit={() => editComment(taskComment)}
                  onDelete={() => deleteComment(taskComment.id)}
                />
              </div>
              <div className="flex items-center">
                <Image
                  className="mr-3"
                  src={
                    taskComment.user.image ?? "/images/image-defaultProfile.png"
                  }
                  width={32}
                  height={32}
                  alt="프로필 이미지"
                />
                <span className="shrink grow basis-auto">
                  {taskComment.user.nickname}
                </span>
                <span className="text-text-secondary">
                  {formattedShortDate(taskComment.updatedAt)}
                </span>
              </div>
            </div>
          ) : (
            <form className="flex flex-col gap-2">
              <textarea
                className="h-auto w-full resize-none overflow-hidden border-none bg-background-secondary px-0 py-0 text-text-md outline-none focus:border-none focus:outline-none"
                name="comment"
                value={comment}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setComment(e.target.value)
                }
                onInput={handleInput}
              />
              <div className="flex items-center justify-end gap-5">
                <button
                  className="text-text-default"
                  onClick={() => setIsEditingId(null)}
                >
                  취소
                </button>
                <Button
                  variant="outlined"
                  size="x-small"
                  type="submit"
                  onClick={(e) => submitCommentForm(e, taskComment.id)}
                >
                  수정하기
                </Button>
              </div>
            </form>
          )}
          <hr className="my-4 border-t border-border-primary" />
        </li>
      ))}
    </ul>
  );
}
