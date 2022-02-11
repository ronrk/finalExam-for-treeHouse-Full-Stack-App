import React, { useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";

import { useCoursesContext } from "../store/Context";

const UserSignUp = () => {
  const history = useHistory();
  const { signUp, validateError, authenticated } = useCoursesContext();
  const [user, setUser] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const input = { [name]: value };

    setUser({ ...user, ...input });
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
        {validateError && (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {validateError.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            signUp(user);
          }}
        >
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={handleInputChange}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={handleInputChange}
          />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            onChange={handleInputChange}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleInputChange}
          />
          <button className="button" type="submit">
            Sign Up
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
          Already have a user account? Click here to{" "}
          <Link to="/signin">sign in</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignUp;

{
  /* <main>
            <div class="form--centered">
                <h2>Sign Up</h2>
                
                <form>
                    <label for="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" value="">
                    <label for="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" value="">
                    <label for="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value="">
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" value="">
                    <button class="button" type="submit">Sign Up</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                </form>
                <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
            </div>
        </main> */
}
