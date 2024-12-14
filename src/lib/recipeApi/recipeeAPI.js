import api from "../apiService";

// Get recipes by page
export const getRecipesByPage = async (page) => {
  const response = await api.get(`/api/Recipes/page/${page}`);
  return response.data;
};

// Get recipe by ID
export const getRecipeById = async (id) => {
  const response = await api.get(`/api/Recipes/${id}`);
  return response.data;
};

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/api/ImageTest", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  };
  
  // Create Recipe
  export const createRecipe = async (recipeData) => {
    const response = await api.post("/api/Recipes", recipeData);
    return response.data;
  };

  export const updateRecipe = async (id, recipeData) => {
    const response = await api.put(`/api/Recipes/${id}`, recipeData);
    return response.data;
  };

  export const deleteRecipe = async (id) => {
    try {
      const response = await api.delete(`/api/Recipes/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting recipe:", error);
      throw error;
    }
  };