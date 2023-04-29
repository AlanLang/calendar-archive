import { useCallback, useEffect, useRef, useState } from "react";

export function useHover({
  isHover = () => true,
  mouseEnterDelay = 500,
  mouseLeaveDelay = 100,
}: {
  isHover?: (e: MouseEvent) => boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
}) {
  const target = useRef<HTMLDivElement | null>(null);
  const [transitionString, setTransitionString] = useState<string>("");
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
        setTransitionString("enter");
        if (isHoverOn.current) {
          setHoverEventState(e);
          return;
        }
        mouseInTimeoutId.current = window.setTimeout(() => {
          setHoverEventState(e);
          isHoverOn.current = true;
        }, mouseEnterDelay);
      } else {
        setTransitionString("leave");
        mouseInTimeoutId.current && clearTimeout(mouseInTimeoutId.current);
        mouseOutTimeoutId.current = window.setTimeout(() => {
          setHoverEventState(null);
          isHoverOn.current = false;
        }, mouseLeaveDelay);
      }
    },
    [isHover, mouseEnterDelay, mouseLeaveDelay]
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

  return { ref: target, hoverEventState, transitionString };
}
