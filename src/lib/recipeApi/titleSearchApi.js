import api from "../apiService";

export const fetchRecipesByTitle = async (title) => {
  try {
    let allRecipes = [];
    let currentPage = 1;
    let totalPages = 1;

    do {
      const response = await api.get(`/api/Search/page/${currentPage}?title=${encodeURIComponent(title)}`);
      allRecipes = [...allRecipes, ...response.data.items];
      totalPages = response.data.totalPages;
      currentPage += 1;
    } while (currentPage <= totalPages);

    return allRecipes;
  } catch (error) {
    console.error("Error fetching recipes by title:", error);
    throw error;
  }
};
