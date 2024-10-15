import Image from "next/image";
import { HTMLProps, MouseEvent } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLProps<HTMLDivElement> {
  preview?: string | null;
  clearFile: () => void;
}

export default function ProfileImagePreview({
  className,
  children,
  preview,
  clearFile,
  ...props
}: Props) {
  const classCombined = twMerge(
    "relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-solid border-border-primary bg-background-secondary cursor-pointer",
    className,
  );

  const handleClear = (e: MouseEvent) => {
    e.preventDefault();
    clearFile();
  };

  return (
    <div className={classCombined} {...props}>
      {preview ? (
        <Image
          fill
          src={preview}
          style={{ objectFit: "contain", borderRadius: "9999px" }}
          alt="미리보기"
        />
      ) : (
        children
      )}
      {preview ? (
        <div
          className="boder-solid absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background-primary bg-background-tertiary hover:bg-point-rose"
          onClick={handleClear}
        >
          <div className="relative h-3 w-3">
            <Image src="/icons/icon-x.svg" fill alt="취소" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
