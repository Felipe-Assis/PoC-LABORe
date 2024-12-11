import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FormInstituicao from '../FormInstituicao';
import { useInstitutionStore } from '../../../store/instituicoesStore';

const AddButton = () => {
    const [show, setShow] = useState(false);
    const addInstitution = useInstitutionStore((state) => state.addInstitution);
    const [formData, setFormData] = useState({});

    const handleClose = () => setShow(false);
    const handleSave = async () => {
        console.log('handleSave', formData);
        await addInstitution(formData);
        handleClose();
    };

    return (
        <div className="add-button-container">
            <Button variant="success" onClick={() => setShow(true)}>
                <FontAwesomeIcon icon={faPlus} /> Nova Instituição
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nova Instituição</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormInstituicao onChange={setFormData} />
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
