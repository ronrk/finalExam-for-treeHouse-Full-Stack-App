import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useCoursesContext } from "../store/Context";
import Forbidden from "./Forbidden";

const PrivateRoute = ({ children, ...rest }) => {
  const { authenticated } = useCoursesContext();
  return (
    <Route
      {...rest}
      render={() => {
        return authenticated ? children : <Forbidden />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
