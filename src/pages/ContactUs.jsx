import { useState } from "react";

const ContactUs = () => {
  // TEMP logged-in user (later from AuthContext)
  const [form, setForm] = useState({
    name: "Kanishka Deo",
    email: "kanishka@example.com",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.message.trim()) {
      alert("Message is required");
      return;
    }

    // TODO: replace with API call
    console.log("Contact form submitted:", form);

    setForm({ ...form, message: "" });
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">

        <h1 className="text-3xl font-medium text-gray-900 mb-6 w-full text-center">
          Contact Us
        </h1>

        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col mx-auto">
          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                value={form.name}
                disabled
                className="w-full bg-white rounded border border-gray-300 py-2 px-3 text-gray-700"
              />
            </div>

            {/* Email */}
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                disabled
                className="w-full bg-white rounded border border-gray-300 py-2 px-3 text-gray-700"
              />
            </div>

            {/* Message */}
            <div className="relative mb-6">
              <label className="leading-7 text-sm text-gray-600">
                Message
              </label>
              <textarea
                className="w-full bg-white rounded border border-gray-300 py-2 px-3 text-gray-700 h-32 resize-none"
                placeholder="Enter your message here"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                required
              />
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-indigo-500 text-white px-8 py-2 rounded-full hover:bg-indigo-600"
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

export default ContactUs;
