import React, { useContext, useEffect, useState } from "react";

const getLocalStorage = () => {
  let user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const CoursesContext = React.createContext();

export const CoursesProvider = ({ children }) => {
  const [validateError, setValidateError] = useState(null);
  const [user, setUser] = useState();
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [singleLoading, setSingleLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // get locale storage to check if 'user' exist on localestorage,
  // case true:setUser to localeUser & setAuthenticated to true

  useEffect(() => {
    const localeUser = getLocalStorage();
    if (localeUser) {
      setUser(localeUser);
      setAuthenticated(true);
    }
  }, []);

  //function to fetch all courses from api
  const fetchFromRestApi = async () => {
    setError(false);

    const response = await handleFetch("http://localhost:5000/api/courses");
    if (response.status === 200) {
      const data = await response.json();
      setCourses(data.courses);
      setLoading(false);
    }
  };

  //function to fetch single course from api
  const fetchSingleCourse = async (url) => {
    setError(false);
    setSingleLoading(true);
    try {
      const response = await handleFetch(url);
      const data = await response.json();
      setCurrentCourse(data.course);
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setSingleLoading(false);
    setLoading(false);
  };

  //function to update a current course on api
  const updateCourse = async (updatedCourse) => {
    const { emailAddress, password } = user;

    const response = await handleFetch(
      `http://localhost:5000/api/courses/${updatedCourse.id}`,
      "PUT",
      { ...updatedCourse, user },
      true,
      { emailAddress, password }
    );
    if (response.status === 204) {
      setLoading(false);
      return true;
    }
    if (response.status === 400) {
      const error = await response.json();
      setValidateError(error.errors);
      return false;
    }
  };

  //function to create new course on api
  const createCourse = async (newCourse) => {
    const { emailAddress, password } = user;
    const response = await handleFetch(
      "http://localhost:5000/api/courses",
      "POST",
      newCourse,
      true,
      { emailAddress, password }
    );
    if (response.status === 201) {
      setLoading(false);
      return true;
    }
    if (response.status === 400) {
      setLoading(false);
      const error = await response.json();
      setValidateError(error.errors);
      return false;
    }
  };

  //function to delete exist course
  const deleteCourse = async (password, courseId) => {
    const { emailAddress } = user;
    const response = await handleFetch(
      `http://localhost:5000/api/courses/${courseId}`,
      "DELETE",
      null,
      true,
      { emailAddress, password }
    );
    if (response.status === 204) {
      setLoading(false);
      return true;
    }
    if (response.status === 401) {
      setLoading(false);
      return false;
    }
  };

  //function when the form submit is cancel,
  const cancelForm = () => {
    setValidateError(null);
  };

  //global handle fetch function return a function fecth(url,options)
  const handleFetch = (
    url,
    method = "GET",
    body = null,
    requiresAute = false,
    credentials = null
  ) => {
    setValidateError(null);
    setLoading(true);
    const options = {
      method,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    };
    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAute) {
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options).catch((err) => setError(true));
  };

  //function to sign up a new user on api
  const signUp = async (user) => {
    try {
      const response = await handleFetch(
        "http://localhost:5000/api/users",
        "POST",
        user,
        false,
        null
      );

      if (response.status === 201) {
        console.log(response, "signup");
        signIn(user.emailAddress, user.password);
      }
      if (response.status === 400) {
        const errors = await response.json();
        console.log(errors);
        setValidateError(errors.errors);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  //function to sign in to current user in api
  const signIn = async (emailAddress, password) => {
    const response = await handleFetch(
      "http://localhost:5000/api/users",
      "GET",
      null,
      true,
      {
        emailAddress,
        password,
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      setUser({ ...data, password });
      setAuthenticated(true);
      localStorage.setItem("user", JSON.stringify({ ...data, password }));
    } else if (response.status === 401) {
      const error = await response.json();
      console.log(error);
      setValidateError(error);
      setUser(null);
      setAuthenticated(false);
    }
    setLoading(false);
  };

  //function to sign ou from current user in api
  const signOut = () => {
    console.log("signout");
    setUser(null);
    setAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <CoursesContext.Provider
      value={{
        fetchFromRestApi,
        deleteCourse,
        updateCourse,
        signUp,
        courses,
        fetchSingleCourse,
        signIn,
        currentCourse,
        loading,
        error,
        user,
        singleLoading,
        signOut,
        authenticated,
        createCourse,
        validateError,
        cancelForm,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

//custom hook to use on Consumers Components
export const useCoursesContext = () => {
  return useContext(CoursesContext);
};
