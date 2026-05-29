import { useEffect } from "react";

type UseAnalysisKeyboardNavigationParams = {
  onGoToStart: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  onGoToEnd: () => void;
  enabled?: boolean;
};

function isEditableTarget(target: EventTarget | null) {
  const element = target as HTMLElement | null;

  if (!element) return false;

  const tagName = element.tagName;
  return (
    element.isContentEditable ||
    tagName === "INPUT" ||
    tagName === "TEXTAREA" ||
    tagName === "SELECT"
  );
}

export function useAnalysisKeyboardNavigation({
  onGoToStart,
  onStepBack,
  onStepForward,
  onGoToEnd,
  enabled = true,
}: UseAnalysisKeyboardNavigationParams) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (isEditableTarget(event.target)) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          onStepBack();
          break;

        case "ArrowRight":
          event.preventDefault();
          onStepForward();
          break;

        case "ArrowUp":
        case "Home":
          event.preventDefault();
          onGoToStart();
          break;

        case "ArrowDown":
        case "End":
          event.preventDefault();
          onGoToEnd();
          break;

        default:
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onGoToStart, onStepBack, onStepForward, onGoToEnd]);
}