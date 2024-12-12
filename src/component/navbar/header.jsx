// import React from 'react';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import logo from '../../assets/edited_logo.png'; // Đường dẫn tới logo

const Header = () => {
  return (
    <header className="bg-[#6C9D31] text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo và tên website */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="h-20 w-20 rounded-full border-2 border-white" // Thêm border và làm tròn logo
            />
          </Link>
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide hover:text-yellow-400"
          >
            Recipe Haven
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-lg font-medium hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/recipes"
            className="text-lg font-medium hover:text-yellow-300 transition duration-300"
          >
            Recipes
          </Link>
          <Link
            to="/aboutus"
            className="text-lg font-medium hover:text-yellow-300 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-lg font-medium hover:text-yellow-300 transition duration-300"
          >
            Contact
          </Link>
          <Link
            to="/pricing"
            className="text-lg font-medium hover:text-yellow-300 transition duration-300"
          >
            Pricing
          </Link>
        </nav>

        {/* Button for Login/Signup */}
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 hover:text-white transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-yellow-400 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition duration-300"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white text-2xl focus:outline-none">
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;
