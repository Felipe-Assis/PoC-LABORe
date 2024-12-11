import {Button, Modal} from "react-bootstrap";
import {useInstitutionStore} from "../../../../store/instituicoesStore.js";

const DeleteModal = ({ rowData, show, handleClose }) => {
    const deleteInstitution = useInstitutionStore((state) => state.deleteInstitution);

    const handleDelete = async () => {
        if (rowData?._id) { // Ensure the rowData has an _id before calling delete
            await deleteInstitution(rowData?._id); // Use the backend _id field
        }
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Deletar Instituição</Modal.Title>
            </Modal.Header>
            <Modal.Body>Tem certeza que deseja deletar {rowData.nome}?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Deletar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;