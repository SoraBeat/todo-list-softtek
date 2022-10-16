import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuid4 } from "uuid";
import { Switch, FormControlLabel } from "@mui/material";

import "../Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    localStorage.removeItem("logged");
    const getData = async () => {
      const res = await axios.get(process.env.REACT_APP_API_DATA);
      await setData(res.data);
    };
    getData();
  }, []);

  const initialValues = {
    userName: "",
    password: "",
    email: "",
    role: "",
    continent: "",
    region: "",
    teamID: "",
    switch: false,
  };

  const onSubmit = () => {
    const teamID = !values.teamID ? uuid4() : values.teamID;
    const postData = async () => {
      await axios.post(process.env.REACT_APP_API_TEAMS, {
        userName: values.userName,
        password: values.password,
        email: values.email,
        teamID,
        role: values.role,
        continent: values.continent,
        region: values.region,
      });
      await localStorage.setItem("logged", "true");
      await navigate(`/tasks/${teamID}/${values.userName}`);
    };
    postData();
  };

  const validationSchema = yup.object().shape({
    userName: yup
      .string()
      .required("Nombre de usuario es obligatorio")
      .min(4, "Minimo 4 caracteres")
      .matches(/^[a-zA-Z0-9]*$/, "No puede contener espacios"),
    password: yup.string().required("Contraseña es obligatoria"),
    email: yup
      .string()
      .required("Email es obligatorio")
      .email("Email invalido"),
    role: yup.string().required("Debe seleccionar un rol"),
    continent: yup.string().required("Debe seleccionar un continente"),
    region: yup.string().required("Debe seleccionar una region"),
    teamID: yup.string().when("switch", {
      is: true,
      then: yup.string().required("Debe ingresar un ID"),
    }),
  });

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
    setFieldValue,
  } = formik;
  const handleChangeContinent = (value) => {
    setFieldValue("continent", value);
    if (value !== "America") setFieldValue("region", "Otro");
  };

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
            onBlur={handleBlur}
            className={errors.userName && touched.userName ? "error" : ""}
          />
          {errors.userName && touched.userName && <div>{errors.userName}</div>}
        </div>
        <div>
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "error" : ""}
          />
          {errors.password && touched.password && <div>{errors.password}</div>}
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? "error" : ""}
          />
          {errors.email && touched.email && <div>{errors.email}</div>}
        </div>
        <div>
          <FormControlLabel
            control={
              <>
                <label>Perteneces a un equopo ya creado?</label>
                <Switch
                  value={values.switch}
                  onChange={() => setFieldValue("switch", !values.switch)}
                  name="switch"
                  color="secondary"
                />
              </>
            }
          />
        </div>
        {values.switch && (
          <div>
            <label>Team ID</label>
            <input
              name="teamID"
              type="text"
              value={values.teamID}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.teamID && touched.teamID ? "error" : ""}
            />
            {errors.teamID && touched.teamID && <div>{errors.teamID}</div>}
          </div>
        )}
        <div>
          <label>Rol</label>
          <select
            name="role"
            onChange={handleChange}
            value={values.role}
            onBlur={handleBlur}
            className={errors.role && touched.role ? "error" : ""}
          >
            <option value="">Seleccione un rol</option>
            {data?.role?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.role && touched.role && <div>{errors.role}</div>}
        </div>
        <div>
          <label>Continente</label>
          <select
            name="continent"
            onChange={(event) =>
              handleChangeContinent(event.currentTarget.value)
            }
            value={values.continent}
            onBlur={handleBlur}
            className={errors.continent && touched.continent ? "error" : ""}
          >
            <option value="">Seleccione un Continente</option>
            {data?.continent?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.continent && touched.continent && (
            <div>{errors.continent}</div>
          )}
        </div>
        {values.continent === "America" && (
          <div>
            <label>Region</label>
            <select
              name="region"
              onChange={handleChange}
              value={values.region}
              onBlur={handleBlur}
              className={errors.region && touched.region ? "error" : ""}
            >
              <option value="">Seleccione una region</option>
              {data?.region?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.region && <touched className="regio"></touched> && (
              <div>{errors.region}</div>
            )}
          </div>
        )}
        <div>
          <input type="submit" value="Registrarme" />
        </div>
        <div>
          <Link to={"/"}>Ya estoy registrado</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
