import {useRef, useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FormInstituicao from '../FormInstituicao';
import { useInstitutionStore } from '../../../store/instituicoesStore';

const AddButton = () => {
    const [show, setShow] = useState(false);
    const addInstitution = useInstitutionStore((state) => state.addInstitution);
    const [formData, setFormData] = useState({});
    const formikRef = useRef(); // Reference to Formik instance

    const handleClose = () => setShow(false);
    const handleSave = async () => {
        if (formikRef.current) {
            const isValid = await formikRef.current.validateForm(); // Validate the form
            if (Object.keys(isValid).length === 0) { // Check if there are no validation errors
                const formData = formikRef.current.values; // Access the current form values
                await addInstitution(formData);
                handleClose();
            }
        }
    };

    return (
        <div className="add-button-container">
            <Button className="add-button" variant="success" onClick={() => setShow(true)}>
                <FontAwesomeIcon icon={faPlus} /> Nova Instituição
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="bg-success" closeButton>
                    <Modal.Title>Nova Instituição</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormInstituicao innerRef={formikRef}  />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddButton;
