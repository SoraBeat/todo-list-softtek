import React from "react";
import "./TaskForm.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

const TaskForm = ({ setRefresh, refresh }) => {
  const { teamID, userName } = useParams();
  const notify = () => toast("Has creado una nueva tarea!");
  const initialValues = {
    title: "",
    status: "",
    priority: "",
    description: "",
  };
  const validationSchema = yup.object().shape({
    title: yup.string().required("Titulo es requerido"),
    status: yup.string().required("Estado es requerido"),
    priority: yup.string().required("Prioridad es requerido"),
    description: yup.string().required("Descripcion es requerido"),
  });
  const onSubmit = () => {
    const postTask = async () => {
      await axios.post(process.env.REACT_APP_API_TASKS, {
        ...values,
        dateTime: new Date(),
        creator: userName,
        teamID,
      });
      await resetForm();
      await setRefresh(!refresh);
      await notify();
    };
    postTask();
  };

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
    resetForm,
  } = formik;

  return (
    <>
      <ToastContainer />
      <section className="task-form">
        <h2>Crear tarea</h2>
        <p>Crea tus tareas</p>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Titulo"
                className={errors.title && touched.title ? "error" : ""}
              />
              {errors.title && touched.title && <div>{errors.title}</div>}
            </div>
            <div>
              <select
                name="status"
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.status && touched.status ? "error" : ""}
              >
                <option value="">Seleccionar estado</option>
                <option value="new">Nuevo</option>
                <option value="inProcess">En proceso</option>
                <option value="done">Terminada</option>
              </select>
              {errors.status && touched.status && <div>{errors.status}</div>}
            </div>
            <div>
              <select
                name="priority"
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.priority && touched.priority ? "error" : ""}
              >
                <option value="">Seleccionar prioridad</option>
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
              {errors.priority && touched.priority && (
                <div>{errors.priority}</div>
              )}
            </div>
          </div>
          <div>
            <textarea
              name="description"
              onChange={handleChange}
              placeholder="Descripcion"
              onBlur={handleBlur}
              className={
                errors.description && touched.description ? "error" : ""
              }
            ></textarea>
            {errors.description && touched.description && (
              <div>{errors.description}</div>
            )}
          </div>
          <button type="submit">Crear</button>
        </form>
      </section>
    </>
  );
};

export default TaskForm;
