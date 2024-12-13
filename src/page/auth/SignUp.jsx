import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import signupImage from "../../assets/SignUp.jpg"; // Replace with your image path

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    role: "User",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/User`,
        formData
      );
      if (response.status === 201) {
        toast.success("Account created successfully!", { autoClose: 3000 });
        setFormData({
          username: "",
          password: "",
          fullname: "",
          email: "",
          role: "User",
        });
        setTimeout(() => {
          navigate("/signin"); // Redirect to sign-in after success
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Error: ${error.response.data.message}`, { autoClose: 3000 });
      } else {
        toast.error("Failed to create account. Please try again.", { autoClose: 3000 });
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left: Sign Up Form */}
      <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 shadow-lg">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>

          <form onSubmit={handleFormSubmit}>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Type your username"
              className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Type your email"
              className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              placeholder="Type your full name"
              className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Type your password"
              className="w-full mb-6 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-md font-semibold"
            >
              SIGN UP
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500 font-semibold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={signupImage}
          alt="Sign Up Visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignUp;
