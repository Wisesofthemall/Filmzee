import { create } from "zustand";

interface ImageModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useImageModal = create<ImageModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useImageModal;
