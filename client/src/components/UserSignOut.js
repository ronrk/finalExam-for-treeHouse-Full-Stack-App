import React, { useEffect, useState } from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import { useCoursesContext } from "../store/Context";

const UserSignOut = () => {
  const {
    signOut,
    user: { emailAddress },
  } = useCoursesContext();
  const [isSignOut, setIsSignOut] = useState(false);

  const toSignOut = () => {
    setIsSignOut(true);
    signOut();
  };

  return (
    <div className="wrap">
      <h2>are you sure to sign out from the account : {emailAddress} ?</h2>
      <NavLink to="/" className="button" onClick={toSignOut}>
        SignOut
      </NavLink>
      <Link to="/" className="button">
        Back to courses
      </Link>
    </div>
  );
};

export default UserSignOut;
