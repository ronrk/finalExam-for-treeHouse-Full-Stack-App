import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams, useHistory } from "react-router-dom";
import { useCoursesContext } from "../store/Context";

const CourseDetail = () => {
  //importing globalState from Context
  const {
    currentCourse,
    fetchSingleCourse,
    singleLoading: loading,
    authenticated,
    user,
    deleteCourse,
  } = useCoursesContext();

  //assigning id & history from 'react router dom'
  const { id } = useParams();
  const history = useHistory();

  //assignin localState
  const [onDelete, setOnDelete] = useState(false);
  const [validation, setValidation] = useState("");
  const [success, setSuccess] = useState(false);

  //setOnDelete to false & fetch singleCourese from api when id change
  useEffect(() => {
    setOnDelete(false);
    fetchSingleCourse("http://localhost:5000/api/courses/" + id);
  }, [id]);

  //set onDelete state when user first click on delete button
  const onDeleteCourse = () => {
    setOnDelete(true);
  };

  //if page is loading
  if (loading) {
    return (
      <main>
        <h2>Loading</h2>
      </main>
    );
  }

  //when page done loading
  if (!loading) {
    const {
      title,
      description,
      materialsNeeded,
      estimatedTime,
      Student: student,
    } = currentCourse;

    return (
      <main>
        <div className="actions--bar">
          <div className="wrap">
            {authenticated && student.id === user.id && (
              <Link to={`/courses/${id}/update`} className="button">
                Update Course
              </Link>
            )}

            {authenticated && student.id === user.id && (
              <button
                onClick={async () => {
                  if (!onDelete) {
                    onDeleteCourse();
                    return;
                  }
                  if (validation.length > 1) {
                    const isSuccess = await deleteCourse(validation, id);
                    if (isSuccess) {
                      history.push("/");
                    }
                  }
                }}
                className="button"
              >
                {onDelete ? "DELETE" : "Delete Course"}
              </button>
            )}
            <Link to="/" className="button">
              Return to list
            </Link>
          </div>
          {onDelete && (
            <div>
              <h3>are you sure you want to delete '{title}' course?</h3>
              <label htmlFor="password">Enter Password : </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) => setValidation(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{title}</h4>
                <p>
                  By {student.firstName} {student.lastName}
                </p>
                <ReactMarkdown children={description} />
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{estimatedTime && estimatedTime}</p>

                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  {materialsNeeded && (
                    <ReactMarkdown children={materialsNeeded} />
                  )}
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
};

export default CourseDetail;
