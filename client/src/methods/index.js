export const addCourse = async (course) => {
  try {
    fetch("/courses", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: course,
      }),
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchCourseToDisplay = async () => {
  try {
    const data = await fetch("/all-courses");
    if (data) {
      return data.json();
    }
  } catch (err) {
    console.error(err);
  }
};

export const deleteCourse = async (id) => {
  try {
    const data = await fetch(`/courses/${id}`, { method: "DELETE" });
    if (data) {
      return data.json();
    }
  } catch (err) {
    console.error(err);
  }
};

export const editCourse = async (id, editedCourse) => {
  try {
    fetch(`/courses/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editedCourse,
      }),
    });
  } catch (err) {
    console.error(err);
  }
};
