import {useRef, useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import FormInstituicao from "../../FormInstituicao/index.jsx";
import {useInstitutionStore} from "../../../../store/instituicoesStore.js";

const EditModal = ({ rowData, show, handleClose }) => {
    const editInstitution = useInstitutionStore((state) => state.editInstitution);
    const [formData, setFormData] = useState({});
    const formikRef = useRef(); // Reference to Formik instance

    const handleSave = async () => {
        if (formikRef.current) {
            const isValid = await formikRef.current.validateForm(); // Validate the form
            if (Object.keys(isValid).length === 0) { // Check if there are no validation errors
                const formData = formikRef.current.values; // Access the current form values
                if (rowData._id) {
                    await editInstitution(rowData._id, formData);
                }
                handleClose();
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className="bg-warning" >
                <Modal.Title>Editar Instituição</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormInstituicao initialData={rowData} innerRef={formikRef}/>
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
