import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import postChat from "@/core/api/gpt/postChat";
import Image from "next/image";
import Button from "@/components/@shared/UI/Button";
import { ChatRequestBody, Message } from "@/core/dtos/gpt/chatApi";
import { TaskListTasks } from "@/core/dtos/group/group";

interface Props {
  tasks?: TaskListTasks[];
}

const MESSAGE_CLASSNAME = {
  chatgpt:
    "w-fit bg-background-tertiary rounded-xl rounded-bl-none mr-16 text-left px-4 py-2 break-keep",
  user: "w-fit bg-background-tertiary rounded-xl rounded-br-none ml-16 text-right px-4 py-2 self-end break-keep",
};

const CONTEXT_LIMIT = 5;

export default function Chat({ tasks }: Props) {
  const [isStarted, setIsStarted] = useState(false);
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const formRef = useRef<HTMLFormElement | null>(null);
  const messageBoxRef = useRef<HTMLDivElement | null>(null);

  const chatMutation = useMutation({
    mutationFn: async (body: ChatRequestBody) => {
      const res = await postChat(body);
      return res;
    },
    onSuccess: (data) => {
      const { content } = data.choices[0].message;
      if (!content) return;
      setMessages((prev) => [
        ...prev,
        { id: data.id, text: content, from: "chatgpt" },
      ]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;
    const context = messages;
    setMessages((prev) => [
      ...prev,
      { id: `${prev.length}`, text, from: "user" },
    ]);

    chatMutation.mutate({
      message: text,
      data: tasks,
      context,
      contextLimit: CONTEXT_LIMIT,
    });
    setText("");
  };

  const handleEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!formRef.current) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current.requestSubmit();
    }
  };

  const handleStart = () => {
    setIsStarted(true);
    chatMutation.mutate({
      message: "현재 할 일들이 전체적으로 얼마나 진행됐는지 짧게 요약해줘.",
      data: tasks,
    });
  };

  useEffect(() => {
    if (!messageBoxRef.current) return;
    messageBoxRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return isStarted ? (
    <div className="flex h-96 w-full flex-col justify-between gap-4 rounded-xl bg-background-secondary p-6">
      <div className="overflow-y-scroll scrollbar-hide">
        <div className="flex flex-col gap-4" ref={messageBoxRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={MESSAGE_CLASSNAME[msg.from]}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
      </div>
      <form className="relative p-0" onSubmit={handleSubmit} ref={formRef}>
        <textarea
          className="h-full w-full resize-none rounded-xl border-border-primary border-opacity-10 bg-background-tertiary pr-14 placeholder:break-keep focus:border-interaction-hover focus:outline-none"
          value={text}
          disabled={chatMutation.isPending}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleEnterPress}
          placeholder={
            chatMutation.isPending
              ? "응답을 기다리는 중..."
              : "여기에 메세지를 입력하세요."
          }
        />
        <div className="absolute right-6 top-0 flex h-full w-fit items-center">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            type="submit"
            disabled={chatMutation.isPending}
          >
            <div className="relative h-5 w-5">
              <Image fill src="/icons/icon-arrow_up.svg" alt="보내기" />
            </div>
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div className="flex h-96 w-full items-center justify-center rounded-xl bg-background-secondary">
      <div className="mx-4 flex w-full flex-col items-center gap-6">
        <p className="text-center text-text-2xl font-medium">AI 어시스턴트</p>
        <Button
          variant="solid"
          size="large"
          className="max-w-64"
          type="button"
          disabled={chatMutation.isPending}
          onClick={handleStart}
        >
          시작하기
        </Button>
      </div>
    </div>
  );
}
