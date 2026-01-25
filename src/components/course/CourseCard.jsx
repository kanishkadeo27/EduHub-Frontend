import { Link, useNavigate } from "react-router-dom";

const CourseCard = ({ course, user }) => {
  const navigate = useNavigate();

  const {
    id,
    courseName,
    courseDescription,
    trainer,
    rating,
    price,
    duration,
    imageId,
    isEnrolled,
  } = course;

  return (
    <div className="single-course">
      {/* ================= COURSE HEAD ================= */}
      <div className="course-head overlay">
        <img
          src={`/image/courses/course${imageId}.jpg`}
          alt={courseName}
        />

        {/* -------- Guest User -------- */}
        {!user && (
          <Link
            to="/signup"
            className="btn white primary"
            style={{ borderRadius: "4rem" }}
          >
            Register Now
          </Link>
        )}

        {/* -------- Logged-in User -------- */}
        {user && (
          <>
            {/* ADMIN */}
            {user.role === "admin" && (
              <button
                onClick={() =>
                  navigate(`/admin/courses/manage/${id}`)
                }
                className="btn white primary"
                style={{ borderRadius: "4rem" }}
              >
                Manage Course
              </button>
            )}

            {/* NORMAL USER */}
            {user.role === "user" && (
              <>
                {!isEnrolled ? (
                  <button
                    onClick={() =>
                      navigate(`/courses/enroll/${id}`)
                    }
                    className="btn before-enrolled white primary"
                    style={{ borderRadius: "4rem" }}
                  >
                    Enroll Now
                  </button>
                ) : (
                  <span
                    className="btn enrolled-btn white primary"
                    style={{ borderRadius: "4rem" }}
                  >
                    Already Enrolled
                  </span>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* ================= COURSE BODY ================= */}
      <div className="course-body">
        <div className="name-price">
          <div className="teacher-info">
            <img
              src={`/image/teachers/author${imageId}.jpg`}
              alt={trainer}
            />
            <h4 className="title">{trainer}</h4>
          </div>

          {price === 0 ? (
            <span
              className="price"
              style={{ backgroundColor: "#6674CC" }}
            >
              FREE
            </span>
          ) : (
            <span
              className="price"
              style={{ backgroundColor: "#6674CC" }}
            >
              ₹{price}/-
            </span>
          )}
        </div>

        <h4
          className="c-title cursor-pointer"
          onClick={() => navigate(`/courses/${id}`)}
        >
          {courseName}
        </h4>

        <p>{courseDescription}</p>
      </div>

      {/* ================= COURSE META ================= */}
      <div className="course-meta">
        {/* Ratings */}
        <ul className="rattings">
          {[1, 2, 3, 4, 5].map((star) => (
            <li key={star}>
              <i
                className={`fa ${
                  rating >= star ? "fa-star" : "fa-star-o"
                }`}
                style={{ color: "#6674CC" }}
              />
            </li>
          ))}
          <li className="point" style={{ color: "#6674CC" }}>
            {rating}
          </li>
        </ul>

        {/* Info */}
        <div className="course-info">
          <span>
            <i className="fa fa-users" /> 2.4k Enrolled
          </span>
          <span>
            <i className="fa fa-calendar-o" /> {duration} Days
          </span>
          <span>
            <i className="fa fa-clock-o" /> 09:30 - 12:00
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
