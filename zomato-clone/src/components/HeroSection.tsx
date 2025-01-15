import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const headlines = [
    'Delicious Meals Delivered to Your Doorstep',
    'Discover Local Flavors Near You',
    'Your Favorite Restaurants, One Click Away'
  ];

  const [currentHeadline, setCurrentHeadline] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">
        <div className={`
          transform transition-all duration-1000 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        `}>
          {/* Animated Headlines */}
          <div className="h-32 md:h-24 mb-4 overflow-hidden">
            {headlines.map((headline, index) => (
              <h1 
                key={headline}
                className={`
                  text-3xl md:text-5xl font-bold text-white
                  transition-all duration-500 transform
                  ${currentHeadline === index ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
                `}
              >
                {headline}
              </h1>
            ))}
          </div>

          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover the best food from your favorite restaurants, 
            all in one place. Order now for a taste of happiness!
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for restaurants or cuisines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-3 rounded-full bg-white/95 
                  backdrop-blur-md text-gray-800 
                  placeholder-gray-500 outline-none
                  shadow-lg focus:ring-2 focus:ring-red-500
                  transition-all duration-300"
              />
              <button className="absolute right-2 top-2 bg-red-500 
                text-white px-4 py-1 rounded-full
                hover:bg-red-600 transform hover:scale-105
                transition-all duration-300">
                Search
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button className="
              group relative overflow-hidden
              bg-red-500 text-white px-8 py-3 rounded-lg
              transform hover:scale-105 active:scale-95
              transition-all duration-300
            ">
              <span className="relative z-10">Order Now</span>
              <div className="
                absolute inset-0 bg-gradient-to-r from-red-600 to-red-500
                transform rotate-12 translate-y-full group-hover:translate-y-0
                transition-transform duration-300
              "/>
            </button>
            
            <button className="
              bg-white/10 backdrop-blur-md text-white 
              px-8 py-3 rounded-lg border-2 border-white/30
              hover:bg-white/20 transform hover:scale-105
              transition-all duration-300
            ">
              View Menu
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 
        bg-gradient-to-t from-black/20 to-transparent"/>
    </div>
  );
};

export default HeroSection;