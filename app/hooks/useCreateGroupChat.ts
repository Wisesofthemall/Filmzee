import { create } from "zustand";

interface CreateGroupChatModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreateGroupChatModal = create<CreateGroupChatModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCreateGroupChatModal;
