import  { useState, useEffect } from "react";
import {
  getIngredientsByPage,
  addIngredient,
  getIngredientById,
  updateIngredient,
  deleteIngredient,
} from "../../lib/ingredientApi/ingredientAPI";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IngredientPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", type: "" });
  const [selectedIngredientId, setSelectedIngredientId] = useState(null);

  // Fetch ingredients on page load and page change
  useEffect(() => {
    fetchIngredients(currentPage);
  }, [currentPage]);

  const fetchIngredients = async (page) => {
    try {
      const data = await getIngredientsByPage(page);
      setIngredients(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error("Failed to fetch ingredients.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setIsEditMode(false);
    setFormData({ name: "", type: "" });
    setSelectedIngredientId(null);
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateIngredient(selectedIngredientId, formData);
        toast.success("Ingredient updated successfully!");
      } else {
        await addIngredient(formData);
        toast.success("Ingredient added successfully!");
      }
      closeModal();
      fetchIngredients(currentPage);
    } catch (error) {
      toast.error("Failed to add/update ingredient.");
    }
  };

  const handleEdit = async (id) => {
    try {
      const ingredient = await getIngredientById(id);
      setFormData({ name: ingredient.name, type: ingredient.type });
      setSelectedIngredientId(id);
      setIsEditMode(true);
      openModal();
    } catch (error) {
      toast.error("Failed to fetch ingredient details.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ingredient?")) {
      try {
        await deleteIngredient(id);
        toast.success("Ingredient deleted successfully!");
        fetchIngredients(currentPage);
      } catch (error) {
        toast.error("Failed to delete ingredient.");
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Ingredients</h1>

      {/* Add Ingredient Button */}
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Ingredient
      </button>

      {/* Ingredient Table */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient, index) => (
            <tr key={ingredient.id}>
              <td className="border border-gray-300 px-4 py-2">
                {(currentPage - 1) * 10 + index + 1}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {ingredient.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {ingredient.type}
              </td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(ingredient.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ingredient.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 border rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded shadow-md w-1/2 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "Edit Ingredient" : "Add Ingredient"}
        </h2>
        <form onSubmit={handleAddOrUpdate}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {isEditMode ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default IngredientPage;
