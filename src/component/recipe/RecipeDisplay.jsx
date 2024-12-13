import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Add navigation for recipe details
import {
  getRecipesByPage,
  fetchAllSearchResults,
  searchRecipesByTitle,
} from "../../lib/recipeApi/recipeApi";
import { getAllCategories } from "../../lib/recipeApi/categoryApi";
import { updateFilters } from "../../store/filtersSlice";
import Loading from "../loading";

const RecipeDisplay = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState(""); // State for title search

  const filters = useSelector((state) => state.filters); // Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Navigation for recipe details

  // Paginate recipes
  const paginateRecipes = (allRecipes, itemsPerPage) => {
    const totalPages = Math.ceil(allRecipes.length / itemsPerPage);
    const paginatedRecipes = Array.from({ length: totalPages }, (_, index) => {
      const start = index * itemsPerPage;
      const end = start + itemsPerPage;
      return allRecipes.slice(start, end);
    });
    return { paginatedRecipes, totalPages };
  };

  // Fetch recipes
  const fetchRecipes = async (page) => {
    setIsLoading(true);
    try {
      let allRecipes = [];
      let paginatedData = null;

      if (searchTitle.trim()) {
        // Search by title
        allRecipes = await searchRecipesByTitle(searchTitle);
        paginatedData = paginateRecipes(allRecipes, 10);
      } else if (filters.ingredients.length > 0 || filters.category) {
        // Filtered recipes
        allRecipes = await fetchAllSearchResults(filters.category, filters.ingredients);
        paginatedData = paginateRecipes(allRecipes, 10);
      } else {
        // Default API call
        const data = await getRecipesByPage(page);
        allRecipes = data.items;
        paginatedData = { paginatedRecipes: [data.items], totalPages: data.totalPages };
      }

      setRecipes(paginatedData.paginatedRecipes[page - 1] || []);
      setTotalPages(paginatedData.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const allCategories = await getAllCategories();
      setCategories(allCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    dispatch(
      updateFilters({
        category: filters.category === category ? null : category, // Toggle category
      })
    );
    setCurrentPage(1); // Reset to the first page
  };

  // Handle search bar input
  const handleSearchChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchRecipes(1); // Fetch based on title
  };

  // Handle recipe card click
  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`); // Navigate to RecipeDetail
  };

  // Fetch recipes and categories on load or filter changes
  useEffect(() => {
    fetchRecipes(currentPage);
    fetchCategories();
  }, [currentPage, filters]);

  return (
    <div className="p-6 bg-white">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-6">
        <input
          type="text"
          value={searchTitle}
          onChange={handleSearchChange}
          placeholder="Find recipe by title..."
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
        />
      </form>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            className={`px-3 py-1 rounded-md text-sm font-medium border ${
              filters.category === category.name
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            } transition`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Recipes */}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-3 gap-6">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="border border-gray-300 rounded-lg shadow-md overflow-hidden cursor-pointer"
                  onClick={() => handleRecipeClick(recipe.id)} // Navigate on click
                >
                  <img
                    src={recipe.image || "https://via.placeholder.com/300"}
                    alt={recipe.title}
                    className="w-full h-72 object-cover"
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
              ))
            ) : (
              <p className="text-center text-gray-500 h-64 mt-24">No recipes found.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8">
            <button
              className={`px-4 py-2 mx-1 rounded-md ${
                currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
              }`}
              onClick={() => setCurrentPage(currentPage - 1)}
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
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className={`px-4 py-2 mx-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }`}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDisplay;
