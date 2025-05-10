import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  selectedDoctor: string | null;
  openModal: () => void;
  closeModal: () => void;
  setDoctor: (doctorName: string) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  selectedDoctor: null,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  setDoctor: (doctorName) => set({ selectedDoctor: doctorName }),
}));
