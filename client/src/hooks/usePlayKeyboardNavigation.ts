import { useEffect } from "react";

type UsePlayKeyboardNavigationParams = {
  onGoToStart: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  onGoToEnd: () => void;
};

function isTypingTarget(target: EventTarget | null) {
  const element = target as HTMLElement | null;
  if (!element) return false;

  const tag = element.tagName;
  return (
    element.isContentEditable ||
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT"
  );
}

export function usePlayKeyboardNavigation({
  onGoToStart,
  onStepBack,
  onStepForward,
  onGoToEnd,
}: UsePlayKeyboardNavigationParams) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isTypingTarget(event.target)) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onStepBack();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        onStepForward();
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        onGoToStart();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        onGoToEnd();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onGoToStart, onStepBack, onStepForward, onGoToEnd]);
}