import { create } from 'zustand';

export const useToastStore = create((set) => ({
    toasts: [],
    addToast: (message, variant = 'success') =>
        set((state) => ({
            toasts: [...state.toasts, { id: Date.now(), message, variant }],
        })),
    removeToast: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
        })),
}));
