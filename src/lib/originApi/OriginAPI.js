import api from '../apiService';

// Get Origins by Page
export const getOriginsByPage = async (page) => {
  const response = await api.get(`/api/Origins/page/${page}`);
  return response.data;
};

// Add Origin
export const addOrigin = async (origin) => {
  const response = await api.post(`/api/Origins`, origin);
  return response.data;
};

// Get Origin by ID
export const getOriginById = async (id) => {
  const response = await api.get(`/api/Origins/${id}`);
  return response.data;
};

// Update Origin
export const updateOrigin = async (id, updatedOrigin) => {
  const response = await api.put(`/api/Origins/${id}`, updatedOrigin);
  return response.data;
};

// Delete Origin
export const deleteOrigin = async (id) => {
  const response = await api.delete(`/api/Origins/${id}`);
  return response.data;
};
