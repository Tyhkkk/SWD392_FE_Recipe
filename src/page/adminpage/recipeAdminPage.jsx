import { useState, useEffect } from "react";
import { getRecipesByPage } from "../../lib/recipeApi/recipeeAPI";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";

const RecipeAdminPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes(currentPage);
  }, [currentPage]);

  const fetchRecipes = async (page) => {
    try {
      const data = await getRecipesByPage(page);
      setRecipes(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    }
  };

  const handleNavigateToAddRecipe = () => {
    navigate("/admin/recipe/add");
  };

  const handleNavigateToDetail = (id) => {
    navigate(`/admin/recipe/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await fetch(`https://recipe-giver.azurewebsites.net/api/Recipes/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Refresh the list after deletion
        fetchRecipes(currentPage);
        alert("Recipe deleted successfully!");
      } catch (error) {
        console.error("Failed to delete recipe:", error);
        alert("Failed to delete recipe. Please try again later.");
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Recipe Management</h1>

      <div className="mb-4">
        <button
          onClick={handleNavigateToAddRecipe}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Recipe
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Preparation Time</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr
              key={recipe.id}
              onClick={() => handleNavigateToDetail(recipe.id)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="border border-gray-300 px-4 py-2">{recipe.id}</td>
              <td className="border border-gray-300 px-4 py-2">{recipe.title}</td>
              <td className="border border-gray-300 px-4 py-2">
                {recipe.description.length > 50
                  ? `${recipe.description.slice(0, 50)}...`
                  : recipe.description}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {recipe.preparationTime} mins
              </td>
              <td
                className="border border-gray-300 px-4 py-2 flex items-center justify-center space-x-2"
                onClick={(e) => e.stopPropagation()} // Prevent row click propagation
              >
                <button
                  onClick={() => console.log("Edit recipe", recipe.id)}
                  className="text-yellow-500 hover:text-yellow-600"
                >
                  <MdEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
    </div>
  );
};

export default RecipeAdminPage;
