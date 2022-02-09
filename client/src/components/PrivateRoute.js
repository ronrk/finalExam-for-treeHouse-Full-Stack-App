import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useCoursesContext } from "../store/Context";

const PrivateRoute = ({ children, ...rest }) => {
  const { authenticated } = useCoursesContext();
  return (
    <Route
      {...rest}
      render={() => {
        return authenticated ? children : <Redirect to="/signin" />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
