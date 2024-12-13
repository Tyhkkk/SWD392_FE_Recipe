import { useEffect, useState } from 'react';
import {
  getCategoriesByPage,
  addCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../../lib/categoryApi/CategoryAPI';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '' });
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

  const fetchCategories = async (page) => {
    setLoading(true);
    try {
      const data = await getCategoriesByPage(page);
      setCategories(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error('Failed to fetch categories.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm({ ...categoryForm, [name]: value });
  };

  const handleAddOrUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateCategory(selectedCategory.id, categoryForm);
        toast.success('Category updated successfully!');
      } else {
        await addCategory(categoryForm);
        toast.success('Category added successfully!');
      }
      setModalIsOpen(false);
      fetchCategories(currentPage);
    } catch (error) {
      toast.error('Failed to save category.');
    }
  };

  const handleEditCategory = async (id) => {
    try {
      const data = await getCategoryById(id);
      setCategoryForm(data);
      setSelectedCategory(data);
      setIsEditMode(true);
      setModalIsOpen(true);
    } catch (error) {
      toast.error('Failed to fetch category details.');
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(categoryToDelete.id);
      toast.success('Category deleted successfully!');
      setDeleteModalIsOpen(false);
      fetchCategories(currentPage);
    } catch (error) {
      toast.error('Failed to delete category.');
    }
  };

  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setCategoryToDelete(null);
    setDeleteModalIsOpen(false);
  };

  const openModal = () => {
    setIsEditMode(false);
    setCategoryForm({ name: '', description: '' });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Category Management</h1>

      <button
        onClick={openModal}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Category
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="border border-gray-300 px-4 py-2">{category.id}</td>
                <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                <td className="border border-gray-300 px-4 py-2">{category.description}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEditCategory(category.id)}
                    className="mr-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => openDeleteModal(category)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 mx-1 ${
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-black'
            } rounded-md hover:bg-gray-300`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Add/Update Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Category Modal"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-lg font-bold mb-4">
          {isEditMode ? 'Update Category' : 'Add Category'}
        </h2>
        <form onSubmit={handleAddOrUpdateCategory}>
          <label className="block mb-2 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={categoryForm.name}
            onChange={handleInputChange}
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
          />
          <label className="block mb-2 text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={categoryForm.description}
            onChange={handleInputChange}
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
          ></textarea>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Confirmation"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-lg font-bold mb-4">Delete Category</h2>
        <p>Are you sure you want to delete this category?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleDeleteCategory}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={closeDeleteModal}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CategoryPage;
