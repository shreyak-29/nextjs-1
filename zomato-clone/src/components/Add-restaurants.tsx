// AddRestaurant Component
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

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
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token missing');

      const restaurantData = {
        ...newRestaurant,
        rating: parseFloat(newRestaurant.rating) || 0,
      };

      await axios.post('/api/restaurants', restaurantData , {
        headers: { 'x-auth-token': token },
      });

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
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || 'Failed to add restaurant.'
        : 'An unexpected error occurred.';
      
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Add a New Restaurant
        </h1>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {['name', 'description', 'image', 'rating', 'cuisine', 'location'].map((field) => {
            const inputProps = {
              placeholder: field.charAt(0).toUpperCase() + field.slice(1),
              type: field === 'image' ? 'url' 
                   : field === 'rating' ? 'number' 
                   : 'text',
              min: field === 'rating' ? '0' : undefined,
              max: field === 'rating' ? '5' : undefined,
              step: field === 'rating' ? '0.1' : undefined,
              rows: field === 'description' ? 3 : undefined,
            };

            return (
              <div key={field}>
                {field === 'description' ? (
                  <textarea
                    {...inputProps}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newRestaurant[field as keyof RestaurantForm]}
                    onChange={(e) => setNewRestaurant({ ...newRestaurant, [field]: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                ) : (
                  <input
                    {...inputProps}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newRestaurant[field as keyof RestaurantForm]}
                    onChange={(e) => setNewRestaurant({ ...newRestaurant, [field]: e.target.value })}
                    required
                    disabled={isSubmitting}
                  />
                )}
              </div>
            );
          })}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-300"
          >
            {isSubmitting ? 'Adding Restaurant...' : 'Add Restaurant'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/restaurant')}
            disabled={isSubmitting}
            className="w-full mt-4 py-3 px-4 bg-gray-500 text-white font-semibold rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 transition duration-300"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurant;