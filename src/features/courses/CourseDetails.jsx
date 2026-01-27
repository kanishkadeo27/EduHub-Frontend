import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const CourseDetails = () => {
  const { id } = useParams(); // /courses/:id
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  // TEMP mock (replace with API later)
  useEffect(() => {
    // simulate API
    setCourse({
      id,
      courseName: "Software Training",
      trainer: "Mohd Khushhal",
      rating: 4.5,
      duration: 90,
      price: 0, // Free for now
      imageId: 1,
      description:
        "Software training is a crucial aspect of professional development...",
    });
  }, [id]);

  if (!course) return <p className="text-center mt-20">Loading...</p>;

  return (
    <section className="banner pt-2 pb-2">
      <div className="container">
        <div className="row">

          {/* LEFT – COURSE CONTENT */}
          <div className="col-lg-8">
            <div className="course_container">

              <div className="course_title mt-4">
                {course.courseName}
              </div>
              <div className="mt-3">
                <Link
                  to={`/courses/${course.id}/syllabus`}
                  className="btn bg-indigo-500 text-white px-4 py-2 rounded"
                >
                  View Syllabus
                </Link>
              </div>


              {/* INFO */}
              <div className="course_info d-flex flex-wrap align-items-center mt-3">
                <div className="course_info_item">
                  <span className="course_info_title">Teacher: </span>
                  <span className="course_info_text">{course.trainer}</span>
                </div>

                <div className="course_info_item ml-4" style={{ color: "#6674CC" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`fa ${course.rating >= star
                          ? "fa-star"
                          : "fa-star-o"
                        }`}
                    />
                  ))}
                  <span className="ml-2">({course.rating})</span>
                </div>
              </div>

              {/* TABS */}
              <div className="course_tabs_container mt-5">
                <div className="tab_panels">

                  {/* DESCRIPTION */}
                  <div className="tab_panel active">
                    <div className="tab_panel_title">
                      Software Training
                    </div>
                    <div className="tab_panel_text">
                      <p>{course.description}</p>
                    </div>
                  </div>

                  {/* CURRICULUM */}
                  <div className="tab_panel mt-5">
                    <div className="tab_panel_title">Curriculum</div>
                    <p>
                      Learn Java, Spring Boot, Microservices, AWS, Kafka and more
                      with real-world examples and hands-on projects.
                    </p>
                  </div>

                  {/* REVIEWS */}
                  <div className="tab_panel mt-5">
                    <div className="tab_panel_title">Reviews</div>
                    <p>Student reviews will be shown here.</p>
                  </div>

                  {/* STUDY MATERIAL */}
                  <div className="tab_panel mt-5">
                    <div className="tab_panel_title">Study Material</div>
                    
                    {/* PDF Documents */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3">PDF Documents</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div 
                          onClick={() => {
                            console.log('Navigating to PDF 1');
                            navigate(`/courses/${course.id}/pdf/1`);
                          }}
                          className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors border hover:border-indigo-300"
                        >
                          <div className="flex items-center space-x-3">
                            <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                            <div>
                              <h5 className="font-medium text-gray-900">Spring Boot Tutorial</h5>
                              <p className="text-sm text-gray-600">Complete guide to Spring Boot framework</p>
                              <span className="text-xs text-indigo-600 font-medium">Click to view →</span>
                            </div>
                          </div>
                        </div>
                        
                        <div 
                          onClick={() => {
                            console.log('Navigating to PDF 2');
                            navigate(`/courses/${course.id}/pdf/2`);
                          }}
                          className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors border hover:border-indigo-300"
                        >
                          <div className="flex items-center space-x-3">
                            <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                            <div>
                              <h5 className="font-medium text-gray-900">React Basics Guide</h5>
                              <p className="text-sm text-gray-600">Introduction to React concepts</p>
                              <span className="text-xs text-indigo-600 font-medium">Click to view →</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Video Tutorials */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Video Tutorials</h4>
                      <div className="mt-4" style={{ height: "400px" }}>
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/35EQXmHKZYs"
                          title="YouTube tutorial"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* RIGHT – SIDEBAR */}
          <div className="col-lg-4">
            <div className="sidebar">

              <div className="sidebar_section">
                <div className="sidebar_section_title">
                  Course Feature
                </div>

                <span className="price course_price">
                  {course.price === 0 ? "FREE" : `₹${course.price}/-`}
                </span>

                <div className="feature_list mt-3">
                  <div className="feature d-flex justify-content-between">
                    <span>Duration</span>
                    <span>{course.duration} Days</span>
                  </div>
                  <div className="feature d-flex justify-content-between">
                    <span>Mode</span>
                    <span>Online</span>
                  </div>
                  <div className="feature d-flex justify-content-between">
                    <span>Students</span>
                    <span>35</span>
                  </div>
                </div>
              </div>

              {/* TRAINER */}
              <div className="sidebar_section mt-4">
                <div className="sidebar_section_title">Trainer</div>

                <div className="sidebar_teacher">
                  <img
                    src={`/image/teachers/author${course.imageId}.jpg`}
                    alt={course.trainer}
                    style={{ width: "100%" }}
                  />
                  <h4 className="mt-3">{course.trainer}</h4>
                  <p>
                    Senior Software Engineer with 10+ years experience in
                    enterprise applications.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
