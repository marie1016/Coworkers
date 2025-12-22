import { useEffect, useState } from "react";

const useResponsiveSize = () => {
  const [scale, setScale] = useState({
    width: 0,
    height: 0,
  });

  const updateScale = () => {
    if (typeof window !== "undefined") {
      setScale({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateScale);
      updateScale();
      return () => window.removeEventListener("resize", updateScale);
    }
    return undefined;
  }, []);

  const { width } = scale;
  const isMobile = width < 639;
  const isTablet = width >= 640 && width < 1200;
  const isPC = width >= 1200;

  return { scale, isMobile, isTablet, isPC };
};

export default useResponsiveSize;
