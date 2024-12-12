// import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">About Us</h1>
        <p className="text-lg text-gray-600 leading-relaxed text-center mb-8">
          Welcome to our website! We are a passionate team dedicated to bringing you the best recipes,
          ingredients, and cooking tips to make your culinary journey delightful.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Our Mission */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to inspire and empower everyone to cook delicious meals with ease. We aim
              to provide high-quality resources, easy-to-follow recipes, and a wide variety of cooking
              techniques for every level of cook.
            </p>
          </div>

          {/* Our Vision */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              We envision a world where everyone feels confident in the kitchen and enjoys the process
              of preparing and sharing meals with loved ones. Cooking is an art, and we want to help you
              master it.
            </p>
          </div>

          {/* Our Values */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Quality: We prioritize high-quality content and recipes.</li>
              <li>Community: We believe in the power of sharing and collaboration.</li>
              <li>Innovation: We continuously seek to improve and innovate.</li>
            </ul>
          </div>

          {/* Our Team */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 leading-relaxed">
              Our team is made up of chefs, food enthusiasts, and writers who are passionate about
              sharing their love for food. Together, we create content to inspire and educate.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-gray-600 mt-4">Feel free to reach out if you have any questions or suggestions!</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
