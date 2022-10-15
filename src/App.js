import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";

import "./App.css";

import AnimatedDiv from "./components/common/AnimatedDiv/AnimatedDiv";
import Login from "./components/views/Login/Login";
import Register from "./components/views/Register/Register";

import Tasks from "./components/views/Tasks/Tasks";
const Error404 =  lazy(()=>import("./components/views/Error404/Error404"))




const RequireAuth = ({ children }) => {
  if (!localStorage.getItem("logged"))
    return <Navigate to="/login" replace={true} />;
  return children;
};

function App() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AnimatedDiv>
              <Tasks />
            </AnimatedDiv>
          }
        />
        <Route
          path="/login"
          element={
            <AnimatedDiv>
              <Login />
            </AnimatedDiv>
          }
        />
        <Route
          path="/register"
          element={
            <AnimatedDiv>
              <Register />
            </AnimatedDiv>
          }
        />
        <Route
          path="/tasks"
          element={
            <AnimatedDiv>
              <RequireAuth>
                <Tasks />
              </RequireAuth>
            </AnimatedDiv>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<>...</>}>
              <AnimatedDiv>
                <Error404 />
              </AnimatedDiv>
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
