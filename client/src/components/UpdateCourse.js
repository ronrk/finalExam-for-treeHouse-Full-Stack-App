import React, { useEffect, useState } from "react";
import { useCoursesContext } from "../store/Context";

const UpdateCourse = () => {
  const { currentCourse, user, updateCourse } = useCoursesContext();

  const [updatedCourse, setUpdatedCourse] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const input = { [name]: value };
    setUpdatedCourse({ ...updatedCourse, ...input });
  };

  useEffect(() => {
    if (currentCourse) {
      setUpdatedCourse(currentCourse);
    }
  }, []);

  if (currentCourse) {
    const { title, description, estimatedTime, materialsNeeded, Student } =
      updatedCourse;
    return (
      <main>
        <div className="wrap">
          <h2>Update Course</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateCourse(updatedCourse);
            }}
          >
            <div className="main--flex">
              <div>
                <label htmlFor="title">Course Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={handleInputChange}
                />

                <p>
                  By {user.firstName} {user.lastName}
                </p>

                <label htmlFor="description">Course Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div>
                <label htmlfor="estimatedTime">Estimated Time</label>
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  value={estimatedTime}
                  onChange={handleInputChange}
                />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  value={materialsNeeded}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            <button className="button" type="submit">
              Update Course
            </button>
            <button className="button button-secondary">Cancel</button>
          </form>
        </div>
      </main>
    );
  }
  return <h2>cant find the course</h2>;
};

export default UpdateCourse;
