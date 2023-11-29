import { create } from "zustand";

interface AddMemberModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddMemberModal = create<AddMemberModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddMemberModal;
