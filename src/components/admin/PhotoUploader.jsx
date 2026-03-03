import React, { useState } from 'react';
import { supabase } from '../../supabase/client';

const PhotoUploader = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [nsfw, setNsfw] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const resetForm = () => {
    setFile(null);
    setTitle('');
    setDescription('');
    setNsfw(false);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setMessage({ type: 'error', text: 'Please select an image to upload' });
      return;
    }
    
    try {
      setUploading(true);
      setMessage(null);
      
      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `photos/${fileName}`;
      
      // Upload file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('photos')
        .getPublicUrl(filePath);
        
      // Save metadata to the database
      const { error: dbError } = await supabase
        .from('fotofolio_fotos')
        .insert([
          {
            title,
            description,
            url: publicUrl,
            nsfw
          }
        ]);
        
      if (dbError) throw dbError;
      
      setMessage({ type: 'success', text: 'Photo uploaded successfully!' });
      resetForm();
      
    } catch (error) {
      console.error('Error uploading photo:', error);
      setMessage({ type: 'error', text: `Upload failed: ${error.message}` });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-xl font-semibold mb-6 text-white">Upload New Photo</h2>
      
      {message && (
        <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}
      
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={nsfw}
                  onChange={(e) => setNsfw(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-500 rounded"
                />
                <span className="ml-2 text-sm text-gray-300">NSFW Content</span>
              </label>
            </div>
          </div>
          
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Photo
              </label>
              <div className="border-2 border-dashed border-gray-500 bg-gray-700 rounded-md p-6 flex flex-col items-center">
                {preview ? (
                  <div className="mb-4 relative">
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="max-h-48 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => { setFile(null); setPreview(null); }}
                      className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-300 mb-2">
                    Click to upload or drag and drop
                  </div>
                )}
                
                <div className="mt-2 flex text-sm text-gray-300">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-gray-600 px-2 py-1 rounded-md font-medium text-primary-400 hover:text-primary-300 focus-within:outline-none"
                  >
                    <span>{preview ? 'Change photo' : 'Upload a photo'}</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={resetForm}
            disabled={uploading}
            className="px-4 py-2 bg-gray-600 text-gray-300 rounded-md mr-2 hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={uploading}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload Photo'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhotoUploader;