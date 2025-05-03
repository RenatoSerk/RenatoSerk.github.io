import React, { useEffect, useState, useMemo } from "react";
import { useCursorStore } from "./stores/useCursorStore";

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { isHovering, setIsHovering } = useCursorStore.getState();
  const checkHovering = React.useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const hoveringElement = target.closest("a, button, [role='button'], input, textarea, select");
    if (isHovering !== !!hoveringElement) setIsHovering(!!hoveringElement);
  }, [isHovering, setIsHovering]);


  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", checkHovering);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", checkHovering);
    };
  }, [setIsHovering, checkHovering]);

  const cursorStyles: React.CSSProperties = useMemo(() => {
    const size = isHovering ? 20 : 10;
    return {
      pointerEvents: "none",
      position: "fixed",
      top: 0,
      left: 0,
      width: size,
      height: size,
      transition: "transform 0.1s ease-out, width 0.4s ease-out, height 0.4s ease-out",
      zIndex: 9999,
      mixBlendMode: isHovering ? "difference" : "normal",
    };
  }, [isHovering]);

  const innerStyles = useMemo(() => ({
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    backgroundColor: isHovering ? "white" : "transparent",
    border: isHovering ? "6px solid transparent" : "6px solid orange",
    transition: "all 0.2s ease-out",
  }), [isHovering]);

  return (
    <div
      style={{
        ...cursorStyles,
        transform: `translate(${position.x - (cursorStyles.width as number)}px, ${position.y - (cursorStyles.height as number)}px)`,
      }}
    >
      <div style={innerStyles} />
    </div>
  );
};

export default CustomCursor;