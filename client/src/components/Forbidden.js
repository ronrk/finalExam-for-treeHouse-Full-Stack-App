import React from "react";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <main>
      <section className="wrap">
        <h1>Access Denied</h1>
        <h3>sorry, You cannot access this page</h3>
        <Link to="/" className="button">
          Back to courses
        </Link>
      </section>
    </main>
  );
};

export default Forbidden;
