import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Tasks, Add, Edit } from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";
import Sidebar from "./components/Sidebar";
import axios from "axios";

export const TasksContext = createContext();

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/tasks");
        setTasks(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <BrowserRouter>
          <Sidebar />

          <Routes>
            <Route path="/" element={<Tasks />} />
            <Route path="/add" element={<Add />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </BrowserRouter>
      </TasksContext.Provider>
    </div>
  );
};

export default App;
