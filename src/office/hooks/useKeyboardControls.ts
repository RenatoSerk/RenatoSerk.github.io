import { useEffect, useRef } from "react";

export const useKeyboardControls = () => {
  const keys = useRef({ w: false, a: false, s: false, d: false, ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key in keys.current) keys.current[event.key as keyof typeof keys.current] = true;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key in keys.current) keys.current[event.key as keyof typeof keys.current] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keys;
};