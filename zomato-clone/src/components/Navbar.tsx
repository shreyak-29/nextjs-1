import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  // Check login status and handle scroll
  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    setIsLoggedIn(!!token);
    setUserName(name);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: 'Home', route: '/' },
    { name: 'Restaurant', route: '/restaurant' },
  ];

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    router.push('/');
  };

  // Close mobile menu when a nav item is clicked
  const handleNavItemClick = (route: string) => {
    setIsOpen(false);
    router.push(route);
  };

  return (
    <nav className={`
      fixed top-0 w-full z-50 transition-all duration-300
      ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white'}
    `}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-2xl font-bold text-red-500 transition-transform duration-300 hover:scale-105">
            Zomato-Clone
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden absolute right-4 z-60 w-8 h-8 flex flex-col justify-center items-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`
            block w-6 h-0.5 bg-gray-700 transform transition-all duration-300
            ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}
          `}/>
          <span className={`
            block w-6 h-0.5 bg-gray-700 my-1 transition-all duration-300
            ${isOpen ? 'opacity-0' : 'opacity-100'}
          `}/>
          <span className={`
            block w-6 h-0.5 bg-gray-700 transform transition-all duration-300
            ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}
          `}/>
        </button>

        {/* Navigation Menu */}
        <div className={`
          fixed md:static top-0 left-0 w-full h-full md:h-auto
          bg-white md:bg-transparent z-50 transition-all duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
          flex flex-col md:flex-row justify-center md:justify-end items-center
        `}>
          <ul className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-2">
            {navItems.map(({ name, route }) => (
              <li 
                key={name} 
                className="text-center"
                onClick={() => handleNavItemClick(route)}
              >
                <a 
                  className={`
                    text-lg md:text-base py-2 px-4
                    ${router.pathname === route ? 'text-red-500' : 'text-gray-700'}
                    hover:text-red-500 transition-colors duration-300
                  `}
                >
                  {name}
                </a>
              </li>
            ))}

            {/* Mobile Login/Logout */}
            <li className="md:hidden mt-4">
              {isLoggedIn ? (
                <div className="flex flex-col items-center space-y-3">
                  <span className="text-gray-700 font-medium">{userName}</span>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => router.push('/login')}
                  className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>

        {/* Desktop Login/Logout */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <span className="text-gray-700 font-medium">{userName}</span>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
              onClick={() => router.push('/login')}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;