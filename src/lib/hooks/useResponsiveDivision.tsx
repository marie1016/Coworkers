import useResponsiveSize from './useResponsiveSize';

interface ImageDetail {
  src: string;
  width?: number;
  height?: number;
}

interface ImageDetails {
  mobile: ImageDetail;
  tablet: ImageDetail;
  pc: ImageDetail;
}

const useResponsiveDivision = (defaultSrc: ImageDetails) => {
  const { isMobile, isTablet, isPC } = useResponsiveSize();

  const getImageDetails = (): ImageDetail => {
    if (isMobile) return defaultSrc.mobile;
    if (isTablet) return defaultSrc.tablet;
    if (isPC) return defaultSrc.pc;

    return { src: '', width: 0, height: 0 };
  };

  const { src, width, height } = getImageDetails();

  return {
    src,
    width: width ?? 0,
    height: height ?? 0,
  };
};

export default useResponsiveDivision;