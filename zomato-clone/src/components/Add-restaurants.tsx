import { useState } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';


interface RestaurantForm {
  name: string;
  description: string;
  image: string;
  rating: string;
  cuisine: string;
  location: string;
}

const AddRestaurant = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [newRestaurant, setNewRestaurant] = useState<RestaurantForm>({
    name: '',
    description: '',
    image: '',
    rating: '',
    cuisine: '',
    location: '',
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validate form inputs
    if (!newRestaurant.name || !newRestaurant.description || !newRestaurant.image) {
      setError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Convert rating to number for API
      const restaurantData = {
        ...newRestaurant,
        rating: parseFloat(newRestaurant.rating) || 0,
      };

      // Send data to API
      await axios.post('/api/restaurants', restaurantData);

      // Reset form and redirect on success
      setNewRestaurant({
        name: '',
        description: '',
        image: '',
        rating: '',
        cuisine: '',
        location: '',
      });

      router.push('/restaurant');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Handle Axios-specific error
        setError(err.response?.data?.message || 'Failed to add restaurant. Please try again.');
      } else if (err instanceof Error) {
        // Handle generic JavaScript errors
        setError(err.message);
      } else {
        // Handle unexpected error types
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Add a New Restaurant
        </h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={newRestaurant.name}
              onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <textarea
              placeholder="Description"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={newRestaurant.description}
              onChange={(e) => setNewRestaurant({ ...newRestaurant, description: e.target.value })}
              required
              disabled={isSubmitting}
              rows={3}
            />
          </div>

          <div>
            <input
              type="url"
              placeholder="Image URL"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={newRestaurant.image}
              onChange={(e) => setNewRestaurant({ ...newRestaurant, image: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Rating (e.g., 4.5)"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
              min="0"
              max="5"
              step="0.1"
              value={newRestaurant.rating}
              onChange={(e) => setNewRestaurant({ ...newRestaurant, rating: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Cuisine"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={newRestaurant.cuisine}
              onChange={(e) => setNewRestaurant({ ...newRestaurant, cuisine: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Location"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={newRestaurant.location}
              onChange={(e) => setNewRestaurant({ ...newRestaurant, location: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Restaurant...' : 'Add Restaurant'}
          </button>
        </form>

        <button
          onClick={() => router.push('/restaurant')}
          className="w-full mt-4 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddRestaurant;