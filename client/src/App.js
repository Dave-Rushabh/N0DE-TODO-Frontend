import React, { useEffect, useState } from "react";
import {
  addCourse,
  fetchCourseToDisplay,
  deleteCourse,
  editCourse,
} from "./methods";

function App() {
  const [course, setCourse] = useState("");
  const [display, setDisplay] = useState([]);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [edit, setEdit] = useState("");
  const [id, setId] = useState(null);

  const handleChange = (event) => {
    setCourse(event.target.value);
  };

  const handleEditChange = (event) => {
    setEdit(event.target.value);
  };

  const handleAddCourse = () => {
    addCourse(course);
    fetchCourses();
    setCourse("");
  };

  const fetchCourses = async () => {
    const data = await fetchCourseToDisplay();
    if (data) {
      setDisplay(data);
    }
  };

  const deleteSelectedCourse = async (id) => {
    const data = await deleteCourse(id);
    if (data) {
      setDisplay(data);
    }
  };

  const handleDeleteCourse = (id) => {
    deleteSelectedCourse(id);
    fetchCourses();
  };

  const editSelectedCourse = async (id, edit) => {
    const data = await editCourse(id, edit);
    if (data) {
      setDisplay(data);
    }
  };

  const handleEditCourse = (id) => {
    editSelectedCourse(id, edit);
    setIsReadOnly(!isReadOnly);
    fetchCourses();
  };

  const toggleReadOnly = (id, fieldValue) => {
    setId(id);
    setIsReadOnly(!isReadOnly);
    setEdit(fieldValue);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <div className="add-container">
        <div>
          <label htmlFor="course">Add Course</label>
          <input
            type="text"
            name="course"
            id=""
            onChange={handleChange}
            value={course}
          />
          <button onClick={handleAddCourse}>Add this to the course</button>
        </div>
      </div>

      <div className="show-container" style={{ marginTop: "50px" }}>
        <div>Added Course Displayed Here</div>
        {display && display.length > 0 && (
          <>
            {display.map((course) => (
              <div
                key={course.id}
                style={{
                  marginTop: "25px",
                  display: "flex",
                }}
              >
                <div>
                  <input
                    type="text"
                    name="edit"
                    id={course.id}
                    readOnly={isReadOnly}
                    value={
                      !isReadOnly && course.id === id ? edit : course.course
                    }
                    onChange={handleEditChange}
                  />
                </div>
                <div>
                  <button
                    style={{ marginLeft: "30px" }}
                    onClick={() => toggleReadOnly(course.id, course.course)}
                  >
                    {!isReadOnly && course.id === id ? "Cancel" : "Edit"}
                  </button>

                  {course.id === id && !isReadOnly && (
                    <>
                      <button
                        style={{ marginLeft: "30px" }}
                        onClick={() => handleEditCourse(course.id)}
                      >
                        Save
                      </button>
                    </>
                  )}
                  <button
                    style={{ marginLeft: "30px" }}
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default App;
