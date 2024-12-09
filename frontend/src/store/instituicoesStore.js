import { create } from 'zustand';

export const useInstitutionStore = create((set) => ({
    institutions: [
        { nome: 'Instituição A', uf: 'SP', qtdAlunos: 1200 },
        { nome: 'Instituição B', uf: 'RJ', qtdAlunos: 800 },
        { nome: 'Instituição C', uf: 'MG', qtdAlunos: 950 },
    ],
    setInstitutions: (data) => set({ institutions: data }),
    addInstitution: (institution) =>
        set((state) => ({
            institutions: [...state.institutions, institution],
        })),
    removeInstitution: (index) =>
        set((state) => ({
            institutions: state.institutions.filter((_, i) => i !== index),
        })),
}));
