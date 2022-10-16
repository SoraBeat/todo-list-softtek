import React from "react";
import { useFormik } from "formik";
import Swal from 'sweetalert2'

import { useNavigate, Link } from "react-router-dom";
import "../Auth.css";
import axios from "axios";

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
    const login = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_TEAMS}?email=${values.email}&password=${values.password}`
      );
       const user =await res.data[0];
      if (user) {
        await localStorage.setItem("logged", "yes");
        await navigate(`/tasks/${res.data[0].teamID}/${res.data[0].userName}`);
      } else {
        await Swal.fire("Inalid credentials, try again");
      }
    };
    login();
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
            className={errors.email ? "error" : ""}
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
            className={errors.password ? "error" : ""}
          />
          {formik.errors.password && <div>{errors.password}</div>}
        </div>
        <div>
          <input type="submit" value="Enviar" />
        </div>
        <div>
          <Link to={"/register"}>Registrarme</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
