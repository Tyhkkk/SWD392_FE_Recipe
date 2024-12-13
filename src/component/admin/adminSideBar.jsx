import { Link, useNavigate } from 'react-router-dom';
import { FaChartBar, FaSignOutAlt, FaBook,  FaUser } from 'react-icons/fa';
import { BiSolidCategory } from "react-icons/bi";
import { CiReceipt } from "react-icons/ci";
import { MdOutlineCropOriginal } from "react-icons/md";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();
    // Redirect to signin page
    navigate('/');
  };

  return (
    <div className="h-full w-auto bg-white shadow-lg flex flex-col p-4">
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-8 text-left">
        <img src="/src/assets/edited_logo.png" alt="Camellia Logo" className="h-10" />
        <h1 className="text-3xl font-bold">Recipe Heaven</h1>
      </div>

      {/* Menu Items */}
      <nav className="flex-grow space-y-4">
      <Link to="/admin" className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-100">
          <FaChartBar className="mr-3 text-gray-600" /> Dashboard
        </Link>
        <Link to="/admin/recipe" className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-100">
          <CiReceipt className="mr-3 text-gray-600" /> Recipes
        </Link>
        <Link to="/admin/category" className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-100">
          <BiSolidCategory className="mr-3 text-gray-600" /> Category
          <span className="ml-auto bg-blue-100 text-blue-500 text-xs font-semibold px-2 py-0.5 rounded-full">14</span>
        </Link>
        <Link to="/admin/ingredient" className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-100">
          <FaBook className="mr-3 text-gray-600" /> Ingredient
        </Link>
        <Link to="/admin/origin" className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-100">
          <MdOutlineCropOriginal className="mr-3 text-gray-600" /> Origin 
        </Link>
        {/* <Link to="/admin/user" className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-100">
          <FaUser className="mr-3 text-gray-600" /> User Account
        </Link> */}
        <Link to="/admin/profile" className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-100">
          <FaUser className="mr-3 text-gray-600" /> Profile 
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto h-auto">
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-red-500 hover:bg-red-100 rounded-lg w-full"
        >
          <FaSignOutAlt className="mr-3" /> Log Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
