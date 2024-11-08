import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ favoriteBooks = [], onAddFavorite, onRemoveFavorite }) => {
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const toggleFavorites = () => {
    setIsFavoritesOpen(!isFavoritesOpen);
  };

  const handleRemoveFromFavorites = (book) => {
    onRemoveFavorite(book);
  };

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsFavoritesOpen(false); // Close favorites dropdown if navigating to a section
  };

  // Debugging: Log favoriteBooks to verify the contents of the favoriteBooks array
  console.log("Favorite Books in Navbar:", favoriteBooks);

  return (
    <nav className="bg-blue-500 text-white p-4 shadow-md fixed w-full top-0">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => handleScrollToSection('home')}>Book Finder</h1>
        <ul className="flex space-x-6 items-center">
          <li className="cursor-pointer hover:underline" onClick={() => handleScrollToSection('popular-books')}>Popular Books</li>
          <li className="cursor-pointer hover:underline" onClick={() => handleScrollToSection('top-rated-books')}>Top Rated Books</li>
          <li className="cursor-pointer hover:underline" onClick={() => handleScrollToSection('about-us')}>About Us</li>
          <li className="cursor-pointer hover:underline" onClick={() => handleScrollToSection('contact-info')}>Contact Info</li>

          {/* Favorites Icon */}
          <li className="relative">
            <FontAwesomeIcon
              icon={faHeart}
              className="text-white cursor-pointer hover:text-red-400 text-3xl"
              onClick={toggleFavorites}
            />
            {favoriteBooks.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1 py-0.5">
                {favoriteBooks.length}
              </span>
            )}

            {/* Favorites Dropdown */}
            {isFavoritesOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <div className="p-2">
                  {favoriteBooks.length > 0 ? (
                    favoriteBooks.map((book, index) => (
                      <div key={index} className="p-2 border-b flex justify-between items-center">
                        <div>
                          {/* Display book title and author */}
                          <h4 className="text-sm font-bold">{book.title || "No Title Available"}</h4>
                          <p className="text-xs text-gray-600">{book.author || "Author info not available"}</p>
                        </div>
                        <button 
                          onClick={() => handleRemoveFromFavorites(book)} 
                          className="text-red-500 text-xl">
                          ❌
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-sm p-2">No favorites added.</p>
                  )}
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
