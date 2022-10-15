import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import "./Register.css";

const Register = () => {
  const initialValues = {
    userName: "",
    password: "",
    email:"",
    role:"",
    continent:"",
    region:""
  };

  const onSubmit = () => {
    alert("alertaaa");
  };

  const validationSchema = yup.object().shape({
    userName: yup.string().required(),
    userName:yup.string().required(),
    password:yup.string().required(),
    email:yup.string().required(),
    role:yup.string().required(),
    continent:yup.string().required(),
    region:yup.string().required()
  });
  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const { handleSubmit, handleChange, values, errors } = formik;

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>
        <div>
          <label>Nombre de usuario</label>
          <input
            name="userName"
            type="text"
            value={values.userName}
            onChange={handleChange}
          />
          {formik.errors.userName && <div>{errors.userName}</div>}
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
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
          />
          {formik.errors.email && <div>{errors.email}</div>}
        </div>
        <input type="hidden" name="teamID" value="123a" />
        <div>
          <label>Rol</label>
          <select name="role" onChange={handleChange} value={values.role}>
            <option value="">Selecciona un rol</option>
            <option value="Team Member">Team Member</option>
            <option value="Team Leader">Team Leader</option>
          </select>
          {formik.errors.role && <div>{errors.role}</div>}
        </div>
        <div>
          <label>Continente</label>
          <select
            name="continent"
            onChange={handleChange}
            value={values.continent}
          >
            <option value="">Selecciona un continente</option>
            <option value="America">America</option>
            <option value="Europa">Europa</option>
            <option value="Otro">Otro</option>
          </select>
          {formik.errors.continent && <div>{errors.continent}</div>}
        </div>
        <div>
          <label>Region</label>
          <select name="region" onChange={handleChange} value={values.region}>
            <option value="">Selecciona una region</option>
            <option value="Latam">Latam</option>
            <option value="Brasil">Brasil</option>
            <option value="America del Norte">America del Norte</option>
            <option value="Otro">Otro</option>
          </select>
          {formik.errors.region && <div>{errors.region}</div>}
        </div>
        <div>
          <input type="submit" value="Enviar" />
        </div>
      </form>
    </div>
  );
};

export default Register;
