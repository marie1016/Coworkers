import { useEffect, useState } from 'react';

const useResponsiveSize = () => {
  const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight });

  const updateViewportSize = () => {
    setViewport({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', updateViewportSize);
    return () => window.removeEventListener('resize', updateViewportSize);
  }, []);

  const { width } = viewport;
  const isMobile = width < 639;
  const isTablet = width >= 640 && width < 1200;
  const isPC = width >= 1200;

  return { viewport, isMobile, isTablet, isPC };
};

export default useResponsiveSize;