import React from "react";
import "./TaskForm.css";
import { useFormik } from "formik";
import * as yup from "yup";

const TaskForm = () => {
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
    alert("ok");
  };

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const { handleSubmit, handleChange, errors, touched, handleBlur } = formik;

  return (
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
              className={errors.title?"error":""}
            />
            {errors.title && touched.title && <div>{errors.title}</div>}
          </div>
          <div>
            <select name="status" onChange={handleChange} onBlur={handleBlur} className={errors.status?"error":""}>
              <option value="">Seleccionar estado</option>
              <option value="new">Nuevo</option>
              <option value="inProcess">En proceso</option>
              <option value="finished">Terminada</option>
            </select>
            {errors.status && touched.status && <div>{errors.status}</div>}
          </div>
          <div>
            <select name="priority" onChange={handleChange} onBlur={handleBlur} className={errors.priority?"error":""}>
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
            className={errors.description?"error":""}
          ></textarea>
          {errors.description && touched.description && (
            <div>{errors.description}</div>
          )}
        </div>
        <button type="submit">Crear</button>
      </form>
    </section>
  );
};

export default TaskForm;
