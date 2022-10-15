import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const navigate=useNavigate()
    const handleLogout = ()=>{
        localStorage.removeItem("logged");
        navigate("/login")
    }

  return (
    <header>
      <h2>Go Scrum</h2>
      <div onClick={handleLogout}>
        <h2>x</h2>
      </div>
    </header>
  );
};

export default Header;
