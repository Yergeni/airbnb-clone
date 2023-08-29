import { create } from 'zustand';

type CancelReservationModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useCancelReservationModal = create<CancelReservationModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCancelReservationModal;
