import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

import { useCoursesContext } from "../store/Context";

const UserSignIn = () => {
  const history = useHistory();
  const { signIn, authenticated, validateError } = useCoursesContext();

  const [user, setUser] = useState({ emailAddress: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const input = { [name]: value };
    setUser({ ...user, ...input });
  };

  if (authenticated) {
    console.log(history);
    return <Redirect to="/" />;
  }

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        {validateError && (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              <li>wrong email address / password</li>
            </ul>
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn(user.emailAddress, user.password);
          }}
        >
          <label htmlFor="emailAddress">Email Adress : </label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            onChange={handleInputChange}
            value={user.emailAddress}
          />
          <label htmlFor="password">Password : </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleInputChange}
            value={user.password}
          />
          <button className="button" type="submit">
            Sign In
          </button>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => history.push("/")}
          >
            Cancel
          </button>
        </form>
        <p>
          Don't have a user account? Click here to{" "}
          <Link to="/signup">sign up</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignIn;
