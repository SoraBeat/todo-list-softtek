import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
} from "@mui/material";
import debounce from "lodash.debounce";
import { useSelector, useDispatch } from "react-redux";

import "./Tasks.css";

import Header from "../../common/Header/Header";
import useResize from "../../../hooks/useResize";
import Card from "../../common/Card/Card";
import TaskForm from "../../common/TaskForm/TaskForm";
import { getTasks, deleteTasks,editTaskStatus } from "../../../store/actions/tasksActions";

const Tasks = () => {
  const [renderTasks, setRenderTasks] = useState([]);
  const [tasksFromWho, setTasksFromWho] = useState("ALL");
  const [searchByName, setSearchByName] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { teamID, userName } = useParams();
  const { isPhone } = useResize();
  const dispatch = useDispatch();

  const { loading, error, tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  useEffect(() => {
    const getData = debounce(() => {
      dispatch(getTasks(teamID, userName, tasksFromWho));
    }, 500);
    getData();
  }, [refresh, tasksFromWho]);

  useEffect(() => {
    if (tasks?.length) {
      setRenderTasks(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    if (searchByName) {
      setRenderTasks(
        tasks.filter((data) => data.title.startsWith(searchByName))
      );
    } else {
      setRenderTasks(tasks);
    }
  }, [searchByName]);
  const handleChangeImportance = (evt) => {
    if (evt.currentTarget.value === "ALL") {
      setRenderTasks(tasks);
    } else {
      setRenderTasks(
        tasks.filter((task) => task.priority === evt.currentTarget.value)
      );
    }
  };
  const handleDelete = (id) => {
    dispatch(deleteTasks(id, teamID, userName, tasksFromWho));
  };
  const handleEditCardStatus = (data) => {
    dispatch(editTaskStatus(data,teamID, userName, tasksFromWho));
  };

  if (error) return <div>Hubo un error</div>;
  return (
    <>
      <Header />
      <main id="tasks">
        <TaskForm setRefresh={setRefresh} refresh={refresh} />
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis Tareas</h2>
          </div>
          <div className="filters">
            <input
              type="text"
              placeholder="Buscar por titulo"
              value={searchByName}
              onChange={(e) => setSearchByName(e.currentTarget.value)}
            />
            <FormControl>
              <RadioGroup
                row
                onChange={(evt) => setTasksFromWho(evt.target.value)}
              >
                <FormControlLabel
                  value="ALL"
                  control={<Radio />}
                  label="Todas"
                />
                <FormControlLabel
                  value="ME"
                  control={<Radio />}
                  label="Mis Tareas"
                />
              </RadioGroup>
            </FormControl>
            <select name="importance" onChange={handleChangeImportance}>
              <option value="ALL">Todas</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
          {!isPhone && (
            <div className="list_group">
              <div className="list">
                <h4>Nuevas</h4>
                {renderTasks.length ? (
                  renderTasks?.map((task) => {
                    if (task.status === "new")
                      return (
                        <Card
                          key={task.id}
                          data={task}
                          deleteCard={handleDelete}
                          editCardStatus={handleEditCardStatus}
                        />
                      );
                  })
                ) : (
                  <Skeleton variant="rectangular" height={118} />
                )}
              </div>
              <div className="list">
                <h4>En proceso</h4>
                {renderTasks.length ? (
                  renderTasks?.map((task) => {
                    if (task.status === "inProcess")
                      return (
                        <Card
                          key={task.id}
                          data={task}
                          deleteCard={handleDelete}
                          editCardStatus={handleEditCardStatus}
                        />
                      );
                  })
                ) : (
                  <Skeleton variant="rectangular" height={118} />
                )}
              </div>
              <div className="list">
                <h4>Finalizadas</h4>
                {renderTasks.length ? (
                  renderTasks?.map((task) => {
                    if (task.status === "done")
                      return (
                        <Card
                          key={task.id}
                          data={task}
                          deleteCard={handleDelete}
                          editCardStatus={handleEditCardStatus}
                        />
                      );
                  })
                ) : (
                  <Skeleton variant="rectangular" height={118} />
                )}
              </div>
            </div>
          )}
          {isPhone && (
            <div className="list phone">
              {renderTasks.length ? (
                renderTasks?.map((task) => {
                  return (
                    <Card
                      key={task.id}
                      data={task}
                      deleteCard={handleDelete}
                      editCardStatus={handleEditCardStatus}
                    />
                  );
                })
              ) : (
                <Skeleton variant="rectangular" height={118} />
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Tasks;
