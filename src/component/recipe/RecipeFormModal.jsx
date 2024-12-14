import { useState, useEffect } from "react";
import Modal from "react-modal";
import { uploadImage, createRecipe } from "../../lib/recipeApi/recipeeAPI";
import { getCategoriesByPage} from "../../lib/categoryApi/CategoryAPI";
import { getIngredientsByPage} from "../../lib/ingredientApi/ingredientAPI";
import { getOriginsByPage} from "../../lib/originApi/OriginAPI";
const RecipeFormModal = ({ isOpen, onRequestClose, onRecipeCreated, userId }) => {
    const [recipeData, setRecipeData] = useState({
      title: "",
      description: "",
      preparationTime: 0,
      cookingTime: 0,
      servings: 0,
      image: "",
      cookingMethod: "",
      category: "",
      author: userId,
      origin: "",
      ingredients: [],
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
        ingredients: [...recipeData.ingredients, { ingredientId: "", quantity: "", unit: "" }],
      });
    };
  
    const handleIngredientChange = (index, field, value) => {
      const updatedIngredients = recipeData.ingredients.map((ingredient, i) =>
        i === index ? { ...ingredient, [field]: value } : ingredient
      );
      setRecipeData({ ...recipeData, ingredients: updatedIngredients });
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
  
    const handleImageUpload = async () => {
      if (!selectedImage) return;
      const imageUrl = await uploadImage(selectedImage);
      setRecipeData({ ...recipeData, image: imageUrl });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await createRecipe(recipeData);
      onRecipeCreated();
    };
  
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Create Recipe"
        className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8 mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Create New Recipe</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-8">
          {/* Left Section */}
          <div>
            <input
              type="text"
              name="title"
              placeholder="Recipe Title"
              value={recipeData.title}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded mb-4"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={recipeData.description}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded mb-4"
            />
            <div className="grid grid-cols-3 gap-4 mb-4">
              <input
                type="number"
                name="preparationTime"
                placeholder="Preparation Time"
                value={recipeData.preparationTime}
                onChange={handleInputChange}
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="cookingTime"
                placeholder="Cooking Time"
                value={recipeData.cookingTime}
                onChange={handleInputChange}
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="servings"
                placeholder="Servings"
                value={recipeData.servings}
                onChange={handleInputChange}
                className="border px-3 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label>Upload Recipe Image</label>
              <input type="file" onChange={(e) => setSelectedImage(e.target.files[0])} className="block mb-2" />
              <button type="button" onClick={handleImageUpload} className="px-4 py-2 bg-green-500 text-white rounded">
                Upload
              </button>
            </div>
          </div>
  
          {/* Center Section */}
          <div>
            <h3 className="text-lg font-bold mb-2">Ingredients</h3>
            {recipeData.ingredients.map((ingredient, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 mb-2">
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
  
          {/* Right Section */}
          <div>
            <h3 className="text-lg font-bold mb-2">Steps</h3>
            {recipeData.steps.map((step, index) => (
              <div key={index} className="mb-4">
                <textarea
                  placeholder={`Step ${index + 1} Description`}
                  value={step.description}
                  onChange={(e) => handleStepChange(index, "description", e.target.value)}
                  className="w-full border px-3 py-2 rounded mb-2"
                />
                <input
                  type="text"
                  placeholder="Tools Required"
                  value={step.toolsRequired}
                  onChange={(e) => handleStepChange(index, "toolsRequired", e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="number"
                  placeholder="Duration (mins)"
                  value={step.duration}
                  onChange={(e) => handleStepChange(index, "duration", e.target.value)}
                  className="w-full border px-3 py-2 rounded mb-2"
                />
                <input
                  type="text"
                  placeholder="Step Image URL"
                  value={step.image}
                  onChange={(e) => handleStepChange(index, "image", e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
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
          <div className="col-span-3 flex justify-end space-x-4 mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Create Recipe
            </button>
            <button
              type="button"
              onClick={onRequestClose}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    );
  };
  
  export default RecipeFormModal;