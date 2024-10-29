import React from 'react';

type CategoryFilterProps = {
  category: string;
  setCategory: (category: string) => void;
};

export function CategoryFilter({ category, setCategory }: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <label htmlFor="category" className="text-gray-700 font-medium mr-4">
        Filter by Category:
      </label>
      <select
        id="category"
        className="mt-1 block w-full md:w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">All</option>
        <option value="living-room">Living Room</option>
        <option value="dining">Dining Room</option>
        <option value="bedroom">Bedroom</option>
        <option value="storage">Storage</option>
      </select>
    </div>
  );
}