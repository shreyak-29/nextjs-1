// EditRestaurant Component
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {useCookies} from 'react-cookie';

interface RestaurantForm {
  name: string;
  location: string;
  cuisine: string;
  description: string;
  image?: string;
  rating?: number;
}

const EditRestaurant = () => {
  const [restaurant, setRestaurant] = useState<RestaurantForm>({
    name: '',
    location: '',
    cuisine: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const { id } = router.query;

  const [cookies] = useCookies(['token']);

  useEffect(() => {
    if (id) {
      const fetchRestaurant = async () => {
        try {
          const token = cookies.token;
          if (!token) throw new Error('Authentication token missing');
          const response = await axios.get(`/api/restaurants/${id}`, {
            headers: { 'x-auth-token': token },
          });
          setRestaurant(response.data);
        } catch (err) {
          setError('Error fetching restaurant details');
        }
      };
      fetchRestaurant();
    }
  }, [id, cookies.token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = cookies.token;
      if (!token) throw new Error('Authentication token missing');
      await axios.put(`/api/restaurants/${id}`, restaurant , {
        headers: { 'x-auth-token': token },
      });
      router.push(`/restaurant`);
    } catch (err) {
      setError('Error updating restaurant details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Edit Restaurant
        </h1>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {['name', 'description', 'image', 'rating', 'cuisine', 'location'].map((field) => (
              <div key={field}>
                <label 
                  htmlFor={field} 
                  className="block text-sm font-medium text-gray-700 mb-2 capitalize"
                >
                  {field}
                </label>
                {field === 'description' ? (
                  <textarea
                    id={field}
                    name={field}
                    value={restaurant[field as keyof RestaurantForm]}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                ) : (
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={restaurant[field as keyof RestaurantForm]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-300"
            >
              {loading ? 'Updating...' : 'Update Restaurant'}
            </button>

            <button
              type="button"
              onClick={() => router.push('/restaurant')}
              className="w-full mt-4 py-3 px-4 bg-gray-500 text-white font-semibold rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 transition duration-300"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditRestaurant;