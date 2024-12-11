import api from "../apiService";

// Hàm lấy danh sách công thức theo trang
export const getRecipesByPage = async (page) => {
  try {
    const response = await api.get(`/api/Recipes/page/${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};
