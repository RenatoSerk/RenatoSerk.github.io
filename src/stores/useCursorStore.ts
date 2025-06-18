import { create } from 'zustand';

type CursorState = {
  isHovering: boolean;
  isDragging: boolean;
  setIsHovering: (value: boolean) => void;
  setIsDragging: (value: boolean) => void;
};

export const useCursorStore = create<CursorState>()((set) => ({
  isHovering: false,
  setIsHovering: (value) => set({ isHovering: value }),
  isDragging: false,
  setIsDragging: (value) => set({ isDragging: value }),
}));