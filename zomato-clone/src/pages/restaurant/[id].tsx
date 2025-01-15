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
        {
          id: 2,
          name: 'Sushi Zen',
          description: 'Fresh sushi and Japanese dishes served with flair.',
          image: 'https://imgs.search.brave.com/lnxoHgdGT6cL062WP7N0F39ftmV82QwaXbB8IRH_sS0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8w/OC8wOS8xOC8zMi9z/dXNoaS1yb2xsLWlt/YWdlcy00Mzk1NTk4/XzY0MC5qcGc',
          rating: 4.7,
          cuisine: 'Japanese',
          location: 'Andheri',
          openingHours: '12 PM - 10 PM',
          averagePrice: '₹1200 for two',
          menu: ['Sushi', 'Ramen', 'Tempura'],
        },
        {
          id: 3,
          name: 'Indian Delights',
          description: 'A fun, vibrant place for Indian food.',
          image: 'https://imgs.search.brave.com/03ysq-K83FfcaqBgWKCAYCSmFdYGkifGJXFaBsnDut8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzYwLzg4Lzg1/LzM2MF9GXzg2MDg4/ODU2M19UbnJITGVV/V2VDZFpjVElESXpq/dE8yOVp4NkxPUFJS/bC5qcGc',
          rating: 4.3,
          cuisine: 'Indian',
          location: 'Parel',
          openingHours: '10 AM - 11 PM',
          averagePrice: '₹1000 for two',
          menu: ['Chicken Tikka', 'Paneer Makhani', 'Butter Naan'],
        },
        {
          id: 4,
          name: 'Burger Haven',
          description: 'The best gourmet burgers in town.',
          image: 'https://imgs.search.brave.com/-yLdJ0WJr848mwrkTsAdVT41WmcU47UVOHCCk_ZmC0o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9zdHJlZXQtZm9v/ZC1mcmVzaC1idXJn/ZXJzLXdpdGgtYm94/LWJlZXItd29vZGVu/LXRhYmxlXzIyMDky/NS00ODA0LmpwZz9z/ZW10PWFpc19oeWJy/aWQ',
          rating: 4.1,
          cuisine: 'American',
          location: 'Borivali',
          openingHours: '11 AM - 10 PM',
          averagePrice: '₹900 for two',
          menu: ['Cheese Burger', 'Veggie Burger', 'Chicken Fries'],
        },
        {
          id: 5,
          name: 'Pizza Palace',
          description: 'Pizza for every mood and occasion.',
          image: 'https://imgs.search.brave.com/-EwIfaB4HT5urBbmBoN3-52-6RDE-LfD9BCtjChXBJ0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQw/NjQ1MTA4NC9waG90/by9sZWZ0b3Zlci1z/bGljZXMtb2YtcGVw/cGVyb25pLXBpenph/LWF0LXJlc3RhdXJh/bnQuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVp4LVB2ZTJD/ZEZETTMzS0hpSUhR/S0VGWnVNVjhHMjcz/XzBCTENVOUQ2VnM9',
          rating: 3.9,
          cuisine: 'Italian',
          location: 'Kandivali',
          openingHours: '9 AM - 10 PM',
          averagePrice: '₹800 for two',
          menu: ['Margherita', 'Pepperoni', 'Veggie Supreme'],
        },
        {
          id: 6,
          name: 'Biryani House',
          description: 'The best biryani in town.',
          image: 'https://imgs.search.brave.com/P8jeDn_SJRCJvQUTLNQxHC-Ul-mYL_bO1woGjwbX-uI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI0/NDc2OTIxNy9waG90/by9jaGlja2VuLWR1/bS1iaXJ5YW5pLWlu/LXRvcm9udG8tb250/YXJpby1jYW5hZGEt/b24tbm92ZW1iZXIt/MTItMjAyMi5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9ZDBr/X0lCXzFKcGE4YVFq/ak5BX2dNbkZQMUZ2/TUhmSHByalRaUVFw/NHplST0',
          rating: 4.2,
          cuisine: 'Indian',
          location: 'Malad',
          openingHours: '10 AM - 12 AM',
          averagePrice: '₹700 for two',
          menu: ['Hyderabadi Biryani', 'Kolkata Biryani', 'Lucknowi Biryani'],
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