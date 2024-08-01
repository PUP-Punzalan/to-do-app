import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteAllModal({ id }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteAll = async () => {
    try {
      await axios.delete("http://localhost:8800/tasks");
      // setTasks([]);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleShow} className="c-btn c-btn-icon c-btn--danger">
        <span className="material-symbols-outlined">delete</span>
        <p>Delete all</p>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Delete confimation</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete all the tasks?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteAll}>
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

export default DeleteAllModal;
