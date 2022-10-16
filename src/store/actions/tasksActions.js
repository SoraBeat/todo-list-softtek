import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";

import { TASKS_REQUEST, TASKS_SUCCESS, TASKS_FAILURE } from "../types";

export const tasksRequest = () => ({
  type: TASKS_REQUEST,
});
export const tasksSuccess = (data) => ({
  type: TASKS_SUCCESS,
  payload: data,
});
export const tasksFailure = (err) => ({
  type: TASKS_FAILURE,
  payload: err,
});

export const getTasks = (teamID, userName, tasksFromWho) => (dispatch) => {
  dispatch(tasksRequest());
  axios
    .get(
      `${process.env.REACT_APP_API_TASKS}?teamID=${teamID}${
        tasksFromWho === "ME" ? `&creator=${userName}` : ""
      }.json`
    )
    .then((data) => {
      dispatch(tasksSuccess(data.data));
    })
    .catch((err) => {
      dispatch(tasksFailure(err));
    });
};

export const deleteTasks =
  (id, teamID, userName, tasksFromWho) => (dispatch) => {
    dispatch(tasksRequest());
    axios
      .delete(`${process.env.REACT_APP_API_TASKS}/${id}.json`)
      .then(() => {
        dispatch(getTasks(teamID, userName, tasksFromWho));
      })
      .catch((err) => {
        dispatch(tasksFailure(err));
      });
  };

export const editTaskStatus =
  (data, teamID, userName, tasksFromWho) => (dispatch) => {
    const statusArray = ["new", "inProcess", "done"];
    const newStatusIndex =
      statusArray.indexOf(data.status) > 1
        ? 0
        : statusArray.indexOf(data.status) + 1;
    dispatch(tasksRequest());
    axios
      .patch(`${process.env.REACT_APP_API_TASKS}/${data.id}.json`, { ...data,status:statusArray[newStatusIndex] })
      .then(() => {
        dispatch(getTasks(teamID, userName, tasksFromWho));
      })
      .catch((err) => {
        dispatch(tasksFailure(err));
      });
  };
