import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DoneAllModal({ id }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDoneAll = async () => {
    try {
      await axios.put("http://localhost:8800/tasks", { is_completed: 1 });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleShow} className="c-btn c-btn-icon c-btn--suceess">
        <span className="material-symbols-outlined">check</span>
        <p>Done all</p>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Done confimation</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to mark as done all the tasks?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDoneAll}>
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

export default DoneAllModal;
