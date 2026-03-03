import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="mb-10">
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            selectedCategory === 'all' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => onSelectCategory('all')}
        >
          Todas las Fotos
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedCategory === category.id 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;