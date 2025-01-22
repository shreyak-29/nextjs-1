import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const RestaurantDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [restaurant, setRestaurant] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const restaurantDetails = [
        {
          id: 1,
          name: 'The Italian Bistro',
          description: 'Authentic Italian food with a modern twist.',
          image: 'https://imgs.search.brave.com/XdkiI9cZxShFbCI7_hp6-2bhE07bqMSMwRWTahrxwZQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/Ni8wNi8yMi8zNy9p/dGFsaWFuLWN1aXNp/bmUtMjM3ODcyOV82/NDAuanBn',
          rating: 4.5,
          cuisine: 'Italian',
          location: 'Bandra',
          openingHours: '10 AM - 11 PM',
          averagePrice: '₹1500 for two',
          menu: ['Pasta', 'Pizza', 'Lasagna'],
        },
        
      ];

      const restaurantDetail = restaurantDetails.find(
        (restaurant) => restaurant.id === parseInt(id as string)
      );
      setRestaurant(restaurantDetail);
    }
  }, [id]);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-72">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://picsum.photos/800/600';
            }}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-4 left-4 right-4">
              <h1 className="text-3xl font-bold text-white mb-2">
                {restaurant.name}
              </h1>
              <div className="flex items-center gap-2 text-white">
                <span className="px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                  <span className="text-yellow-400 mr-1">★</span>
                  {restaurant.rating}
                </span>
                <span className="px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                  {restaurant.cuisine}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    About
                  </h3>
                  <p className="text-gray-700">{restaurant.description}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Details
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {restaurant.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {restaurant.openingHours}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {restaurant.averagePrice}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                Popular Menu Items
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {restaurant.menu.map((item: string, index: number) => (
                  <div
                    key={index}
                    className="py-2 px-3 bg-white rounded-lg shadow-sm mb-2 last:mb-0"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <button
            onClick={() => router.push('/restaurant')}
            className="w-full px-6 py-3 bg-red-500 text-white font-medium rounded-lg 
                     transition-all duration-300 hover:bg-red-600 active:scale-95 
                     focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Back to Restaurants
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;