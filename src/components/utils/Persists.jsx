import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useWizardStore = create(
  persist(
    (set) => ({
      step: 0,
      formData: {},
      completedSteps: [],
      setStep: (step) => set({ step }),
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      markStepCompleted: (stepIndex) =>
        set((state) => ({
          completedSteps: [...new Set([...state.completedSteps, stepIndex])],
        })),

      resetWizard: () =>
        set({
          step: 0,
          formData: {},
          completedSteps: [],
        }),
    }),
    {
      name: 'wizard-storage-form-persist',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        step: state.step,
        formData: state.formData,
        completedSteps: state.completedSteps,
      }),
    }
  )
);