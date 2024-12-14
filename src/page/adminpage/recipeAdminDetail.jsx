import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getRecipeById,
  updateRecipe,
} from "../../lib/recipeApi/recipeeAPI";
import { uploadImage } from "../../lib/recipeApi/recipeeAPI"; // API to upload image
import { getCategoriesByPage } from "../../lib/categoryApi/CategoryAPI";
import { getOriginsByPage } from "../../lib/originApi/OriginAPI";
import Modal from "react-modal";

// Set app element for react-modal
Modal.setAppElement("#root");

const RecipeAdminDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [categories, setCategories] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchRecipeDetail(id);
    fetchDropdownData();
  }, [id]);

  // Fetch recipe details
  const fetchRecipeDetail = async (recipeId) => {
    try {
      const data = await getRecipeById(recipeId);
      setRecipe(data);
    } catch (error) {
      console.error("Failed to fetch recipe detail:", error);
    }
  };

  // Fetch dropdown data for categories and origins
  const fetchDropdownData = async () => {
    try {
      const categoryData = await fetchAllPages(getCategoriesByPage);
      const originData = await fetchAllPages(getOriginsByPage);
      setCategories(categoryData);
      setOrigins(originData);
    } catch (error) {
      console.error("Failed to fetch dropdown data:", error);
    }
  };

  // Helper function to fetch all pages of a paginated API
  const fetchAllPages = async (apiFunction) => {
    const allData = [];
    let currentPage = 1;
    let totalPages = 1;

    do {
      const data = await apiFunction(currentPage);
      allData.push(...data.items);
      totalPages = data.totalPages;
      currentPage++;
    } while (currentPage <= totalPages);

    return allData;
  };

  const openUpdateModal = () => {
    setUpdateData(recipe); // Set recipe data for editing
    setIsUpdateModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;
    try {
      const imageUrl = await uploadImage(selectedImage);
      setUpdateData({ ...updateData, image: imageUrl });
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Failed to upload image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateRecipe(id, updateData);
      setRecipe({ ...recipe, ...updateData }); // Update local state
      setIsUpdateModalOpen(false);
      alert("Recipe updated successfully!");
    } catch (error) {
      console.error("Failed to update recipe:", error);
      alert("Failed to update recipe. Please try again.");
    }
  };

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-auto rounded mb-6"
      />
      <button
        onClick={openUpdateModal}
        className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
      >
        Update Recipe
      </button>

      <p className="text-lg mb-2">
        <strong>Description:</strong> {recipe.description}
      </p>
      <p className="text-lg mb-2">
        <strong>Preparation Time:</strong> {recipe.preparationTime} mins
      </p>
      <p className="text-lg mb-2">
        <strong>Cooking Time:</strong> {recipe.cookingTime} mins
      </p>
      <p className="text-lg mb-2">
        <strong>Servings:</strong> {recipe.servings}
      </p>
      <p className="text-lg mb-2">
        <strong>Category:</strong> {recipe.category}
      </p>
      <p className="text-lg mb-2">
        <strong>Cooking Method:</strong> {recipe.cookingMethod}
      </p>

      {/* Update Modal */}
      <Modal
        isOpen={isUpdateModalOpen}
        onRequestClose={() => setIsUpdateModalOpen(false)}
        className="p-6 bg-white rounded shadow-md mx-auto mt-10 w-1/2"
      >
        <h2 className="text-2xl font-bold mb-4">Update Recipe</h2>
        <form>
          {/* Title and Description */}
          <div className="mb-4">
            <label className="block font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={updateData?.title || ""}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={updateData?.description || ""}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Timing and Servings */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-medium">Preparation Time</label>
              <input
                type="number"
                name="preparationTime"
                value={updateData?.preparationTime || ""}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Cooking Time</label>
              <input
                type="number"
                name="cookingTime"
                value={updateData?.cookingTime || ""}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Servings</label>
              <input
                type="number"
                name="servings"
                value={updateData?.servings || ""}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          {/* Category and Origin */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium">Category</label>
              <select
                name="category"
                value={updateData?.category || ""}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium">Origin</label>
              <select
                name="origin"
                value={updateData?.origin || ""}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Origin</option>
                {origins.map((origin) => (
                  <option key={origin.id} value={origin.id}>
                    {origin.country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block font-medium">Upload Image</label>
            <input
              type="file"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              className="block mb-2"
            />
            <button
              type="button"
              onClick={handleImageUpload}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Upload
            </button>
            {updateData?.image && (
              <p className="text-green-600 mt-2">Uploaded URL: {updateData.image}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleUpdate}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsUpdateModalOpen(false)}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RecipeAdminDetail;
