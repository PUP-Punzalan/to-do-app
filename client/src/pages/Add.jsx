import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatYYYYMMDD } from "../utils/FormatDate";

const Add = () => {
  const navigate = useNavigate();

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

    try {
      await axios.post("http://localhost:8800/tasks", task);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(task);

  return (
    <div className="task--cont">
      <h1>Add</h1>
      <form>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="desc"
          placeholder="Description"
          onChange={handleChange}
        />

        <input
          type="date"
          name="due_date"
          placeholder="Due Date"
          onChange={handleDateChange}
          value={task.due_date}
        />
        <button onClick={handleClick}>Add task</button>
      </form>
    </div>
  );
};

export default Add;
