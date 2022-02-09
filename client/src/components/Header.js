import React from "react";
import { NavLink } from "react-router-dom";
import { useCoursesContext } from "../store/Context";

const Header = () => {
  const { user, signOut } = useCoursesContext();
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <NavLink to="/">Courses</NavLink>
        </h1>
        <nav>
          <ul className="header--signedout">
            <li>
              {user ? (
                <NavLink to="/" onClick={signOut}>
                  Sign Out
                </NavLink>
              ) : (
                <NavLink to="/signin">Sign In</NavLink>
              )}
            </li>
            <li>{!user && <NavLink to="signup">SignUp</NavLink>}</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
