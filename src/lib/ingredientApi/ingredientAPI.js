import api from "../apiService";

// Get ingredients by page
export const getIngredientsByPage = async (pageNumber) => {
  try {
    const response = await api.get(`/api/Ingredients/page/${pageNumber}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ingredients by page:", error);
    throw error;
  }
};

// Get ingredient by ID
export const getIngredientById = async (id) => {
  try {
    const response = await api.get(`/api/Ingredients/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ingredient by ID:", error);
    throw error;
  }
};

// Add a new ingredient
export const addIngredient = async (ingredientData) => {
  try {
    const response = await api.post(`/api/Ingredients`, ingredientData);
    return response.data;
  } catch (error) {
    console.error("Error adding ingredient:", error);
    throw error;
  }
};

// Update an ingredient by ID
export const updateIngredient = async (id, ingredientData) => {
  try {
    const response = await api.put(`/api/Ingredients/${id}`, ingredientData);
    return response.data;
  } catch (error) {
    console.error("Error updating ingredient:", error);
    throw error;
  }
};

// Delete an ingredient by ID
export const deleteIngredient = async (id) => {
  try {
    const response = await api.delete(`/api/Ingredients/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting ingredient:", error);
    throw error;
  }
};
