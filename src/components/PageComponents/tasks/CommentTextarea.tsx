import addTaskComment from "@/core/api/tasks/addTaskComment";
import { TaskCommentForm, Task } from "@/core/dtos/tasks/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Image from "next/image";
import { useState } from "react";

interface CommentTextareaProps {
  taskItem: Task;
}

export default function CommentTextarea({ taskItem }: CommentTextareaProps) {
  const queryClient = useQueryClient();
  const { id } = taskItem;

  const [comment, setComment] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const commentMutation = useMutation({
    mutationFn: (addTaskCommentForm: TaskCommentForm) =>
      addTaskComment({ taskId: id }, addTaskCommentForm),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskComments", id] });
    },
    onError: (error) => {
      console.error("Error creating comment:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const addTaskCommentForm = { content: comment };
    commentMutation.mutate(addTaskCommentForm, {
      onSuccess: () => {
        setComment("");
      },
      onError: () => {
        toast.error("에러가 발생했습니다. 잠시 후 다시 시도해주세요");
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <textarea
        name="comment"
        value={comment}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setComment(e.target.value)
        }
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        className="h-auto w-full resize-none overflow-hidden rounded-none border-b border-l-0 border-r-0 border-border-primary bg-background-secondary py-4 pl-0 pr-8 text-text-md outline-none placeholder:text-text-md placeholder:text-text-default [&&]:focus:border-interaction-hover [&&]:focus:ring-0"
        placeholder="댓글을 입력하세요."
      />
      <button type="submit" disabled={commentMutation.isPending || !comment}>
        <Image
          src={
            comment
              ? "/icons/icon-enter_green.svg"
              : "/icons/icon-enter_gray.svg"
          }
          width={24}
          height={24}
          alt="인풋 엔터 버튼"
          className="absolute right-0 top-3"
        />
      </button>
    </form>
  );
}
