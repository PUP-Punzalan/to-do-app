import axios from "axios";
import React from "react";
import { formatMMMMDDYYYY } from "../utils/FormatDate";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const TaskCard = ({ task }) => {
  const handleComplete = async (id) => {
    try {
      await axios.patch(`http://localhost:8800/tasks/${id}`, {
        is_completed: task.is_completed === 1 ? 0 : 1,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="task-card--cont">
      <div className="side">
        <div className="inside">
          <div className="title">
            <h6
              className="c-title"
              style={{
                textDecoration:
                  task.is_completed === 1 ? "line-through" : "none",
                color: task.is_completed === 1 ? "gray" : "black",
              }}
            >
              {task.title}
            </h6>
            <div className="checkbox-wrapper-12">
              <div className="cbx">
                <input
                  id="cbx-12"
                  type="checkbox"
                  checked={task.is_completed === 1}
                  onChange={() => handleComplete(task.id)}
                />
                <label htmlFor="cbx-12"></label>
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                  <path d="M2 8.36364L6.23077 12L13 2"></path>
                </svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <filter id="goo-12">
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="4"
                      result="blur"
                    ></feGaussianBlur>
                    <feColorMatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                      result="goo-12"
                    ></feColorMatrix>
                    <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
          <div className="due-date">
            <span className="material-symbols-outlined c-icon-md">
              event_available
            </span>
            <p className="sm">{formatMMMMDDYYYY(task.due_date)}</p>
          </div>
        </div>
        <div className="side">
          <p className="sm c-desc">{task.desc}</p>
        </div>
      </div>
      <div className="bottom">
        <p className="xs">{formatMMMMDDYYYY(task.created_at)}</p>
        <div className="actions">
          {/* <Link to={`/edit/${task.id}`} className="c-btn--primary">
            <span className="material-symbols-outlined">edit</span>
          </Link> */}
          <EditModal id={task.id} />

          <DeleteModal id={task.id} />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
