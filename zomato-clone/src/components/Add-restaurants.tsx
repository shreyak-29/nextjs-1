import { useState } from 'react';
import { useRouter } from 'next/router';

const AddRestaurant = () => {
  const router = useRouter();

  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    description: '',
    image: '',
    rating: '',
    cuisine: '',
    location: '',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form inputs
    if (!newRestaurant.name || !newRestaurant.description || !newRestaurant.image) {
      alert('Please fill in all required fields.');
      return;
    }

    // Retrieve existing restaurants from localStorage
    const existingRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');

    // Add new restaurant to the array with a unique ID
    const updatedRestaurants = [
      ...existingRestaurants,
      { ...newRestaurant, id: existingRestaurants.length + 1 },
    ];

    // Save the updated list back to localStorage
    localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));

    // Reset the form after submission
    setNewRestaurant({
      name: '',
      description: '',
      image: '',
      rating: '',
      cuisine: '',
      location: '',
    });

    // Redirect to the restaurants list page (homepage)
    router.push('/restaurant');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Add a New Restaurant
        </h1>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 rounded"
            value={newRestaurant.name}
            onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="w-full border p-2 rounded"
            value={newRestaurant.description}
            onChange={(e) => setNewRestaurant({ ...newRestaurant, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            className="w-full border p-2 rounded"
            value={newRestaurant.image}
            onChange={(e) => setNewRestaurant({ ...newRestaurant, image: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Rating (e.g., 4.5)"
            className="w-full border p-2 rounded"
            min="0"
            max="5"
            step="0.1"
            value={newRestaurant.rating}
            onChange={(e) => setNewRestaurant({ ...newRestaurant, rating: e.target.value })}
          />
          <input
            type="text"
            placeholder="Cuisine"
            className="w-full border p-2 rounded"
            value={newRestaurant.cuisine}
            onChange={(e) => setNewRestaurant({ ...newRestaurant, cuisine: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full border p-2 rounded"
            value={newRestaurant.location}
            onChange={(e) => setNewRestaurant({ ...newRestaurant, location: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Add Restaurant
          </button>
        </form>
        <button
          onClick={() => router.push('/')}
          className="w-full mt-4 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddRestaurant;
