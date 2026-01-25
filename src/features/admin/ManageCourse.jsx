import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ManageCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    courseName: "",
    courseDescription: "",
    duration: "",
    trainer: "",
    price: "",
  });

  // TEMP: replace with API call
  useEffect(() => {
    setCourse({
      courseName: "React Fundamentals",
      courseDescription: "Learn React from scratch",
      duration: 30,
      trainer: "Abdur Rehman",
      price: 0,
    });
  }, [id]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Course:", course);
    // axios.put(`/api/admin/courses/${id}`, course)
  };

  const handleDelete = () => {
    console.log("Delete course:", id);
    // axios.delete(`/api/admin/courses/${id}`)
    navigate("/courses");
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-3xl font-medium text-center mb-6">
          Manage Course
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 rounded-lg p-8 max-w-xl mx-auto"
        >
          <input
            name="courseName"
            value={course.courseName}
            onChange={handleChange}
            placeholder="Course Name"
            className="form-control mb-4"
            required
          />

          <textarea
            name="courseDescription"
            value={course.courseDescription}
            onChange={handleChange}
            placeholder="Course Description"
            className="form-control mb-4"
            required
          />

          <input
            name="duration"
            value={course.duration}
            onChange={handleChange}
            placeholder="Duration (Days)"
            className="form-control mb-4"
            required
          />

          <input
            name="trainer"
            value={course.trainer}
            onChange={handleChange}
            placeholder="Trainer Name"
            className="form-control mb-4"
            required
          />

          <input
            name="price"
            value={course.price}
            onChange={handleChange}
            placeholder="Price"
            className="form-control mb-4"
            required
          />

          <button className="btn btn-primary w-full">
            Update Course
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="btn btn-danger w-full mt-3"
          >
            Delete Course
          </button>
        </form>
      </div>
    </section>
  );
};

export default ManageCourse;
