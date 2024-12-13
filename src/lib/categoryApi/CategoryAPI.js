// CategoryAPI.js
import api from '../apiService';

// Get Categories by Page
export const getCategoriesByPage = async (page) => {
  const response = await api.get(`/api/Categories/page/${page}`);
  return response.data;
};

// Add Category
export const addCategory = async (category) => {
  const response = await api.post(`/api/Categories`, category);
  return response.data;
};

// Get Category by ID
export const getCategoryById = async (id) => {
  const response = await api.get(`/api/Categories/${id}`);
  return response.data;
};

// Update Category
export const updateCategory = async (id, updatedCategory) => {
  const response = await api.put(`/api/Categories/${id}`, updatedCategory);
  return response.data;
};

// Delete Category
export const deleteCategory = async (id) => {
  const response = await api.delete(`/api/Categories/${id}`);
  return response.data;
};
