import React, { useState } from "react";
import { useCoursesContext } from "../store/Context";

const CreateCourse = () => {
  const { createCourse, error } = useCoursesContext();
  const [newCourse, setNewCourse] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const input = { [name]: value };

    setNewCourse({ ...newCourse, ...input });
  };
  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        {error && (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              <li>Please provide a value for "Title"</li>
              <li>Please provide a value for "Description"</li>
            </ul>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            createCourse(newCourse);
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

              <p>By Joe Smith</p>

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
          <button className="button button-secondary">Cancel</button>
        </form>
      </div>
    </main>
  );
};

export default CreateCourse;
