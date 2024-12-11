import { useEffect, useState } from "react";
import { getRecipesByPage } from "../../lib/recipeApi/recipeApi";
import { getAllCategories } from "../../lib/recipeApi/categoryApi";

const RecipeDisplay = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch dữ liệu recipes
  const fetchRecipes = async (page) => {
    try {
      const data = await getRecipesByPage(page);
      setRecipes(data.items);
      setCurrentPage(data.page);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    }
  };

  // Fetch tất cả categories
  const fetchCategories = async () => {
    try {
      const allCategories = await getAllCategories();
      setCategories(allCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchRecipes(currentPage); // Fetch recipes khi thay đổi trang
    fetchCategories(); // Fetch categories khi component mount
  }, [currentPage]);

  // Xử lý chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-6 bg-white">
      {/* Thanh tìm kiếm */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Find recipe..."
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
        />
      </div>

      {/* Hiển thị category buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition text-sm"
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Danh sách công thức */}
      <div className="grid grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="border border-gray-300 rounded-lg shadow-md overflow-hidden">
            <img
              src={recipe.image || "https://via.placeholder.com/300"}
              alt={recipe.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-md">
                {recipe.category}
              </span>
              <h3 className="font-bold text-lg mt-2">{recipe.title}</h3>
              <p className="text-sm text-gray-600">
                Serving: {recipe.servings} | Cooking time: {recipe.cookingTime} min
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <div className="flex justify-center items-center mt-8">
        <button
          className={`px-4 py-2 mx-1 rounded-md ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            className={`px-4 py-2 mx-1 rounded-md ${
              page === currentPage ? "bg-blue-700 text-white" : "bg-gray-200"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className={`px-4 py-2 mx-1 rounded-md ${
            currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecipeDisplay;
