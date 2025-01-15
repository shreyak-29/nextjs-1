import React, { useState } from 'react';
import { useRouter } from 'next/router'; 
import axios from 'axios';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  isEditing?: boolean;
}

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    { id: '1', name: 'Pizza Palace', cuisine: 'Italian', rating: 4.5 },
    { id: '2', name: 'Sushi World', cuisine: 'Japanese', rating: 4.8 },
    { id: '3', name: 'Burger Hub', cuisine: 'American', rating: 4.2 },
  ]);
  
  const [newRestaurant, setNewRestaurant] = useState('');
  const [newCuisine, setNewCuisine] = useState('');
  const [filterCuisine, setFilterCuisine] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'rating'>('name');

  const handleAddRestaurant = () => {
    if (newRestaurant.trim() === '') return;
    
    const restaurant: Restaurant = {
      id: Date.now().toString(),
      name: newRestaurant.trim(),
      cuisine: newCuisine.trim() || 'Not specified',
      rating: 4.0,
    };
    
    setRestaurants(prev => [...prev, restaurant]);
    setNewRestaurant('');
    setNewCuisine('');
  };

  const handleDelete = (id: string) => {
    setRestaurants(prev => prev.filter(r => r.id !== id));
  };

  const handleEdit = (id: string) => {
    setRestaurants(prev => prev.map(r => 
      r.id === id ? { ...r, isEditing: true } : r
    ));
  };

  const handleSave = (id: string, newName: string) => {
    setRestaurants(prev => prev.map(r => 
      r.id === id ? { ...r, name: newName, isEditing: false } : r
    ));
  };

  const handleRating = (id: string, newRating: number) => {
    setRestaurants(prev => prev.map(r => 
      r.id === id ? { ...r, rating: newRating } : r
    ));
  };

  const filteredAndSortedRestaurants = restaurants
    .filter(r => !filterCuisine || r.cuisine.toLowerCase().includes(filterCuisine.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return b.rating - a.rating;
    });

  return (
    <div className="p-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Restaurant
        </h1>

        {/* Add Restaurant Form */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Restaurant name"
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              value={newRestaurant}
              onChange={(e) => setNewRestaurant(e.target.value)}
            />
            <input
              type="text"
              placeholder="Cuisine type"
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              value={newCuisine}
              onChange={(e) => setNewCuisine(e.target.value)}
            />
          </div>
          <button
            onClick={handleAddRestaurant}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg
              hover:bg-red-600 transform hover:scale-105 transition-all duration-200"
          >
            Add Restaurant
          </button>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Filter by cuisine..."
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              value={filterCuisine}
              onChange={(e) => setFilterCuisine(e.target.value)}
            />
            <select
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'rating')}
            >
              <option value="name">Sort by Name</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>

        {/* Restaurant List */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="space-y-4">
            {filteredAndSortedRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="border rounded-lg p-4 hover:shadow-md transition-all duration-200
                  hover:border-red-200"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    {restaurant.isEditing ? (
                      <input
                        type="text"
                        defaultValue={restaurant.name}
                        className="px-2 py-1 border rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                        onBlur={(e) => handleSave(restaurant.id, e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                    )}
                    <p className="text-gray-600 text-sm">{restaurant.cuisine}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRating(restaurant.id, star)}
                          className={`text-xl ${
                            star <= restaurant.rating
                              ? 'text-red-400'
                              : 'text-gray-300'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => handleEdit(restaurant.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(restaurant.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;