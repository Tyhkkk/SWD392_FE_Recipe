import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById } from "../../lib/recipeApi/recipeApi";
import Loading from "../../component/loading";

const RecipeSteps = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (error) {
        console.error("Failed to fetch recipe steps:", error);
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
    return <p className="text-center text-red-500">Steps not found.</p>;
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

        {/* Right: Steps */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-4">Steps for {recipe.title}</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-4">
            {recipe.steps.map((step) => (
              <li key={step.id}>
                <p>
                  <strong>Step {step.stepNumber}:</strong> {step.description}
                </p>
                <p className="text-sm text-gray-500">
                  Duration: {step.duration} mins | Tools Required: {step.toolsRequired}
                </p>
              </li>
            ))}
          </ol>

          {/* Back Buttons */}
          <div className="mt-6 space-x-4">
            <button
              onClick={() => navigate(`/recipe/${id}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Back to Recipe Details
            </button>
            <button
              onClick={() => navigate(`/`)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeSteps;
