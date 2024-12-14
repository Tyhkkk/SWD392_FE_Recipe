import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById, updateRecipe } from "../../lib/recipeApi/recipeeAPI";
import Modal from "react-modal";

// Set app element for react-modal
Modal.setAppElement("#root");

const RecipeAdminDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [updateType, setUpdateType] = useState("");

  useEffect(() => {
    fetchRecipeDetail(id);
  }, [id]);

  const fetchRecipeDetail = async (recipeId) => {
    try {
      const data = await getRecipeById(recipeId);
      setRecipe(data);
    } catch (error) {
      console.error("Failed to fetch recipe detail:", error);
    }
  };

  const openUpdateModal = (type, data) => {
    setUpdateType(type);
    setUpdateData(data);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      if (updateType === "recipe") {
        await updateRecipe(id, updateData);
        setRecipe({ ...recipe, ...updateData });
      } else if (updateType === "ingredient") {
        const updatedIngredients = recipe.ingredients.map((ing) =>
          ing.ingredientId === updateData.ingredientId ? updateData : ing
        );
        setRecipe({ ...recipe, ingredients: updatedIngredients });
      } else if (updateType === "step") {
        const updatedSteps = recipe.steps.map((step) =>
          step.stepNumber === updateData.stepNumber ? updateData : step
        );
        setRecipe({ ...recipe, steps: updatedSteps });
      }
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error("Failed to update:", error);
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
        onClick={() => openUpdateModal("recipe", { ...recipe })}
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
      <h2 className="text-xl font-bold mb-2">Ingredients</h2>
      <ul className="list-disc ml-6">
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.ingredientId}>
            {ingredient.name} - {ingredient.quantity} {ingredient.unit}
            <button
              className="text-blue-500 ml-4"
              onClick={() =>
                openUpdateModal("ingredient", { ...ingredient })
              }
            >
              Update
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mb-2 mt-4">Steps</h2>
      <ol className="list-decimal ml-6">
        {recipe.steps.map((step) => (
          <li key={step.stepNumber} className="mb-2">
            <strong>Step {step.stepNumber}:</strong> {step.description} (
            Duration: {step.duration} mins)
            <button
              className="text-blue-500 ml-4"
              onClick={() => openUpdateModal("step", { ...step })}
            >
              Update
            </button>
          </li>
        ))}
      </ol>

      {/* Update Modal */}
      <Modal
        isOpen={isUpdateModalOpen}
        onRequestClose={() => setIsUpdateModalOpen(false)}
        className="p-6 bg-white rounded shadow-md mx-auto mt-10 w-1/2"
      >
        <h2 className="text-2xl font-bold mb-4">
          Update {updateType === "recipe" ? "Recipe" : updateType === "ingredient" ? "Ingredient" : "Step"}
        </h2>
        <form>
          {updateType === "recipe" && (
            <>
              <div className="mb-4">
                <label className="block font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={updateData?.title || ""}
                  onChange={handleUpdateChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Description</label>
                <textarea
                  name="description"
                  value={updateData?.description || ""}
                  onChange={handleUpdateChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
            </>
          )}
          {updateType === "ingredient" && (
            <>
              <div className="mb-4">
                <label className="block font-medium">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={updateData?.quantity || ""}
                  onChange={handleUpdateChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Unit</label>
                <input
                  type="text"
                  name="unit"
                  value={updateData?.unit || ""}
                  onChange={handleUpdateChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
            </>
          )}
          {updateType === "step" && (
            <>
              <div className="mb-4">
                <label className="block font-medium">Description</label>
                <textarea
                  name="description"
                  value={updateData?.description || ""}
                  onChange={handleUpdateChange}
                  className="w-full border px-3 py-2 rounded mb-2"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Duration</label>
                <input
                  type="number"
                  name="duration"
                  value={updateData?.duration || ""}
                  onChange={handleUpdateChange}
                  className="w-full border px-3 py-2 rounded mb-2"
                />
              </div>
            </>
          )}
          <button
            type="button"
            onClick={handleUpdate}
            className="px-6 py-2 bg-green-500 text-white rounded"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setIsUpdateModalOpen(false)}
            className="px-6 py-2 bg-gray-500 text-white rounded ml-4"
          >
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default RecipeAdminDetail;
