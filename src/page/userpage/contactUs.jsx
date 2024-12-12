// import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>
        <p className="text-lg text-gray-600 leading-relaxed text-center mb-8">
          We would love to hear from you! Whether you have a question, feedback, or just want to say hello,
          please feel free to reach out to us.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
            <ul className="text-gray-600 leading-relaxed">
              <li>
                <span className="font-bold">Email:</span> support@yourwebsite.com
              </li>
              <li>
                <span className="font-bold">Phone:</span> +1 (123) 456-7890
              </li>
              <li>
                <span className="font-bold">Address:</span> 123 Cooking Lane, Foodie City, FC 12345
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-semibold">Your Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold">Your Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-semibold">Your Message</label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
