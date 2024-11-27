// import React from "react";

const HomePage = () => {
  return (
    <div className="w-full bg-[#D4A373] min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4 py-8">
        {/* Left Section */}
        <div>
          <h1 className="text-5xl font-bold text-[#2d2d2d] leading-snug">
            Every Recipe <br />
            Starts with a{" "}
            <span className="text-[#ff6f3d]">Passion</span>
          </h1>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            Hi There! We`re Recipe Giver,
            <br />
            We share easy-to-follow recipes that inspire creativity in the
            kitchen. Let`s cook up something special together.
          </p>
          <button className="mt-6 bg-[#ff6f3d] text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-[#ff8c5e] transition duration-300">
            Explore Recipes
          </button>
        </div>

        {/* Right Section */}
        <div>
          <img
            src="/src/assets/2.jpg" // Replace with your actual image path
            alt="Delicious Food"
            className="max-w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
