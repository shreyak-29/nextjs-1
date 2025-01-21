import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';

const Restaurant = () => {
  const router = useRouter();

  // Hardcoded data for restaurants
  const hardcodedRestaurantData = [
    {
      id: 1,
      name: 'The Italian Bistro',
      description: 'Authentic Italian food with a modern twist.',
      image:
        'https://imgs.search.brave.com/XdkiI9cZxShFbCI7_hp6-2bhE07bqMSMwRWTahrxwZQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/Ni8wNi8yMi8zNy9p/dGFsaWFuLWN1aXNp/bmUtMjM3ODcyOV82/NDAuanBn',
      rating: 4.5,
      cuisine: 'Italian',
      location: 'Bandra',
    },
    {
      id: 2,
      name: 'Sushi Zen',
      description: 'Fresh sushi and Japanese dishes served with flair.',
      image:
        'https://imgs.search.brave.com/lnxoHgdGT6cL062WP7N0F39ftmV82QwaXbB8IRH_sS0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8w/OC8wOS8xOC8zMi9z/dXNoaS1yb2xsLWlt/YWdlcy00Mzk1NTk4/XzY0MC5qcGc',
      rating: 4.7,
      cuisine: 'Japanese',
      location: 'Andheri',
    },
    {
      id: 3,
      name: 'Indian Delights',
      description: 'A fun, vibrant place for Indian food.',
      image:
        'https://imgs.search.brave.com/03ysq-K83FfcaqBgWKCAYCSmFdYGkifGJXFaBsnDut8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzYwLzg4Lzg1/LzM2MF9GXzg2MDg4/ODU2M19UbnJITGVV/V2VDZFpjVElESXpq/dE8yOVp4NkxPUFJS/bC5qcGc',
      rating: 4.3,
      cuisine: 'Mexican',
      location: 'Parel',
    },
    {
      id: 4,
      name: 'Burger Haven',
      description: 'The best gourmet burgers in town.',
      image:
        'https://imgs.search.brave.com/-yLdJ0WJr848mwrkTsAdVT41WmcU47UVOHCCk_ZmC0o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9zdHJlZXQtZm9v/ZC1mcmVzaC1idXJn/ZXJzLXdpdGgtYm94/LWJlZXItd29vZGVu/LXRhYmxlXzIyMDky/NS00ODA0LmpwZz9z/ZW10PWFpc19oeWJy/aWQ',
      rating: 4.1,
      cuisine: 'American',
      location: 'Borivali',
    },
    {
      id: 5,
      name: 'Pizza Palace',
      description: 'Pizza for every mood and occasion.',
      image:
        'https://imgs.search.brave.com/-EwIfaB4HT5urBbmBoN3-52-6RDE-LfD9BCtjChXBJ0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQw/NjQ1MTA4NC9waG90/by9sZWZ0b3Zlci1z/bGljZXMtb2YtcGVw/cGVyb25pLXBpenph/LWF0LXJlc3RhdXJh/bnQuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVp4LVB2ZTJD/ZEZETTMzS0hpSUhR/S0VGWnVNVjhHMjcz/XzBCTENVOUQ2VnM9',
      rating: 3.9,
      cuisine: 'Italian',
      location: 'Kandivali',
    },
    {
      id: 6,
      name: 'Biryani House',
      description: 'The best biryani in town.',
      image:
        'https://imgs.search.brave.com/P8jeDn_SJRCJvQUTLNQxHC-Ul-mYL_bO1woGjwbX-uI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI0/NDc2OTIxNy9waG90/by9jaGlja2VuLWR1/bS1iaXJ5YW5pLWlu/LXRvcm9udG8tb250/YXJpby1jYW5hZGEt/b24tbm92ZW1iZXIt/MTItMjAyMi5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9ZDBr/X0lCXzFKcGE4YVFq/ak5BX2dNbkZQMUZ2/TUhmSHByalRaUVFw/NHplST0',
      rating: 4.2,
      cuisine: 'Indian',
      location: 'Malad',
    },
  ];

  // State to store combined data (hardcoded + localStorage data)
  const [restaurants, setRestaurants] = useState(hardcodedRestaurantData);

  // Fetch restaurants from localStorage on component mount
  useEffect(() => {
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    setRestaurants((prevRestaurants) => [
      ...prevRestaurants,
      ...storedRestaurants, // Add new restaurants to the list
    ]);
  }, []);

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
        <div className="flex justify-center">
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

                <button
                  onClick={() => router.push(`/restaurant/${restaurant.id}`)}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 w-full"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
