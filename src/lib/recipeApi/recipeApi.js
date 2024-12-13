import api from "../apiService";

export const fetchAllSearchResults = async (category, ingredients, title) => {
  try {
    let allRecipes = [];
    let currentPage = 1;
    let totalPages = 1;

    do {
      let query = `/api/Search/page/${currentPage}`;

      if (category) {
        query += `?category=${encodeURIComponent(category)}`;
      }

      if (ingredients.length > 0) {
        query +=
          (category ? `&` : `?`) +
          ingredients.map((id) => `ingredientsId=${id}`).join("&");
      }

      if (title) {
        query +=
          (category || ingredients.length > 0 ? `&` : `?`) +
          `title=${encodeURIComponent(title)}`;
      }

      const response = await api.get(query);
      allRecipes = [...allRecipes, ...response.data.items];
      totalPages = response.data.totalPages;
      currentPage += 1;
    } while (currentPage <= totalPages);

    return allRecipes;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};




export const getRecipesByPage = async (page) => {
  try {
    const response = await api.get(`/api/Recipes/page/${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes by page:", error);
    throw error;
  }
};

export const searchRecipesByTitle = async (title) => {
  try {
    const allRecipes = [];
    let page = 1;
    let totalPages = 1;

    do {
      const response = await api.get(`/api/Search/page/${page}?title=${encodeURIComponent(title)}`);
      const data = response.data;
      allRecipes.push(...data.items);
      totalPages = data.totalPages;
      page++;
    } while (page <= totalPages);

    return allRecipes;
  } catch (error) {
    console.error("Error fetching recipes by title:", error);
    throw error;
  }
};
