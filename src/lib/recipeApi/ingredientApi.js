import axios from "axios";

// Khởi tạo axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Hàm fetch toàn bộ ingredients từ API
export const getAllIngredients = async () => {
  let allIngredients = [];
  let page = 1;
  let totalPages = 1;

  try {
    do {
      const response = await api.get(`/api/Ingredients/page/${page}`);
      const { items, totalPages: fetchedTotalPages } = response.data;
      allIngredients = [...allIngredients, ...items];
      totalPages = fetchedTotalPages;
      page++;
    } while (page <= totalPages);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }

  return allIngredients;
};

export default api;
