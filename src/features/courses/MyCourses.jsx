const MyCourses = () => {
  // later from API
  const enrolledCourses = [
    {
      id: 1,
      courseName: "React Fundamentals",
      progress: 40,
    },
  ];

  return (
    <section className="container mx-auto pt-24">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>

      {enrolledCourses.length === 0 ? (
        <p>You are not enrolled in any courses yet.</p>
      ) : (
        enrolledCourses.map((course) => (
          <div
            key={course.id}
            className="p-4 border rounded mb-4 flex justify-between"
          >
            <div>
              <h2 className="font-semibold">{course.courseName}</h2>
              <p>Progress: {course.progress}%</p>
            </div>

            <button className="bg-indigo-500 text-white px-4 py-2 rounded">
              Continue
            </button>
          </div>
        ))
      )}
    </section>
  );
};

export default MyCourses;
