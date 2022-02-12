import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useCoursesContext } from "../store/Context";

const Header = () => {
  const { user, signOut, authenticated } = useCoursesContext();
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <NavLink to="/">Courses</NavLink>
        </h1>
        <nav>
          {authenticated ? (
            <ul className="header--signedin">
              <li>
                Welcome, {user.firstName} {user.lastName}
              </li>
              <li></li>
              <NavLink to="/signout">Sign Out</NavLink>
            </ul>
          ) : (
            <ul className="header--signedout">
              <NavLink to="/signin">Sign In</NavLink>
              <li></li>
              <NavLink to="signup">SignUp</NavLink>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
