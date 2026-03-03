import React from 'react';

const SortControls = ({ sortBy, onSortChange }) => {
  const buttons = [
    { value: 'featured', label: 'Destacadas' },
    { value: 'newest', label: 'Más recientes' },
    { value: 'oldest', label: 'Más antiguas' },
    { value: 'popular', label: 'Más populares' }
  ];

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center mb-8">
      {buttons.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onSortChange(value)}
          className={`px-6 py-2 rounded-md transition-colors ${
            sortBy === value
              ? 'bg-primary-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default SortControls;