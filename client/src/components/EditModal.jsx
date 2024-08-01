import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { formatYYYYMMDD } from "../utils/FormatDate";

function EditModal({ id }) {
  const [task, setTask] = useState({});
  const [show, setShow] = useState(false);
  const [error, setError] = useState(""); // State to store validation error message

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get("http://localhost:8800/tasks/" + id);
        setTask(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTask();
  }, [id]);

  const handleClose = () => {
    setShow(false);
    setError(""); // Clear error on modal close
  };
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (type === "checkbox") {
      setTask((prev) => ({ ...prev, [name]: checked ? 1 : 0 }));
    } else {
      setTask((prev) => ({ ...prev, [name]: value }));
    }
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
      await axios.put("http://localhost:8800/tasks/" + id, task);
      setError(""); // Clear error on successful submission
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleShow} className="c-btn--primary">
        <span className="material-symbols-outlined">edit</span>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Edit task {task && task.id}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <p style={{ color: "red", marginBottom: "16px" }}>{error}</p>
          )}{" "}
          {/* Display error message */}
          {task ? (
            <>
              <div className="input--field">
                <label htmlFor="title">Title</label>
                <input
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
                  name="desc"
                  placeholder="Description"
                  onChange={handleChange}
                  value={task.desc}
                />
              </div>
            </>
          ) : (
            <p>Loading task data...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClick}>
            Save changes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
