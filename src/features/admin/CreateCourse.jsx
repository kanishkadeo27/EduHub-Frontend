import { useState } from "react";

const CreateCourse = () => {
  const [course, setCourse] = useState({
    courseName: "",
    courseDescription: "",
    duration: "",
    trainer: "",
    price: "",
  });

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // later: axios.post("/api/courses", course)
    console.log("Course Submitted:", course);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <h1 className="text-3xl font-medium title-font text-gray-900 mb-4 w-full text-center">
          Add New Course
        </h1>

        <div
          className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full"
          style={{
            margin: "1rem auto",
            backgroundColor: "rgb(243 244 246)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Course Details
            </h2>

            {/* Course Name */}
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">
                Course Name
              </label>
              <input
                type="text"
                name="courseName"
                value={course.courseName}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 px-3 py-2"
                required
              />
            </div>

            {/* Description */}
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">
                Course Description
              </label>
              <textarea
                name="courseDescription"
                value={course.courseDescription}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 px-3 py-2"
                minLength={50}
                maxLength={80}
                required
              />
            </div>

            {/* Duration */}
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">
                Duration (Days)
              </label>
              <input
                type="number"
                name="duration"
                value={course.duration}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 px-3 py-2"
                required
              />
            </div>

            {/* Trainer */}
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">
                Trainer Name
              </label>
              <input
                type="text"
                name="trainer"
                value={course.trainer}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 px-3 py-2"
                required
              />
            </div>

            {/* Price */}
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={course.price}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 px-3 py-2"
                required
              />
            </div>

            {/* Submit */}
            <div className="p-2 w-full">
              <button
                type="submit"
                className="flex mx-auto text-white bg-indigo-500 px-8 py-2 rounded-full hover:bg-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateCourse;
