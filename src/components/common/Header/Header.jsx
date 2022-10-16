import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Header.css";

const Header = () => {
  const { userName } = useParams();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("logged");
    navigate("/");
  };
  const { tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  return (
    <header>
      <h2>ToDoList SOFTTEK</h2>
      <div className="wrapper_right_header">
        <div>
          <b>Tareas creadas: {tasks.length}</b>
        </div>
        <div>
          <b>{userName}</b>
        </div>
        <div onClick={handleLogout}>
          <h2>LOGOUT</h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
