import Image from 'next/image';

import useResponsiveDivision from '@/lib/hooks/useResponsiveDivision';
import IMAGE_PATHS from '@/lib/constants/imagePaths';

export default function Footer() {
  const { src } = useResponsiveDivision({
    mobile: {
      src: IMAGE_PATHS.LADNING_WORKERS_S,
    },
    tablet: {
      src: IMAGE_PATHS.LADNING_WORKERS_M,
    },
    pc: {
      src: IMAGE_PATHS.LADNING_WORKERS_L,
    },
  });

  return (
    <footer className="relative h-[640px] w-full md:h-[940px] lg:h-[1080px]">
      <div className="absolute top-1/4 flex w-full flex-col items-center gap-4 text-center text-text-primary md:gap-6">
        <h3 className="sm:text-[20px] md:text-[40px] lg:text-[40px] font-semibold">
          지금 바로 시작해보세요
        </h3>
        <p className="text-[24px] sm:text-[16px]">
          팀원 모두와 같은 방향,
          <span className="inline sm:block">
            같은 속도로 나아가는 가장 쉬운 방법
          </span>
        </p>
      </div>
      <Image
        src={src}
        alt="하단 배너 협업이미지"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 h-full"
      />
    </footer>
  );
}