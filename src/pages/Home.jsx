import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  // TEMP user (later from AuthContext)
  const user = null;
  // const user = { name: "Kanishka" };

  const [typedText, setTypedText] = useState("");
  const [typedGuest, setTypedGuest] = useState("");

  useEffect(() => {
    const text = user?.name ? `${user.name}!` : "guest!";
    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        user?.name
          ? setTypedText((prev) => prev + text[index])
          : setTypedGuest((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <section className="text-gray-600 body-font">

      {/* Welcome Text */}
      <h1 className="text-3xl sm:text-4xl font-medium text-center text-gray-900 mt-12">
        {user ? (
          <>
            Welcome, <span className="text-indigo-600">{typedText}</span>
          </>
        ) : (
          <>
            Hello, <span className="text-indigo-600">{typedGuest}</span>
          </>
        )}
      </h1>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-5 py-24 flex flex-col md:flex-row items-center">

        {/* Left Content */}
        <div className="md:w-1/2 flex flex-col md:items-start text-center md:text-left mb-16 md:mb-0">
          <h1 className="text-3xl sm:text-4xl font-medium text-gray-900 mb-4">
            Unlock Your Potential:
            <br className="hidden lg:inline-block" />
            <span className="text-indigo-600">
              Empowering Growth through Online Learning
            </span>
          </h1>

          <p className="mb-8 leading-relaxed text-base">
            Discover boundless opportunities with our online learning platform.
            Unlock your true potential and embrace continuous growth, all from
            the comfort of your home.
          </p>

          {user ? (
            <Link
              to="/search"
              className="inline-flex items-center bg-indigo-500 text-white px-6 py-2 rounded"
            >
              Search →
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center bg-indigo-500 text-white px-6 py-2 rounded"
            >
              Login →
            </Link>
          )}
        </div>

        {/* Right Image */}
        <img
          className="md:w-1/2 w-full object-cover rounded"
          src="src\assets\image\home.jpg"
          alt="Home"
        />
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-400" />

      {/* Founder Section */}
      {/* <div className="max-w-sm mx-auto mt-10 text-center">
        <img
          src="/image/teachers/Khushhal_Photo.jpg"
          alt="Founder"
          className="mx-auto rounded-full w-36 h-36 object-cover border"
        />
        <h3 className="mt-4 text-2xl font-bold">Kanishka Deo</h3>
        <p className="text-gray-500 text-lg">Founder, EduHub</p>
      </div> */}

      {/* Companies */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-24 text-center">
        <div>
          <img src="/image/amdocs-logo.svg.png" alt="Amdocs" className="mx-auto" />
          <p className="text-xl">Ex-Amdocs, SWE</p>
        </div>
        <div>
          <img
            src="/image/1280px-Sears_logo_(2020).svg.png"
            alt="Sears"
            className="mx-auto"
          />
          <p className="text-xl">Ex-Sears Holdings, SWE</p>
        </div>
        <div>
          <img src="/image/Nike-Logo.png" alt="Nike" className="mx-auto" />
          <p className="text-xl">Currently @ Nike</p>
        </div>
      </div> */}

    </section>
  );
};

export default Home;
