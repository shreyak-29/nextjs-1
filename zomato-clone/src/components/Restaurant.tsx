import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Adjust based on your backend configuration

// Define the type for a restaurant
type RestaurantType = {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  cuisine: string;
  location: string;
  _id?: string; // Optional if using MongoDB's `_id`
};

const Restaurant = () => {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch restaurants from API
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get<RestaurantType[]>('/api/restaurants');
      
      setRestaurants(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch restaurants');
      setLoading(false);
    }
  };

  const deleteRestaurant = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      try {
        await axios.delete(`/api/restaurants/${id}`);
        // Fetch updated list
        fetchRestaurants();
      } catch (err) {
        setError('Failed to delete restaurant');
      }
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12 pt-16">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Discover Great Restaurants
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore our curated selection of the finest dining establishments across the city
        </p>
        <div className="flex justify-center pb-10">
          <button
            onClick={() => router.push('/add-restaurant')}
            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600"
          >
            Add a New Restaurant
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative h-48 sm:h-64 overflow-hidden bg-gray-200">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full shadow-md">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold">{restaurant.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-red-500 transition-colors duration-300">
                    {restaurant.name}
                  </h2>
                  <span className="px-3 py-1 text-xs font-medium bg-red-50 text-red-500 rounded-full whitespace-nowrap">
                    {restaurant.cuisine}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2 h-12">
                  {restaurant.description}
                </p>

                <div className="flex items-center text-gray-500 mb-4">
                  <svg
                    className="w-4 h-4 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="truncate">{restaurant.location}</span>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => router.push(`/restaurant/${restaurant.id}`)}
                    className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => router.push(`/edit/${restaurant.id}`)}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteRestaurant(restaurant._id!)}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600"
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
  );
};

export default Restaurant;
