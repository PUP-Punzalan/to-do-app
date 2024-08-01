import axios from "axios";
import { useContext } from "react";
import { TasksContext } from "../App";
import { Link } from "react-router-dom";
import AddModal from "./AddModal";
import DeleteAllModal from "./DeleteAllModal";
import DoneAllModal from "./DoneAllModal";

const Sidebar = () => {
  const { tasks, setTasks } = useContext(TasksContext);

  return (
    <div className="sidebar--cont">
      <div className="side">
        <div className="logo--cont">
          <img
            src="https://lexmeet.com/images/logo/main.png"
            className="logo"
            alt="hello"
          />
        </div>

        <div className="search--cont">
          <label htmlFor="search" className=" material-symbols-outlined">
            search
          </label>
          <input type="text" id="search" placeholder="Search" />
        </div>

        <div className="actions--cont">
          <div className="title">
            <p className="sm semi-bold">Actions</p>
          </div>
          <div className="list">
            {/* <button className="">
              <Link to="/add" className="c-btn c-btn-icon c-btn--primary">
                <span className="material-symbols-outlined">add</span>
                <p>Add new task</p>
              </Link>
            </button> */}
            <AddModal />
            <DoneAllModal />

            <DeleteAllModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
