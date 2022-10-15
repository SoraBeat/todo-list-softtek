import React from "react";
import { useFormik } from "formik";

import { useNavigate } from "react-router-dom";
import "./Login.css"

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email vacio";
    }
    if (!values.password) {
      errors.password = "Password vacio";
    }
    return errors;
  };
  const onSubmit = () => {
    localStorage.setItem("logged", "yes");
    navigate("/tasks");
  };

  const formik = useFormik({ initialValues, validate, onSubmit });
  const { handleSubmit, handleChange, values, errors } = formik;

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Iniciar sesion</h1>
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
          />
          {formik.errors.email && <div>{errors.email}</div>}
        </div>
        <div>
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
          {formik.errors.password && <div>{errors.password}</div>}
        </div>
        <div>
          <input type="submit" value="Enviar" />
        </div>
      </form>
    </div>
  );
};

export default Login;
