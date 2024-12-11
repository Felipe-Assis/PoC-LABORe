import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import FormInstituicao from "../../FormInstituicao/index.jsx";
import {useInstitutionStore} from "../../../../store/instituicoesStore.js";

const EditModal = ({ rowData, show, handleClose }) => {
    const editInstitution = useInstitutionStore((state) => state.editInstitution);
    const [formData, setFormData] = useState({});

    const handleSave  = async () => {
        if (rowData._id) { // Ensure rowData has a valid _id before making API call
            await editInstitution(rowData?._id, formData); // Call the backend update function
        }
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className="bg-warning" >
                <Modal.Title>Editar Instituição</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormInstituicao initialData={rowData} onChange={setFormData} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;
