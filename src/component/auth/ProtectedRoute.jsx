import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const ProtectedRoute = ({ allowedRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    console.warn("No user found, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    console.warn(`User role ${user.role} not authorized for ${allowedRole}, redirecting to /`);
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;