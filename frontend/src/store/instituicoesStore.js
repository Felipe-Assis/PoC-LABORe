import { create } from 'zustand';
import { useToastStore } from './toastStore';
import backendUrl from "../utils/backend-url.js";
import apiRequest from "../utils/api-request.js";

export const useInstitutionStore = create((set) => {
    const addToast = useToastStore.getState().addToast;

    return {
        institutions: [],
        studentCountsByUF: [],
        selectedIds: [],
        setSelectedIds: (ids) => set({ selectedIds: ids }), // Action to update selected rows
        clearSelectedIds: () => set({ selectedIds: [] }), // Action to clear selection
        fetchInstitutions: async () => {
            try {
                const data = await apiRequest(`${backendUrl}/instituicoes`, {}, null);
                set({ institutions: data });
            } catch {
                console.error('Error fetching institutions');
            }
        },
        fetchStudentCountsByUF: async () => {
            try {
                const data = await apiRequest(`${backendUrl}/instituicoes/qtd-alunos-por-uf`, {}, null);
                set({ studentCountsByUF: data });
            } catch {
                console.error('Error fetching student counts by UF');
            }
        },
        addInstitution: async (institution) => {
            try {
                const newInstitution = await apiRequest(
                    `${backendUrl}/instituicoes`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(institution),
                    },
                    addToast
                );

                if (newInstitution.details) {
                    addToast(newInstitution.details, 'danger');
                } else {
                    set((state) => ({
                        institutions: [...state.institutions, newInstitution],
                    }));
                    addToast('Instituição adicionada com sucesso!', 'success');
                }
            } catch {
                addToast('Erro ao adicionar instituição.', 'danger');
            }
        },
        editInstitution: async (id, updatedData) => {
            try {
                const updatedInstitution = await apiRequest(
                    `${backendUrl}/instituicoes/${id}`,
                    {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedData),
                    },
                    addToast
                );

                set((state) => ({
                    institutions: state.institutions.map((inst) =>
                        inst._id === id ? updatedInstitution : inst
                    ),
                }));
                addToast('Instituição editada com sucesso!', 'success');
            } catch {
                addToast('Erro ao editar instituição.', 'danger');
            }
        },
        deleteInstitution: async (id) => {
            try {
                await apiRequest(
                    `${backendUrl}/instituicoes/${id}`,
                    { method: 'DELETE' },
                    addToast
                );

                set((state) => ({
                    institutions: state.institutions.filter((inst) => inst._id !== id),
                }));
                addToast('Instituição deletada com sucesso!', 'success');
            } catch {
                addToast('Erro ao deletar instituição.', 'danger');
            }
        },
        bulkDeleteInstitutions: async () => {
            const ids = useInstitutionStore.getState().selectedIds;
            console.log(`deleteInstitutions`, ids)

            if (!Array.isArray(ids) || ids.length === 0) {
                addToast('Nenhuma instituição selecionada para deletar.', 'warning');
                return;
            }

            try {
                const result = await apiRequest(
                    `${backendUrl}/instituicoes/bulk-delete`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ids }),
                    },
                    addToast
                );

                set((state) => ({
                    institutions: state.institutions.filter(
                        (inst) => !ids.includes(inst._id)
                    ),
                    selectedIds: [], // Clear selection after deletion
                }));
                addToast(
                    `Instituições deletadas com sucesso! (${result.deletedCount})`,
                    'success'
                );
            } catch {
                addToast('Erro ao deletar instituições.', 'danger');
            }
        },
    };
});
