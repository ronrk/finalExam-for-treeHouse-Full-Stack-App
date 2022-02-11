import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main>
      <section className="wrap">
        <h1>404</h1>
        <h3>sorry, the page you tried cannot be found</h3>
        <Link to="/" className="button">
          Back to courses
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
