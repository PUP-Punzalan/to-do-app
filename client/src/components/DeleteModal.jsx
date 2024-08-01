import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteModal({ id }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/tasks/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleShow} className="c-btn--danger">
        <span className="material-symbols-outlined">delete</span>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Delete confimation</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this note?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDelete}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
