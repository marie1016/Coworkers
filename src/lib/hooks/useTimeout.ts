import { MutableRefObject, useEffect, useRef } from "react";

export default function useTimeout(callbackFn: () => void, time: number) {
  const timerRef: MutableRefObject<NodeJS.Timeout | null> = useRef(null);

  const timeout = () => {
    timerRef.current = setTimeout(() => callbackFn(), time);
  };

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  return timeout;
}
