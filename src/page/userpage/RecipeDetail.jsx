import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById } from "../../lib/recipeApi/recipeApi";
import Loading from "../../component/loading";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!recipe) {
    return <p className="text-center text-red-500">Recipe not found.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-wrap bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left: Recipe Image */}
        <div className="w-full md:w-1/2">
          <img
            src={recipe.image || "https://via.placeholder.com/500"}
            alt={recipe.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Right: Recipe Information */}
        <div className="w-full md:w-1/2 p-6 flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Category:</strong> {recipe.category}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Author:</strong> {recipe.author}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Origin:</strong> {recipe.origin}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Difficulty:</strong> {recipe.difficultLevel}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Servings:</strong> {recipe.servings} |{" "}
            <strong>Cooking Time:</strong> {recipe.cookingTime} mins |{" "}
            <strong>Preparation Time:</strong> {recipe.preparationTime} mins
          </p>

          {/* Ingredients */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.ingredientId}>
                  {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                </li>
              ))}
            </ul>
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-700">{recipe.description}</p>

          {/* View Steps Button */}
          <button
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            onClick={() => navigate(`/recipe/${id}/steps`)}
          >
            View Steps
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
