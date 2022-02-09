import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { useCoursesContext } from "../store/Context";

const CourseDetail = () => {
  const {
    currentCourse,
    fetchSingleCourse,
    singleLoading: loading,
    authenticated,
    user,
  } = useCoursesContext();
  const { id } = useParams();

  useEffect(() => {
    fetchSingleCourse("http://localhost:5000/api/courses/" + id);
  }, [id]);

  if (loading) {
    return (
      <main>
        <h2>Loading</h2>
      </main>
    );
  }

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
              <Link to="/" className="button">
                Delete Course
              </Link>
            )}
            <Link to="/" className="button">
              Return to list
            </Link>
          </div>
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
                  {materialsNeeded &&
                    materialsNeeded
                      .trim()
                      .split("*")
                      .map((item, i) => {
                        if (item.trim() === "") {
                          return;
                        }
                        return <li key={i}>{item}</li>;
                      })}
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }

  /*  
              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                {currentCourse.materialsNeeded
                  .trim()
                  .split("*")
                  .map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  ); */
};

export default CourseDetail;
