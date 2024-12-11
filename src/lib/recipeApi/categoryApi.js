import api from "../apiService";

export const getAllCategories = async () => {
  let allCategories = [];
  let page = 1;
  let totalPages = 1;

  try {
    do {
      const response = await api.get(`/api/Categories/page/${page}`);
      const { items, totalPages: fetchedTotalPages } = response.data;
      allCategories = [...allCategories, ...items];
      totalPages = fetchedTotalPages;
      page++;
    } while (page <= totalPages);
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }

  return allCategories;
};
