import React, { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

const CoursesContext = React.createContext();

export const CoursesProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [singleLoading, setSingleLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const fetchFromRestApi = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await handleFetch("http://localhost:5000/api/courses");
      const data = await response.json();
      console.log(data);
      setCourses(data.courses);
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
  };
  const fetchSingleCourse = async (url) => {
    setSingleLoading(true);
    setError(false);
    try {
      const response = await handleFetch(url);
      const data = await response.json();
      setCurrentCourse(data.course);
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setSingleLoading(false);
  };

  const createCourse = async (newCourse) => {
    console.log(newCourse);
    const response = await handleFetch(
      "http://localhost:5000/api/courses",
      "POST",
      { ...newCourse },
      true,
      null
    );
    console.log(response);
  };

  useEffect(() => {
    fetchFromRestApi();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleFetch = (
    url,
    method = "GET",
    body = null,
    requiresAute = false,
    credentials = null
  ) => {
    const options = {
      method,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    };
    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAute) {
      const encodedCredentials = btoa(
        `${credentials.email}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  };

  const signUp = async (user) => {
    console.log("signUp", user);
    const response = await handleFetch(
      "http://localhost:5000/api/users",
      "POST",
      user,
      false,
      null
    );
    console.log(response);
  };

  const signIn = async (email, password) => {
    console.log(email, password);

    const response = await handleFetch(
      "http://localhost:5000/api/users",
      "GET",
      null,
      true,
      {
        email,
        password,
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      setUser({ ...data, password });
      setAuthenticated(true);
    }
    if (response.status === 401) {
      const error = await response.json();
      setUser(null);
      setError(error);
      setAuthenticated(false);
    }
  };

  const signOut = () => {
    setUser(null);
    setAuthenticated(false);
  };

  return (
    <CoursesContext.Provider
      value={{
        fetchFromRestApi,
        signUp,
        courses,
        fetchSingleCourse,
        signIn,
        currentCourse,
        loading,
        error,
        user,
        singleLoading,
        handleSubmit,
        signOut,
        authenticated,
        createCourse,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export const useCoursesContext = () => {
  return useContext(CoursesContext);
};
