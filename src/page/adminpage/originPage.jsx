import { useState, useEffect } from "react";
import {
  getOriginsByPage,
  addOrigin,
  getOriginById,
  updateOrigin,
  deleteOrigin,
} from "../../lib/originApi/OriginAPI";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEdit, MdDelete } from "react-icons/md";

const OriginPage = () => {
  const [origins, setOrigins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({ country: "", region: "", cultureDescription: "" });
  const [selectedOriginId, setSelectedOriginId] = useState(null);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [originToDelete, setOriginToDelete] = useState(null);

  useEffect(() => {
    fetchOrigins(currentPage);
  }, [currentPage]);

  const fetchOrigins = async (page) => {
    try {
      const data = await getOriginsByPage(page);
      setOrigins(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error("Failed to fetch origins.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add Origin Handlers
  const openAddModal = () => {
    setFormData({ country: "", region: "", cultureDescription: "" });
    setAddModalIsOpen(true);
  };

  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };

  const handleAddOrigin = async (e) => {
    e.preventDefault();
    try {
      await addOrigin(formData);
      toast.success("Origin added successfully!");
      closeAddModal();
      fetchOrigins(currentPage);
    } catch (error) {
      toast.error("Failed to add origin.");
    }
  };

  // Edit Origin Handlers
  const openEditModal = async (id) => {
    try {
      const data = await getOriginById(id);
      setFormData(data); // Prefill the form with fetched data
      setSelectedOriginId(id);
      setEditModalIsOpen(true);
    } catch (error) {
      toast.error("Failed to fetch origin details.");
    }
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setSelectedOriginId(null);
  };

  const handleEditOrigin = async (e) => {
    e.preventDefault();
    try {
      await updateOrigin(selectedOriginId, formData);
      toast.success("Origin updated successfully!");
      closeEditModal();
      fetchOrigins(currentPage);
    } catch (error) {
      toast.error("Failed to update origin.");
    }
  };

  // Delete Origin Handlers
  const openDeleteModal = (origin) => {
    setOriginToDelete(origin);
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setOriginToDelete(null);
    setDeleteModalIsOpen(false);
  };

  const handleDeleteOrigin = async () => {
    try {
      await deleteOrigin(originToDelete.id);
      toast.success("Origin deleted successfully!");
      closeDeleteModal();
      fetchOrigins(currentPage);
    } catch (error) {
      toast.error("Failed to delete origin.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Origin Management</h1>

      {/* Add Origin Button */}
      <button
        onClick={openAddModal}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Origin
      </button>

      {/* Origin Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Country</th>
            <th className="border border-gray-300 px-4 py-2">Region</th>
            <th className="border border-gray-300 px-4 py-2">Culture Description</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {origins.map((origin) => (
            <tr key={origin.id}>
              <td className="border border-gray-300 px-4 py-2">{origin.id}</td>
              <td className="border border-gray-300 px-4 py-2">{origin.country}</td>
              <td className="border border-gray-300 px-4 py-2">{origin.region}</td>
              <td className="border border-gray-300 px-4 py-2 truncate max-w-xs" title={origin.cultureDescription}>
                {origin.cultureDescription.length > 50
                  ? `${origin.cultureDescription.slice(0, 50)}...`
                  : origin.cultureDescription}
              </td>
              <td className="border border-gray-300 px-4 py-2 flex items-center justify-center space-x-2">
                <button
                  onClick={() => openEditModal(origin.id)}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  <MdEdit size={20} />
                </button>
                <button
                  onClick={() => openDeleteModal(origin)}
                  className="text-red-500 hover:text-red-600"
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 mx-1 ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
            } rounded-md hover:bg-gray-300`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={addModalIsOpen}
        onRequestClose={closeAddModal}
        contentLabel="Add Origin"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-lg font-bold mb-4">Add Origin</h2>
        <form onSubmit={handleAddOrigin}>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Country"
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            placeholder="Region"
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
          />
          <textarea
            name="cultureDescription"
            value={formData.cultureDescription}
            onChange={handleInputChange}
            placeholder="Culture Description"
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
          ></textarea>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Add
          </button>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Origin"
        className="bg-white p-10 rounded-lg shadow-lg max-w-md mx-auto h-96"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-lg font-bold mb-4">Edit Origin</h2>
        <form onSubmit={handleEditOrigin}>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
          />
          <textarea
            name="cultureDescription"
            value={formData.cultureDescription}
            onChange={handleInputChange}
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
          ></textarea>
          <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
            Update
          </button>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Confirmation"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-lg font-bold mb-4">Delete Origin</h2>
        <p>Are you sure you want to delete this origin?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleDeleteOrigin}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={closeDeleteModal}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default OriginPage;
