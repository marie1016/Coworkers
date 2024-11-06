import Image from "next/image";
import Link from "next/link";

export default function SetupHeader() {
  return (
    <header className="z-99 border-b-solid fixed left-0 right-0 top-0 flex h-[60px] items-center justify-between gap-2.5 border-border-primary bg-background-secondary px-4 py-5 lg:px-[360px] lg:py-3.5">
      <Link href="/">
        <Image
          src="/icons/icon-logo_coworkers_large.png"
          width={158}
          height={32}
          alt="헤더 로고 이미지"
          className="sm:w-[102px] md:w-[102px]"
        />
      </Link>
    </header>
  );
}
