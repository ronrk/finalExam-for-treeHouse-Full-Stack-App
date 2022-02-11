import React, { useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useCoursesContext } from "../store/Context";

const UpdateCourse = () => {
  const history = useHistory();
  const { currentCourse, user, updateCourse, validateError } =
    useCoursesContext();

  const [updatedCourse, setUpdatedCourse] = useState({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const input = { [name]: value };
    setUpdatedCourse({ ...updatedCourse, ...input });
  };

  useEffect(() => {
    if (currentCourse) {
      setUpdatedCourse(currentCourse);
    }
  }, [currentCourse]);

  if (success) {
    return <Redirect to="/" />;
  }

  if (currentCourse) {
    const { title, description, estimatedTime, materialsNeeded } =
      updatedCourse;
    return (
      <main>
        <div className="wrap">
          <h2>Update Course</h2>
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
            onSubmit={async (e) => {
              e.preventDefault();
              const isSuccess = await updateCourse(updatedCourse);
              setSuccess(isSuccess);
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
            <button
              className="button button-secondary"
              onClick={() => history.push("/")}
            >
              Cancel
            </button>
          </form>
        </div>
      </main>
    );
  }
  return <h2>cant find the course</h2>;
};

export default UpdateCourse;
