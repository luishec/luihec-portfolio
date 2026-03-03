import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import LoadingSpinner from '../ui/LoadingSpinner';

const PhotoManager = () => {
  const photos = useQuery(api.photos.listAll);
  const updatePhoto = useMutation(api.photos.update);
  const removePhoto = useMutation(api.photos.remove);
  const loading = photos === undefined;

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    nsfw: false
  });
  const [message, setMessage] = useState(null);

  const handleEditClick = (photo) => {
    setSelectedPhoto(photo);
    setEditData({
      title: photo.title || '',
      description: photo.description || '',
      nsfw: photo.nsfw || false
    });
    setIsEditing(true);
  };

  const handleDeleteClick = (photo) => {
    if (window.confirm('Are you sure you want to delete this photo? This action cannot be undone.')) {
      deletePhoto(photo._id);
    }
  };

  const deletePhoto = async (id) => {
    try {
      setMessage(null);
      await removePhoto({ id });
      setMessage({ type: 'success', text: 'Photo deleted successfully' });
    } catch (error) {
      console.error('Error deleting photo:', error);
      setMessage({ type: 'error', text: 'Failed to delete photo: ' + error.message });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData({
      ...editData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage(null);
      await updatePhoto({
        id: selectedPhoto._id,
        title: editData.title,
        description: editData.description,
        nsfw: editData.nsfw
      });
      setMessage({ type: 'success', text: 'Photo updated successfully' });
      setIsEditing(false);
      setSelectedPhoto(null);
    } catch (error) {
      console.error('Error updating photo:', error);
      setMessage({ type: 'error', text: 'Failed to update photo: ' + error.message });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="text-white">
      <h2 className="text-xl font-semibold mb-6 text-white">Manage Photos</h2>

      {message && (
        <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}

      {isEditing && selectedPhoto ? (
        <div className="bg-gray-700 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-4 text-white">Edit Photo</h3>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                    Photo Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={editData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={editData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="nsfw"
                      checked={editData.nsfw}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-500 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-300">NSFW Content</span>
                  </label>
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Preview
                  </label>
                  <div className="border border-gray-500 rounded-md p-4 bg-gray-600">
                    <img
                      src={selectedPhoto.url}
                      alt={selectedPhoto.title}
                      className="max-h-48 mx-auto rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => { setIsEditing(false); setSelectedPhoto(null); }}
                className="px-4 py-2 bg-gray-600 text-gray-300 rounded-md mr-2 hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {photos.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No photos found. Upload some photos to get started.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Photo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Views
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  NSFW
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-600">
              {photos.map((photo) => (
                <tr key={photo._id} className="odd:bg-gray-800 even:bg-gray-750 hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {photo.title || 'Untitled'}
                    </div>
                    <div className="text-sm text-gray-400 max-w-xs truncate">
                      {photo.description || 'No description'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white flex items-center">
                      <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                      </svg>
                      {photo.views || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {photo.nsfw ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Yes
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(photo)}
                      className="text-primary-400 hover:text-primary-300 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(photo)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PhotoManager;
