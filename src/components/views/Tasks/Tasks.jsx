import "./Tasks.css";

import {cardsData} from "./data"

import Header from "../../common/Header/Header";
import useResize from "../../../hooks/useResize";
import Card from "../../common/Card/Card"
import TaskForm from "../../common/TaskForm/TaskForm";

const Tasks = () => {
  const { isPhone } = useResize();

  const limitString = (str) => {
    if (str.length > 370)
      return { string: str.slice(0, 367).concat("..."), addButton: true };
    return { string: str, addButton: false };
  };

  const renderAllCards=()=>{ 
    return cardsData.map(data=><Card key={data.id} data={data}/>)
  }
  return (
    <>
      <Header />
      <main id="tasks">
        <TaskForm/>
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis Tareas</h2>
          </div>
          {!isPhone && (
            <div className="list_group">
              <div className="list">
                <h4>Nuevas</h4>
                <div className="card">
                  <div className="close">x</div>
                  <h3>Tarea 1</h3>
                  <h6>24/1/2022 16:40hs</h6>
                  <h5>Lautaro Roa</h5>
                  <button type="button">Nueva</button>
                  <button type="button">Alta</button>
                  <p>{limitString("Descripcion ajsdkashdjkla").string}</p>
                </div>
              </div>
              <div className="list">
                <h4>En proceso</h4>
                <div className="card">
                  <div className="close">x</div>
                  <h3>Tarea 1</h3>
                  <h6>24/1/2022 16:40hs</h6>
                  <h5>Lautaro Roa</h5>
                  <button type="button">Nueva</button>
                  <button type="button">Alta</button>
                  <p>{limitString("Descripcion ajsdkashdjkla").string}</p>
                </div>
              </div>
              <div className="list">
                <h4>Finalizadas</h4>
                <div className="card">
                  <div className="close">x</div>
                  <h3>Tarea 1</h3>
                  <h6>24/1/2022 16:40hs</h6>
                  <h5>Lautaro Roa</h5>
                  <button type="button">Nueva</button>
                  <button type="button">Alta</button>
                  <p>{limitString("Descripcion ajsdkashdjkla").string}</p>
                </div>
              </div>
            </div>
          )}
          {isPhone && (
            <div className="list phone">
              {renderAllCards()}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Tasks;
