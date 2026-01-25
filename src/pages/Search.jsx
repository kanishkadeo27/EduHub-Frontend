import { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // TODO: Replace with API call
    console.log("Searching for:", query);
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
       backgroundImage: "url('/image/banner.jpg')"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 text-center w-full max-w-2xl">

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-semibold text-black mb-8">
          Welcome to My Learning Platform
        </h1>

        {/* Search Bar */}
        <form
  onSubmit={handleSubmit}
  style={{
    background: "white",
    borderRadius: "9999px",
    height: "64px",
    width: "100%",
    maxWidth: "720px",
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
  }}
>
  <input
    type="text"
    placeholder="Search Courses"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    style={{
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      fontSize: "18px",
      color: "#555",
      boxShadow: "none"
    }}
  />

  <button
    type="submit"
    style={{
      border: "none",
      background: "transparent",
      cursor: "pointer"
    }}
  >
    <img
      src="/image/search-new-theme.png"
      alt="Search"
      style={{ width: "22px", height: "22px", opacity: 0.7 }}
    />
  </button>
</form>

      </div>
    </section>
  );
};

export default Search;
