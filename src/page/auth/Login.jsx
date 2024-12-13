import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaLock } from "react-icons/fa";
import loginImage from "../../assets/Login.jpg";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData.username, formData.password);

    if (success) {
      const user = JSON.parse(localStorage.getItem("user"));
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 3000,
      });

      // Redirect based on role
      setTimeout(() => {
        if (user.role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 3000);
    } else {
      toast.error("Invalid username or password. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white rounded-lg shadow-lg mx-6">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Welcome Back!</h1>

          <form onSubmit={handleFormSubmit}>
            <div className="mb-6">
              <label htmlFor="username" className="block text-lg font-medium text-gray-700">
                Username
              </label>
              <div className="relative mt-2">
                <FaUser className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  className="pl-10 w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-2">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="pl-10 w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-bold hover:opacity-90 focus:outline-none"
            >
              LOGIN
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don`t have an account? {" "}
              <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={loginImage}
          alt="Login Visual"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default Login;
