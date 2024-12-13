// import React from "react";
import { useAuth } from "../../context/authContext";

const ProfileAdmin = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Admin Profile</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Username:</h2>
        <p>{user.username}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">User ID:</h2>
        <p>{user.userId}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Role:</h2>
        <p>{user.role}</p>
      </div>

      <div className="mt-6">
        <button
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
          onClick={() => alert("Feature not implemented yet!")}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileAdmin;
