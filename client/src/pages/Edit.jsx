import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { formatYYYYMMDD } from "../utils/FormatDate";

const Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const taskId = location.pathname.split("/")[2];

  const [task, setTask] = useState({
    // title: "",
    // desc: "",
    // author: "",
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get("http://localhost:8800/tasks/" + taskId);
        setTask(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTask();
  }, [taskId]);

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

    try {
      await axios.put("http://localhost:8800/tasks/" + taskId, task);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(task);

  return (
    <div className="task--cont">
      <h1>Edit</h1>
      <form>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={task.title}
        />
        <input
          type="text"
          name="desc"
          placeholder="Description"
          onChange={handleChange}
          value={task.desc}
        />
        <input
          type="checkbox"
          name="is_completed"
          placeholder="Is completed"
          onChange={handleChange}
          checked={task.is_completed === 1}
        />

        <input
          type="date"
          name="due_date"
          placeholder="Due Date"
          onChange={handleDateChange}
          value={task.due_date}
        />
        <button onClick={handleClick}>Edit task</button>
      </form>
    </div>
  );
};

export default Edit;
