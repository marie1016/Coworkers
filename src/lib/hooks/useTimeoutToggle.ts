import { useState } from "react";
import useTimeout from "./useTimeout";

export default function useTimeoutToggle(
  defaultBool?: boolean,
  delay?: number,
) {
  const bool = defaultBool ?? false;
  const time = delay ?? 700;

  const [isOn, setIsOn] = useState(bool);
  const callbackTimeout = useTimeout(() => setIsOn((prev) => !prev), time);

  const timeoutToggle = () => {
    setIsOn(!isOn);
    callbackTimeout();
  };

  return { isOn, timeoutToggle };
}
