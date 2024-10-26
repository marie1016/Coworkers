import addTaskComment from "@/core/api/tasks/addTaskComment";
import { AddTaskCommentForm, Task } from "@/core/dtos/tasks/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
    mutationFn: (addTaskCommentForm: AddTaskCommentForm) =>
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
        alert("댓글이 성공적으로 업로드 되었습니다.");
        setComment("");
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
        className="h-auto w-full resize-none overflow-hidden rounded-none border-b border-l-0 border-r-0 border-border-primary bg-background-secondary py-4 pl-0 pr-8 text-text-md outline-none placeholder:text-text-md placeholder:text-text-default"
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
