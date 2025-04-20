"use client";
import { useRef, useState, useEffect } from "react";

const ResizableWrapper = ({ children }: { children: React.ReactNode }) => {
  const isDragging = useRef(false);
  const [width, setWidth] = useState(240);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      setWidth(Math.min(Math.max(e.clientX, 160), 480)); // batas min-max lebar
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="flex h-screen">
      <div style={{ width }} className="h-screen">
        {children}
      </div>
      <div
        onMouseDown={() => (isDragging.current = true)}
        className="w-[3px] cursor-col-resize bg-gray-600 hover:bg-gray-400"
      />
    </div>
  );
}

export default ResizableWrapper;