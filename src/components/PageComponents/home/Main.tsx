import Image from 'next/image';

import useResponsiveDivision from '@/lib/hooks/useResponsiveDivision';
import IMAGE_PATHS from '@/lib/constants/imagePaths';
import ICON_PATHS from '@/lib/constants/iconPaths';

export default function Main() {
  const { src, width, height } = useResponsiveDivision({
    mobile: {
      src: IMAGE_PATHS.LADNING_TRAIN_S,
      width: 375,
      height: 480,
    },
    tablet: {
      src: IMAGE_PATHS.LADNING_TRAIN_M,
      width: 744,
      height: 660,
    },
    pc: {
      src: IMAGE_PATHS.LADNING_TRAIN_L,
      width: 1920,
      height: 862,
    },
  });

  return (
    <section className="relative w-full">
      <Image
        src={src}
        alt="상단 배너 기차이미지"
        layout="responsive"
        width={width}
        height={height}
        className="w-full"
      />
      <div className="absolute sm:top-[55px] flex w-full flex-col items-center gap-1 text-center md:top-[100px] md:gap-2 lg:top-[84px] lg:gap-5">
        <div className="flex h-full items-center sm:gap-1 md:gap-4 lg:gap-6">
          <h1 className="sm:text-[24px] md:text-[40px] lg:text-[48px] lg:text-[48px] leading-[38.38px]  font-semibold">
            함께 만들어가는 투두 리스트
          </h1>
          <Image
            alt="작업 도구 아이콘"
            src={ICON_PATHS.REPAIR}
            width={56}
            height={56}
            className="sm:h-7 sm:w-7 md:h-12 md:w-12 lg:h-17 lg:w-17"
          />
        </div>
        <h1 className="sm:text-[32px] md:text-[48px] lg:text-[64px] leading-[58.38px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#CEF57E]">
          Coworkers
        </h1>
      </div>
    </section>
  );
}