import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Track login status
  const [userName, setUserName]= useState<string | null>(null); // Track login status
  const router = useRouter();

  // Check if the user is logged in by checking token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    if (token) {
      setIsLoggedIn(true); // User is logged in
      setUserName(name);
    } else {
      setIsLoggedIn(false);
      setUserName(null); // User is not logged in
    }

    // Scroll event listener to change navbar style
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define navigation items with corresponding routes
  const navItems = [
    { name: 'Home', route: '/' },
    { name: 'Restaurant', route: '/restaurant' }, // New Restaurant page link
  ];

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    localStorage.removeItem('userName'); // Remove the token
    setIsLoggedIn(false); // Update the login state
    router.push('/'); // Redirect to login page
  };

  return (
    <nav className={`
      fixed top-0 w-full z-50 transition-all duration-300
      ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white'}
    `}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-red-500 transition-transform duration-300 hover:scale-105">
          <Link href={"/"}>
            Zomato-Clone
          </Link>
          </div>
        </div>

        <button
          className="block md:hidden relative w-6 h-6 text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className={`
            absolute w-6 h-0.5 bg-gray-700 transform transition-all duration-300
            ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1'}
          `}/>
          <div className={`
            absolute w-6 h-0.5 bg-gray-700 transform transition-all duration-300
            ${isOpen ? 'opacity-0' : 'opacity-100'}
          `}/>
          <div className={`
            absolute w-6 h-0.5 bg-gray-700 transform transition-all duration-300
            ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1'}
          `}/>
        </button>

        <ul className={`
          ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 md:translate-y-0 md:opacity-100'}
          absolute md:relative top-full left-0 w-full md:w-auto
          bg-white md:bg-transparent shadow-lg md:shadow-none
          transform transition-all duration-300 ease-in-out
          md:flex md:space-x-8 text-gray-700
          z-40 p-4 md:p-0
        `}>
          {navItems.map(({ name, route }) => (
            <li
              key={name}
              className="relative group mb-2 md:mb-0"
              onClick={() => router.push(route)} // Redirect to the specified route
            >
              <a
                className={`
                  block py-2 md:py-1 px-3 md:px-0
                  transition-colors duration-300
                  hover:text-red-500 cursor-pointer
                  ${router.pathname === route ? 'text-red-500' : 'text-gray-700'}
                `}
              >
                {name}
              </a>
              <div
                className={`
                  absolute bottom-0 left-0 w-full h-0.5
                  transform scale-x-0 group-hover:scale-x-100
                  transition-transform duration-300
                  bg-red-500
                  ${router.pathname === route ? 'scale-x-100' : ''}
                `}
              />
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <span className="text-gray-700 font-medium">{userName}</span>
              <button
                className="relative overflow-hidden bg-red-500 text-white px-6 py-2 rounded-md transform transition-all duration-300 hover:bg-red-600 hover:scale-105 active:scale-95"
                onClick={handleLogout}
              >
                <span className="relative z-10">Logout</span>
                <div className="absolute inset-0 bg-red-400 transform -translate-x-full transition-transform duration-300 hover:translate-x-0" />
              </button>
            </div>
          ) : (
            <button
              className="relative overflow-hidden bg-red-500 text-white px-6 py-2 rounded-md transform transition-all duration-300 hover:bg-red-600 hover:scale-105 active:scale-95"
              onClick={() => router.push('/login')}
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-red-400 transform -translate-x-full transition-transform duration-300 hover:translate-x-0" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
