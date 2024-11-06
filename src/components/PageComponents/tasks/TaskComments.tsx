import getTaskComments from "@/core/api/tasks/getTaskComments";
import { Task, TaskComment, TaskCommentForm } from "@/core/dtos/tasks/tasks";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { timeForToday } from "@/lib/utils/date";
import Image from "next/image";
import editTaskComment from "@/core/api/tasks/editTaskComment";
import { useState } from "react";
import Button from "@/components/@shared/UI/Button";
import { useAuth } from "@/core/context/AuthProvider";
import deleteTaskComment from "@/core/api/tasks/deleteTaskComment";
import EditDropdown from "./EditDropdown";
import CommentSkeleton from "./CommentSkeleton";

interface TaskCommentsProps {
  taskItem: Task;
}

export default function TaskComments({ taskItem }: TaskCommentsProps) {
  const queryClient = useQueryClient();
  const { id } = taskItem;
  const { user } = useAuth(true);
  const userId = user?.id;

  const [comment, setComment] = useState<string>("");
  const [isEditingId, setIsEditingId] = useState<number | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const {
    data: commentsData,
    isPending,
    isError,
  } = useQuery<TaskComment[]>({
    queryKey: ["taskComments", id],
    queryFn: () => getTaskComments(id),
  });

  const taskComments = commentsData;

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

  if (isError) {
    return (
      <div className="mt-28 text-center text-text-md text-text-default">
        <p>댓글을 불러오는데 에러가 발생했습니다.</p>
        <p>잠시 후 다시 접속해주세요.</p>
      </div>
    );
  }

  if (isPending) {
    return <CommentSkeleton />;
  }

  if (!taskComments?.length) {
    return (
      <div className="mt-28 text-center text-text-md text-text-default">
        <p>아직 댓글이 없습니다.</p>
        <p>댓글을 추가해주세요.</p>
      </div>
    );
  }

  return (
    <ul>
      {taskComments?.map((taskComment) => (
        <li key={taskComment.id} className="mt-4">
          {isEditingId !== taskComment.id ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span>{taskComment.content}</span>
                {taskComment.userId === userId && (
                  <EditDropdown
                    onEdit={() => editComment(taskComment)}
                    onDelete={() => deleteComment(taskComment.id)}
                  />
                )}
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
                <span className="shrink grow basis-auto font-medium">
                  {taskComment.user.nickname}
                </span>
                <span className="text-text-secondary">
                  {timeForToday(taskComment.updatedAt)}
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
              <div className="flex items-center justify-end gap-5 font-semibold">
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
                  disabled={editMutation.isPending || !comment}
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
