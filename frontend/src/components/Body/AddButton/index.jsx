import {useRef, useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FormInstituicao from '../FormInstituicao';
import { useInstitutionStore } from '../../../store/instituicoesStore';
import './index.css';

const AddButton = () => {
    const [show, setShow] = useState(false);
    const [shake, setShake] = useState(false); // For modal shaking effect
    const addInstitution = useInstitutionStore((state) => state.addInstitution);
    const [formData, setFormData] = useState({});
    const formikRef = useRef(); // Reference to Formik instance

    const handleClose = () => setShow(false);
    const handleSave = async () => {
        if (formikRef.current) {
            const errors = await formikRef.current.validateForm();
            formikRef.current.setTouched(
                Object.keys(formikRef.current.initialValues).reduce(
                    (acc, key) => ({ ...acc, [key]: true }),
                    {}
                ),
                true
            );

            if (Object.keys(errors).length > 0) {
                setShake(true); // Trigger shake effect
                setTimeout(() => setShake(false), 500); // Remove shake effect after animation
            } else {
                const formData = formikRef.current.values;
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

            <Modal show={show}
                   onHide={handleClose}
                   className={shake ? 'shake-modal' : ''} // Add shake class conditionally
            >
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
