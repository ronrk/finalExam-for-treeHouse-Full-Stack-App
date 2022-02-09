import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useCoursesContext } from "../store/Context";

const Courses = () => {
  const { courses } = useCoursesContext();
  let coursesList = [];

  if (courses) {
    coursesList = courses;
    coursesList = coursesList.map((course) => {
      return (
        <Link
          key={course.id}
          to={`/courses/${course.id}`}
          className="course--module course--link"
        >
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{course.title}</h3>
        </Link>
      );
    });
  }

  return (
    <main>
      <div className="wrap main--grid">
        {coursesList}
        <Link
          to="/course/create"
          className="course--module course--add--module"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
};

export default Courses;
