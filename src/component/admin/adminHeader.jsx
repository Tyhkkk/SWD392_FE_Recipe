import { HiOutlineUser } from "react-icons/hi";
// import { useAuth } from "../../context/auth/AuthContext"; // import AuthContext

const AdminHeader = () => {
  // Sử dụng AuthContext để lấy thông tin người dùng
//   const { user } = useAuth();

  return (
    <header className="bg-white text-[#7b3d35] font-jomolhari py-4 px-6 shadow-md flex justify-between items-center">
      {/* Logo */}
      {/* <div className="flex items-center space-x-3">
        <img src="/src/assets/2.png" alt="Camellia Logo" className="h-10" />
        <h1 className="text-3xl font-bold">Camellia</h1>
      </div> */}

      {/* Thông tin người quản lý */}
      <div className="flex items-center space-x-3">
        <HiOutlineUser className="text-3xl" />
        <span className="text-lg font-medium">Xin chào, Admin</span>
      </div>
    </header>
  );
};

export default AdminHeader;
