import React, { useEffect, useState } from 'react';
import { CONTENT } from '../content';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-40 px-6 lg:px-8 py-5 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-5'}`}>
      <div className="container mx-auto flex justify-between items-center bg-surface-dark/30 border border-border-dark backdrop-blur-md rounded-full py-3 px-6 shadow-2xl shadow-black/20">
        <a href="#" className="text-lg font-bold text-text-primary-dark tracking-wider">
          {CONTENT.meta.name.toUpperCase()}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {CONTENT.navigation.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-sm font-medium text-text-secondary-dark hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="bg-primary text-white px-5 py-2 rounded-full font-semibold hover:bg-indigo-500 transition-all duration-300 text-sm hidden md:flex items-center gap-2"
        >
          <span>Get A Quote</span>
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </a>

        {/* Mobile Menu Button */}
        <button
          aria-label="Open menu"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-text-primary-dark">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full px-6 mt-2 md:hidden">
          <div className="bg-surface-dark border border-border-dark rounded-2xl p-4 shadow-xl flex flex-col space-y-4">
            {CONTENT.navigation.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-text-secondary-dark hover:text-primary transition-colors text-center py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-primary text-white px-5 py-3 rounded-xl font-semibold text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get A Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
