import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import {
  CourseDetail,
  Courses,
  CreateCourse,
  Header,
  UpdateCourse,
  UserSignUp,
  PrivateRoute,
  UserSignIn,
} from "./components";

import "./App.css";
import axios from "axios";

const App = () => {
  return (
    <Router>
      <Header />

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
    </Router>
  );
};

export default App;
