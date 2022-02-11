import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useCoursesContext } from "../store/Context";

const CreateCourse = () => {
  const history = useHistory();
  const { createCourse, user, validateError } = useCoursesContext();
  const [newCourse, setNewCourse] = useState({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const input = { [name]: value };

    setNewCourse({ ...newCourse, ...input });
  };
  if (success) {
    return <Redirect to="/" />;
  }
  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
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
            const isSuccess = await createCourse(newCourse);

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
                onChange={handleInputChange}
              />

              <p>
                By {user.firstName} {user.lastName}
              </p>

              <label htmlFor="description">Course Description</label>
              <textarea
                id="description"
                name="description"
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                onChange={handleInputChange}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Create Course
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
};

export default CreateCourse;
