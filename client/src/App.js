import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useCoursesContext } from "./store/Context";

import {
  CourseDetail,
  Courses,
  CreateCourse,
  Header,
  UpdateCourse,
  UserSignUp,
  PrivateRoute,
  UserSignIn,
  NotFound,
  UnhandledError,
} from "./components";

import "./App.css";

const App = () => {
  const { error } = useCoursesContext();

  return (
    <Router>
      <Header />
      {error ? (
        <UnhandledError />
      ) : (
        <Switch>
          <Route exact path="/">
            <Courses />
          </Route>
          <Route exact path="/signup">
            <UserSignUp />
          </Route>
          <Route exact path="/signin">
            <UserSignIn />
          </Route>
          <Route exact path="/courses/:id">
            <CourseDetail />
          </Route>
          <PrivateRoute exact path="/course/create">
            <CreateCourse />
          </PrivateRoute>
          <PrivateRoute path="/courses/:id/update">
            <UpdateCourse />
          </PrivateRoute>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      )}
    </Router>
  );
};

export default App;
