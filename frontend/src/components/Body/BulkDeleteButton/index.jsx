import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useInstitutionStore } from '../../../store/instituicoesStore';

const BulkDeleteButton = () => {
    const [show, setShow] = useState(false);
    const { selectedIds, bulkDeleteInstitutions, clearSelectedIds } = useInstitutionStore();

    const handleClose = () => setShow(false);

    const handleDelete = async () => {
        await bulkDeleteInstitutions(selectedIds); // Perform bulk delete
        clearSelectedIds(); // Clear selected IDs after deletion
        handleClose();
    };

    return (
        <div className="bulk-delete-button-container">
            <Button variant="danger" onClick={() => setShow(true)}>
                <FontAwesomeIcon icon={faTrashCan} /> Deletar Selecionados
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza de que deseja excluir as instituições selecionadas? Esta ação não pode ser desfeita.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Deletar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BulkDeleteButton;
