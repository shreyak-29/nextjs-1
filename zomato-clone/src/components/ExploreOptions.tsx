import React, { useState } from 'react';

const ExploreOptions: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    { title: 'Popular Cuisines ', content: 'List of popular cuisines.' },
    { title: 'Popular Restaurant ', content: 'Explore different types of restaurants.' },
    { title: 'Top Restaurant Chains', content: 'Discover the top restaurant chains in your city.' },
    { title: 'Cities We Deliver To', content: 'Check the cities where we provide delivery services.' },
  ];

  return (
    <section className="explore-section bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Explore Options Near Me
        </h2>
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.title}
              className="border rounded-md overflow-hidden"
            >
              <button
                className="w-full text-left px-4 py-3 flex justify-between items-center bg-white text-gray-800 font-medium focus:outline-none"
                onClick={() => toggleSection(section.title)}
              >
                {section.title}
                <span className={`transform transition-transform ${openSection === section.title ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openSection === section.title && (
                <div className="px-4 py-2 bg-gray-50 text-gray-600">
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
