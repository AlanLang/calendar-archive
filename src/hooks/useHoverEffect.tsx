import { useCallback, useEffect, useRef, useState } from "react";

export function useHover({
  isHover = () => true,
}: {
  isHover?: (e: MouseEvent) => boolean;
}) {
  const target = useRef<HTMLDivElement | null>(null);
  const mouseOutTimeoutId = useRef<number | null>(null);
  const mouseInTimeoutId = useRef<number | null>(null);
  const isHoverOn = useRef<boolean>(false);
  const [hoverEventState, setHoverEventState] = useState<MouseEvent | null>(
    null
  );

  const handleTargetHover = useCallback(
    (e: MouseEvent) => {
      mouseOutTimeoutId.current && clearTimeout(mouseOutTimeoutId.current);
      if (isHover(e)) {
        if (isHoverOn.current) {
          setHoverEventState(e);
          return;
        }
        mouseInTimeoutId.current = window.setTimeout(() => {
          setHoverEventState(e);
          isHoverOn.current = true;
        }, 500);
      } else {
        mouseInTimeoutId.current && clearTimeout(mouseInTimeoutId.current);
        mouseOutTimeoutId.current = window.setTimeout(() => {
          setHoverEventState(null);
          isHoverOn.current = false;
        }, 100);
      }
    },
    [isHover]
  );

  const handleClearHoverEvent = useCallback(() => {
    setHoverEventState(null);
    isHoverOn.current = false;
  }, []);

  useEffect(() => {
    target.current?.addEventListener("mousemove", handleTargetHover);
    target.current?.addEventListener("mouseleave", handleClearHoverEvent);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      target.current?.removeEventListener("mousemove", handleTargetHover);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      target.current?.removeEventListener("mouseleave", handleClearHoverEvent);
      mouseOutTimeoutId.current && clearTimeout(mouseOutTimeoutId.current);
      mouseInTimeoutId.current && clearTimeout(mouseInTimeoutId.current);
    };
  }, [handleTargetHover, handleClearHoverEvent]);

  return { ref: target, hoverEventState };
}
