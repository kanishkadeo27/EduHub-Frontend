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
    <section className="min-h-[60vh] flex flex-col justify-center items-center bg-gray-50 px-4">

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6">
        Welcome to My Learning Platform
      </h1>

      {/* Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-white shadow rounded-full px-4 py-2 w-full max-w-xl"
      >
        <input
          type="text"
          placeholder="Search Courses"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 outline-none px-2 text-gray-700"
        />

        <button type="submit" className="p-2">
          <img
            src="src\assets\image\search-new-theme.png"
            alt="Search"
            className="w-6 h-6"
          />
        </button>
      </form>

    </section>
  );
};

export default Search;
