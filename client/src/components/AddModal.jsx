import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { formatYYYYMMDD } from "../utils/FormatDate";

function AddModal() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(""); // State to store validation error message
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [task, setTask] = useState({
    title: "",
    desc: "",
    is_completed: 0,
    due_date: "",
  });

  const handleChange = (e) => {
    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDateChange = (e) => {
    setTask((prev) => ({ ...prev, due_date: formatYYYYMMDD(e.target.value) }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Validation check
    if (!task.title || !task.desc || !task.due_date) {
      setError("All fields must be filled out.");
      return;
    }

    try {
      await axios.post("http://localhost:8800/tasks", task);
      setError(""); // Clear error on successful submission
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleShow} className="c-btn c-btn-icon c-btn--primary">
        <span className="material-symbols-outlined">add</span>
        <p>Add new task</p>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Add new task</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <p style={{ color: "red", marginBottom: "16px" }}>{error}</p>
          )}{" "}
          <div className="input--field">
            <label htmlFor="title">Title</label>
            <input
              required
              type="text"
              name="title"
              placeholder="Enter title"
              onChange={handleChange}
              value={task.title}
            />
          </div>
          <div className="input--field">
            <label htmlFor="due_date">Due Date</label>
            <input
              required
              type="date"
              name="due_date"
              placeholder="Due Date"
              onChange={handleDateChange}
              value={task.due_date}
            />
          </div>
          <div className="input--field">
            <label htmlFor="desc">Description</label>
            <textarea
              required
              name="desc"
              placeholder="Description"
              onChange={handleChange}
              value={task.desc}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClick}>
            Add task
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              setError(""); // Clear error on cancel
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddModal;
