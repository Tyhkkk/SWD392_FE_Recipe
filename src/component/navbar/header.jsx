import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import logo from '../../assets/edited_logo.png'; // Path to the logo

const Header = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check localStorage for user and token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]); // Re-run if the user context changes

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout(); // Clear token and user state via authContext
    setIsDropdownOpen(false); // Close the dropdown menu
    setIsAuthenticated(false); // Update state to unauthenticated
    navigate('/'); // Redirect to the home page
  };

  return (
    <header className="bg-[#6C9D31] text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo and Website Name */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="h-20 w-20 rounded-full border-2 border-white"
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

        {/* User Authentication Dropdown or Login/Sign Up Buttons */}
        <div className="relative">
          {isAuthenticated ? (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              <span className="text-lg font-medium">{`Welcome, ${user?.username || 'User'}`}</span>
              <i
                className={`fas fa-chevron-down ${
                  isDropdownOpen ? 'rotate-180' : ''
                } transition-transform`}
              ></i>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/signin"
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
          )}

          {isDropdownOpen && isAuthenticated && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-lg shadow-lg py-2">
              <Link
                to="/profileUser"
                className="block px-4 py-2 hover:bg-gray-100 transition duration-300"
              >
                Account
              </Link>
              <Link
                to="/pricing"
                className="block px-4 py-2 hover:bg-gray-100 transition duration-300"
              >
                My Subscriptions
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition duration-300"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
