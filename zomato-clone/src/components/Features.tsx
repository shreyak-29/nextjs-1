import React, { useState } from 'react';

const Features = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      title: 'Quick Delivery',
      description: 'Get your food delivered within minutes.',
      icon: '🚀',
      stats: '30 min average'
    },
    {
      title: 'Fresh Ingredients',
      description: 'Prepared with the freshest ingredients.',
      icon: '🥬',
      stats: '100% fresh'
    },
    {
      title: 'Wide Variety',
      description: 'Choose from a wide range of cuisines.',
      icon: '🍽️',
      stats: '50+ cuisines'
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                bg-white rounded-lg p-6
                transform transition-all duration-300 ease-in-out
                hover:shadow-xl hover:-translate-y-2
                cursor-pointer
                ${hoveredIndex === index ? 'scale-105' : ''}
                border border-gray-100
              `}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <span className="text-4xl mb-2">{feature.icon}</span>
                <h3 className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className={`
                  mt-4 py-2 px-4 rounded-full bg-gray-50
                  transform transition-all duration-300
                  ${hoveredIndex === index ? 'bg-blue-50 text-blue-600' : 'text-gray-500'}
                `}>
                  {feature.stats}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;