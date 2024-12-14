import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage, createRecipe } from "../../lib/recipeApi/recipeeAPI";
import { getCategoriesByPage } from "../../lib/categoryApi/CategoryAPI";
import { getIngredientsByPage } from "../../lib/ingredientApi/ingredientAPI";
import { getOriginsByPage } from "../../lib/originApi/OriginAPI";
import { AuthContext } from "../../context/authContext";

const RecipeFormPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [recipeData, setRecipeData] = useState({
    title: "",
    description: "",
    preparationTime: 0,
    cookingTime: 0,
    servings: 0,
    image: "",
    cookingMethod: "",
    category: "",
    author: user?.id,
    origin: "",
    ingrediens: [], // Corrected key name
    steps: [],
  });

  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    const categoryData = await getCategoriesByPage(1);
    const ingredientData = await getIngredientsByPage(1);
    const originData = await getOriginsByPage(1);
    setCategories(categoryData.items);
    setIngredients(ingredientData.items);
    setOrigins(originData.items);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleAddIngredient = () => {
    setRecipeData({
      ...recipeData,
      ingrediens: [...recipeData.ingrediens, { ingredientId: "", quantity: "", unit: "" }],
    });
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = recipeData.ingrediens.map((ingredient, i) =>
      i === index ? { ...ingredient, [field]: value } : ingredient
    );
    setRecipeData({ ...recipeData, ingrediens: updatedIngredients });
  };

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = recipeData.ingrediens.filter((_, i) => i !== index);
    setRecipeData({ ...recipeData, ingrediens: updatedIngredients });
  };

  const handleAddStep = () => {
    setRecipeData({
      ...recipeData,
      steps: [...recipeData.steps, { stepNumber: recipeData.steps.length + 1, description: "", image: "", duration: 0, toolsRequired: "" }],
    });
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = recipeData.steps.map((step, i) =>
      i === index ? { ...step, [field]: value } : step
    );
    setRecipeData({ ...recipeData, steps: updatedSteps });
  };

  const handleDeleteStep = (index) => {
    const updatedSteps = recipeData.steps.filter((_, i) => i !== index);
    setRecipeData({ ...recipeData, steps: updatedSteps });
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;
    const imageUrl = await uploadImage(selectedImage);
    setRecipeData({ ...recipeData, image: imageUrl });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRecipe(recipeData);
      navigate("/admin/recipe");
    } catch (error) {
      console.error("Failed to create recipe:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Information */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Recipe Title"
              value={recipeData.title}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Description"
              value={recipeData.description}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Timing and Servings */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block font-medium">Preparation Time</label>
            <input
              type="number"
              name="preparationTime"
              placeholder="Minutes"
              value={recipeData.preparationTime}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Cooking Time</label>
            <input
              type="number"
              name="cookingTime"
              placeholder="Minutes"
              value={recipeData.cookingTime}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Servings</label>
            <input
              type="number"
              name="servings"
              placeholder="Servings"
              value={recipeData.servings}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block font-medium">Category</label>
            <select
              name="category"
              value={recipeData.category}
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
              value={recipeData.origin}
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
          <div>
            <label className="block font-medium">Cooking Method</label>
            <input
              type="text"
              name="cookingMethod"
              placeholder="E.g., Grilling"
              value={recipeData.cookingMethod}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium">Upload Recipe Image</label>
          <input type="file" onChange={(e) => setSelectedImage(e.target.files[0])} className="block mb-2" />
          <button
            type="button"
            onClick={handleImageUpload}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Upload
          </button>
          {recipeData.image && <p className="text-green-600 mt-2">Uploaded URL: {recipeData.image}</p>}
        </div>

        {/* Ingredients */}
        <div>
          <h2 className="text-lg font-bold">Ingredients</h2>
          {recipeData.ingrediens.map((ingredient, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 mb-2">
              <select
                value={ingredient.ingredientId}
                onChange={(e) => handleIngredientChange(index, "ingredientId", e.target.value)}
                className="border px-3 py-2 rounded"
              >
                <option value="">Select Ingredient</option>
                {ingredients.map((ing) => (
                  <option key={ing.id} value={ing.id}>
                    {ing.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Unit"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
                className="border px-3 py-2 rounded"
              />
              <button
                type="button"
                onClick={() => handleDeleteIngredient(index)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="text-blue-500 underline"
          >
            Add Ingredient
          </button>
        </div>

        {/* Steps */}
        <div>
          <h2 className="text-lg font-bold">Steps</h2>
          {recipeData.steps.map((step, index) => (
            <div key={index} className="space-y-2 mb-4 border p-2 rounded">
              <label className="block font-medium">Description</label>
              <textarea
                placeholder={`Step ${index + 1} Description`}
                value={step.description}
                onChange={(e) => handleStepChange(index, "description", e.target.value)}
                className="w-full border px-3 py-2 rounded mb-2"
              />
              <label className="block font-medium">Tools Required</label>
              <input
                type="text"
                placeholder="Tools Required"
                value={step.toolsRequired}
                onChange={(e) => handleStepChange(index, "toolsRequired", e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              <label className="block font-medium">Duration</label>
              <input
                type="number"
                placeholder="Duration (mins)"
                value={step.duration}
                onChange={(e) => handleStepChange(index, "duration", e.target.value)}
                className="w-full border px-3 py-2 rounded mb-2"
              />
              <label className="block font-medium">Step Image URL</label>
              <input
                type="text"
                placeholder="Step Image URL"
                value={step.image}
                onChange={(e) => handleStepChange(index, "image", e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              <button
                type="button"
                onClick={() => handleDeleteStep(index)}
                className="text-red-500 mt-2"
              >
                Delete Step
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddStep}
            className="text-blue-500 underline"
          >
            Add Step
          </button>
        </div>

        {/* Submit and Cancel */}
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Create Recipe
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/recipes")}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeFormPage;
