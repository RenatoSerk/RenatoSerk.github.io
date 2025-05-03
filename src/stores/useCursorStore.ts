import { create } from 'zustand';

type CursorState = {
  isHovering: boolean;
  setIsHovering: (value: boolean) => void;
};

export const useCursorStore = create<CursorState>()((set) => ({
  isHovering: false,
  setIsHovering: (value) => set({ isHovering: value }),
}));