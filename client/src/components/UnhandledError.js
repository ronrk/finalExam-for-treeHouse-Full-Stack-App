import React from "react";
import { Link } from "react-router-dom";

const UnhandledError = () => {
  return (
    <main>
      <section className="wrap">
        <h1>Falid to Fetch</h1>
        <h3>sorry, Something went wrong with the server</h3>
        <p>try again later</p>
      </section>
    </main>
  );
};

export default UnhandledError;
