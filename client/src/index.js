import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CoursesProvider } from "./store/Context";

ReactDOM.render(
  <React.StrictMode>
    <CoursesProvider>
      <App />
    </CoursesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
