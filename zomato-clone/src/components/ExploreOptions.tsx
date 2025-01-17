import React, { useState } from 'react';

const ExploreOptions: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    { 
      title: 'Popular Cuisines', 
      content: 'Explore a wide variety of cuisines like Italian, Chinese, Mexican, and Indian. Our platform offers something for every taste!'
    },
    { 
      title: 'Popular Restaurants', 
      content: 'Discover top-rated restaurants such as The Olive Garden, Five Guys, and local favorites. Find the best dining experiences near you.'
    },
    { 
      title: 'Top Restaurant Chains', 
      content: 'Our top restaurant chains include McDonald\'s, Subway, Burger King, and many others. Enjoy great food at any of their locations.'
    },
    { 
      title: 'Cities We Deliver To', 
      content: 'We deliver to major cities including Mumbai, Delhi, Banglore, and Chennai. Explore delivery options in your area.'
    },
  ];

  return (
    <section className="explore-section bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl font-semibold mb-8 text-gray-900 text-center">
          Explore Options Near Me
        </h2>
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.title}
              className="border rounded-lg overflow-hidden shadow-md transform transition-all hover:scale-105 hover:shadow-sm"
            >
              <button
                className="w-full text-left px-6 py-4 flex justify-between items-center bg-white text-gray-900 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
                onClick={() => toggleSection(section.title)}
              >
                <span className="text-lg">{section.title}</span>
                <span className={`transform transition-transform text-xl ${openSection === section.title ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openSection === section.title && (
                <div className="px-6 py-4 bg-gray-50 text-gray-700 text-base">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreOptions;
