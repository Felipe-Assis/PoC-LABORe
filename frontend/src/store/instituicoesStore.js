import { create } from 'zustand';
import { useToastStore } from './toastStore';
const baseUrl = "http://localhost:1713/";

export const useInstitutionStore = create((set) => {
    const addToast = useToastStore.getState().addToast;

    return {
        institutions: [],
        studentCountsByUF: [],
        fetchInstitutions: async () => {
            try {
                const response = await fetch(`${baseUrl}instituicoes`);
                const data = await response.json();
                set({ institutions: data });
            } catch (error) {
                console.error('Error fetching institutions:', error);
            }
        },
        fetchStudentCountsByUF: async () => { // Function to fetch aggregated data
            try {
                const response = await fetch(`${baseUrl}instituicoes/qtd-alunos-por-uf`);
                const data = await response.json();
                set({ studentCountsByUF: data });
            } catch (error) {
                console.error('Error fetching student counts by UF:', error);
            }
        },
        addInstitution: async (institution) => {
            try {
                const response = await fetch(`${baseUrl}instituicoes`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(institution),
                });
                const newInstitution = await response.json();
                set((state) => ({
                    institutions: [...state.institutions, newInstitution],
                }));
                addToast('Instituição adicionada com sucesso!', 'success');
            } catch (error) {
                console.error('Error adding institution:', error);
                addToast('Erro ao adicionar instituição.', 'danger');
            }
        },
        editInstitution: async (id, updatedData) => {
            try {
                const response = await fetch(`${baseUrl}instituicoes/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedData),
                });
                const updatedInstitution = await response.json();
                set((state) => ({
                    institutions: state.institutions.map((inst) =>
                        inst._id === id ? updatedInstitution : inst
                    ),
                }));
                addToast('Instituição editada com sucesso!', 'success');
            } catch (error) {
                console.error('Error editing institution:', error);
                addToast('Erro ao editar instituição.', 'danger');
            }
        },
        deleteInstitution: async (id) => {
            console.log("delete", id);
            try {
                await fetch(`${baseUrl}instituicoes/${id}`, {
                    method: 'DELETE',
                });
                set((state) => ({
                    institutions: state.institutions.filter((inst) => inst._id !== id),
                }));
                addToast('Instituição deletada com sucesso!', 'success');
            } catch (error) {
                console.error('Error deleting institution:', error);
                addToast('Erro ao deletar instituição.', 'danger');
            }
        },
        bulkDeleteInstitutions: async (ids) => {
            if (!Array.isArray(ids) || ids.length === 0) {
                addToast('Nenhuma instituição selecionada para deletar.', 'warning');
                return;
            }

            try {
                const response = await fetch(`${baseUrl}instituicoes/bulk-delete`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ids }),
                });
                const result = await response.json();

                if (response.ok) {
                    set((state) => ({
                        institutions: state.institutions.filter(
                            (inst) => !ids.includes(inst._id)
                        ),
                    }));
                    addToast(
                        `Instituições deletadas com sucesso! (${result.deletedCount})`,
                        'success'
                    );
                } else {
                    addToast(result.error || 'Erro ao deletar instituições.', 'danger');
                }
            } catch (error) {
                console.error('Error deleting institutions:', error);
                addToast('Erro ao deletar instituições.', 'danger');
            }
        },
    }
});
