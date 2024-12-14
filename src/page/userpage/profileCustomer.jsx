import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import api from "../../lib/apiService"; // Import service to call API

const ProfileCustomer = () => {
  const { user } = useAuth(); // Context to access userId
  const [profileData, setProfileData] = useState({
    userId: "",
    username: "",
    fullname: "",
    email: "",
    role: "",
    createAt: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfileData(user.userId); // Fetch profile data based on userId from context
    }
  }, [user]);

  const fetchProfileData = async (userId) => {
    try {
      const response = await api.get(`/api/User/${userId}`);
      setProfileData(response.data);
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await api.put(`/api/User/${profileData.userId}`, profileData); // API to update user profile
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Display Profile Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2">Username</label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            ) : (
              <p className="text-gray-800">{profileData.username}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-2">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="fullname"
                value={profileData.fullname}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            ) : (
              <p className="text-gray-800">{profileData.fullname}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-2">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            ) : (
              <p className="text-gray-800">{profileData.email}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-2">Role</label>
            <p className="text-gray-800">{profileData.role}</p>
          </div>
          <div>
            <label className="block font-medium mb-2">Account Created At</label>
            <p className="text-gray-800">
              {new Date(profileData.createAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCustomer;
