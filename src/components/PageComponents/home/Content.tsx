import Image from 'next/image';

import Button from '@/components/@shared/UI/Button';
import ICON_PATHS from '@/lib/constants/iconPaths';
import IMAGE_PATHS from '@/lib/constants/imagePaths';

export default function Content() {

  return (
    <section className="sm:mx-4 flex flex-col gap-8 text-[18px] font-medium text-white md:mx-6 lg:mx-auto lg:w-[996px]">
      <div className="sm:my-10 sm:mt-20 flex w-full justify-center md:my-20 lg:my-10 lg:mb-32">
        {}
        <Button variant="solid" size="large" className="w-[473px] h-[48px] rounded-[32px] bg-gradient-to-r from-[#10B981] to-[#A3E635] p-0">
          지금 시작하기
        </Button>
        {}
      </div>
      <div className="w-full rounded-3xl p-px bg-brand-gradient">
        <div className="gradient-border flex w-full flex-col rounded-40 px-[54px] md:px-[81px] lg:px-[174px] rounded-[calc(1.5rem-1px)] p-2 bg-background-primary dark:bg-gray-900 ">
          <div className="mx-auto flex flex-col items-center md:w-full md:flex-row md:justify-around lg:flex-row lg:w-full lg:justify-around">
            <div className="flex-start sm:my-12 flex w-full flex-col gap-4 order-2 md:w-40 lg:w-52">
              <Image
                alt="폴더 랜딩아이콘"
                src={ICON_PATHS.LANDING_FOLDER}
                width={48}
                height={48}
                className="rounded-lg shadow-[0_0_12px_2px_rgba(0,0,0,0.25)]"
              />
              <h2 className="flex flex-col gap-1">
                그룹으로 <span> 할 일을 관리해요 </span>
              </h2>
            </div>
            <Image
              alt="팀 관리 랜딩이미지"
              src={IMAGE_PATHS.LANDING_TEAM}
              width={291}
              height={338}
              className="md:order-1 md:pt-[81px] sm:order-2"
            />
          </div>
        </div>
      </div>
      <div className="flex w-full rounded-3xl border-[1px] border-[rgba(248,250,252,0.1)] bg-background-secondary px-[54px] md:px-[81px] lg:px-[174px]">
        <div className="mx-auto flex flex-col items-center md:w-full md:flex-row md:justify-around lg:flex-row lg:w-full lg:justify-around">
          <Image
            alt="멤버 초대 랜딩이미지"
            src={IMAGE_PATHS.LANDING_INVITE}
            width={291}
            height={338}
            className="order-2 md:pb-[81px]"
          />
          <div className="flex-start sm:my-12 flex w-full flex-col gap-4 order-1 sm:order-2 md:w-40 md:items-end lg:w-52">
            <Image
              alt="이메일 랜딩아이콘"
              src={ICON_PATHS.LANDING_EMAIL}
              width={48}
              height={48}
              className="rounded-lg shadow-[0_0_12px_2px_rgba(0,0,0,0.25)]"
            />
            <h2 className="flex flex-col gap-1 md:text-end">
              간단하게 멤버들을 <span> 초대해요 </span>
            </h2>
          </div>
        </div>
      </div>
      <div className="flex w-full rounded-3xl bg-slate-950 px-[54px] lg:px-[81px] lg:px-[174px]">
        <div className="mx-auto flex flex-col items-center p-2 md:w-full md:flex-row md:justify-around lg:flex-row lg:w-full lg:justify-around">
          <Image
            alt="투두 기능 랜딩이미지"
            src={IMAGE_PATHS.LANDING_TODO}
            width={291}
            height={338}
            className="md:pb-[51px]"
          />
          <div className="flex-start my-12 flex w-full flex-col gap-4 md:w-40 lg:w-52">
            <Image
              alt="이메일 체크아이콘"
              src={ICON_PATHS.LANDING_CHECK}
              width={48}
              height={48}
              className="rounded-lg shadow-[0_0_12px_2px_rgba(0,0,0,0.25)]"
            />
            <h2 className="flex flex-col gap-1">
              할 일도 간편하게 <span> 체크해요 </span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}