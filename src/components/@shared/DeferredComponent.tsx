import { PropsWithChildren, useState, useEffect } from "react";

export default function DeferredComponent({ children }: PropsWithChildren) {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsDeferred(true);
    }, 200);
    return () => clearInterval(timeOut);
  }, []);

  if (!isDeferred) return null;
  return <div>{children}</div>;
}
