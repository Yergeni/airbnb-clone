import { create } from "zustand";

type DeletePropertyModalStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

const useDeletePropertyModal = create<DeletePropertyModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useDeletePropertyModal;
