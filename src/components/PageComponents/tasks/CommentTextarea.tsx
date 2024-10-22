import Image from "next/image";

export default function CommentTextarea() {
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="relative">
      <textarea
        onInput={handleInput}
        className="h-auto w-full resize-none overflow-hidden rounded-none border-b border-l-0 border-r-0 border-border-primary bg-background-secondary py-4 pl-0 pr-8 text-text-md outline-none placeholder:text-text-md placeholder:text-text-primary"
        placeholder="댓글을 입력하세요."
      />
      <Image
        src="/icons/icon-enter_gray.svg"
        width={24}
        height={24}
        alt="인풋 엔터 버튼"
        className="absolute right-0 top-3"
      />
    </div>
  );
}
