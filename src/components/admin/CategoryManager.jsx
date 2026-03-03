import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/client';
import LoadingSpinner from '../ui/LoadingSpinner';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
        
      if (error) throw error;
      
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // For demo, add dummy categories
      setCategories([
        { id: 1, name: 'Landscape' },
        { id: 2, name: 'Portrait' },
        { id: 3, name: 'Wedding' },
        { id: 4, name: 'Wildlife' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();
    
    if (!newCategory.trim()) return;
    
    try {
      setMessage(null);
      
      const { data, error } = await supabase
        .from('categories')
        .insert([{ name: newCategory.trim() }])
        .select();
        
      if (error) throw error;
      
      // Update state with the new category
      setCategories([...categories, data[0]]);
      setNewCategory('');
      setMessage({ type: 'success', text: 'Category added successfully' });
    } catch (error) {
      console.error('Error adding category:', error);
      setMessage({ type: 'error', text: 'Failed to add category: ' + error.message });
    }
  };

  const startEditing = (category) => {
    setEditingId(category.id);
    setEditName(category.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
  };

  const updateCategory = async (id) => {
    if (!editName.trim()) return;
    
    try {
      setMessage(null);
      
      const { error } = await supabase
        .from('categories')
        .update({ name: editName.trim() })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update state
      setCategories(categories.map(category => 
        category.id === id ? { ...category, name: editName.trim() } : category
      ));
      
      setMessage({ type: 'success', text: 'Category updated successfully' });
      cancelEditing();
    } catch (error) {
      console.error('Error updating category:', error);
      setMessage({ type: 'error', text: 'Failed to update category: ' + error.message });
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category? Photos in this category will become uncategorized.')) {
      return;
    }
    
    try {
      setMessage(null);
      
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Remove from state
      setCategories(categories.filter(category => category.id !== id));
      
      setMessage({ type: 'success', text: 'Category deleted successfully' });
    } catch (error) {
      console.error('Error deleting category:', error);
      setMessage({ type: 'error', text: 'Failed to delete category: ' + error.message });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="text-white">
      <h2 className="text-xl font-semibold mb-6 text-white">Manage Categories</h2>
      
      {message && (
        <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}
      
      <div className="bg-gray-700 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-medium mb-4 text-white">Add New Category</h3>
        <form onSubmit={addCategory} className="flex items-center">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter category name"
            className="flex-grow px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 transition-colors"
          >
            Add
          </button>
        </form>
      </div>
      
      {categories.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No categories found. Add a category to get started.
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
          <ul className="divide-y divide-gray-600">
            {categories.map((category) => (
              <li key={category.id} className="p-4 odd:bg-gray-800 even:bg-gray-750 hover:bg-gray-700">
                {editingId === category.id ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-grow px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      onClick={() => updateCategory(category.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded-md mr-2 hover:bg-green-700 transition-colors text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="px-3 py-1 bg-gray-600 text-gray-300 rounded-md hover:bg-gray-500 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-white">{category.name}</span>
                    <div>
                      <button
                        onClick={() => startEditing(category)}
                        className="text-primary-400 hover:text-primary-300 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;