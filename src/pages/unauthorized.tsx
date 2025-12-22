import Button from "@/components/@shared/UI/Button";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Unauthorized() {
  const router = useRouter();
  const { direction } = router.query;
  const loginUrl = `/login${typeof direction === "string" ? `?direction=${direction}` : ""}`;

  return (
    <div className="mt-52 flex flex-col items-center gap-20 px-8 sm:mt-36 sm:gap-12">
      <div className="flex flex-col items-center gap-12 sm:gap-8">
        <div className="relative h-64 w-[50.625rem] sm:h-[6.125rem] sm:w-[19.5rem] md:h-[10.25rem] md:w-[32.5rem]">
          <Image fill src="/images/image-guys.png" alt="로그인 필요" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-center text-text-md font-medium text-text-default">
            로그인이 필요한 서비스입니다.
          </p>
          <p className="text-center text-text-md font-medium text-text-default">
            로그인 하시겠습니까?
          </p>
        </div>
      </div>
      <div className="flex w-[11.625rem] flex-col gap-4">
        <Button
          variant="solid"
          size="large"
          onClick={() => router.replace(loginUrl)}
        >
          로그인하기
        </Button>
        <Button
          variant="outlined"
          size="large"
          className="bg-transparent"
          onClick={() => router.back()}
        >
          이전 페이지로
        </Button>
      </div>
    </div>
  );
}
