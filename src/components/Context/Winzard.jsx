import { create } from "zustand";

export const useWizardStore = create((set) => ({
  step: 1,
  data: {},
  setStep: (step) => set({ step }),
  updateData: (newData) =>
    set((state) => ({ data: { ...state.data, ...newData } })),
}));