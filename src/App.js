import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faHeart } from '@fortawesome/free-solid-svg-icons'; 

function App() {
  const popularBooks = [
    { key: 1, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", cover: "https://covers.openlibrary.org/b/id/8375970-L.jpg" },
    { key: 2, title: "To Kill a Mockingbird", author: "Harper Lee", cover: "https://covers.openlibrary.org/b/id/8226097-L.jpg" },
    { key: 3, title: "1984", author: "George Orwell", cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg" },
    { key: 4, title: "Pride and Prejudice", author: "Jane Austen", cover: "https://covers.openlibrary.org/b/id/8378560-L.jpg" },
    { key: 5, title: "The Great Gatsby", author: "F. Scott Fitzgerald", cover: "https://covers.openlibrary.org/b/id/8225639-L.jpg" },
    { key: 6, title: "The Lord of the Rings", author: "J.R.R. Tolkien", cover: "https://covers.openlibrary.org/b/id/8376603-L.jpg" },
    { key: 7, title: "The Chronicles of Narnia", author: "C.S. Lewis", cover: "https://covers.openlibrary.org/b/id/8225310-L.jpg" },
    { key: 8, title: "Jane Eyre", author: "Charlotte Bronte", cover: "https://covers.openlibrary.org/b/id/8231992-L.jpg" },
    { key: 9, title: "Little Women", author: "Louisa May Alcott", cover: "https://covers.openlibrary.org/b/id/8225852-L.jpg" }
  ];

  const topRatedBooks = [
    { key: 10, title: "The Catcher in the Rye", author: "J.D. Salinger", cover: "https://covers.openlibrary.org/b/id/8222271-L.jpg" },
    { key: 11, title: "The Hobbit", author: "J.R.R. Tolkien", cover: "https://covers.openlibrary.org/b/id/8231856-L.jpg" },
    { key: 12, title: "Fahrenheit 451", author: "Ray Bradbury", cover: "https://covers.openlibrary.org/b/id/7222646-L.jpg" },
    { key: 13, title: "Moby-Dick", author: "Herman Melville", cover: "https://covers.openlibrary.org/b/id/8310981-L.jpg" },
    { key: 14, title: "War and Peace", author: "Leo Tolstoy", cover: "https://covers.openlibrary.org/b/id/8356184-L.jpg" },
    { key: 15, title: "The Odyssey", author: "Homer", cover: "https://covers.openlibrary.org/b/id/8270591-L.jpg" },
    { key: 16, title: "Crime and Punishment", author: "Fyodor Dostoevsky", cover: "https://covers.openlibrary.org/b/id/8225731-L.jpg" },
    { key: 17, title: "Brave New World", author: "Aldous Huxley", cover: "https://covers.openlibrary.org/b/id/7222248-L.jpg" },
    { key: 18, title: "The Divine Comedy", author: "Dante Alighieri", cover: "https://covers.openlibrary.org/b/id/8244158-L.jpg" }
  ];

  const [favorites, setFavorites] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleAddToFavorites = (book) => {
    console.log("Adding book to favorites:", book); // Log the book data
    if (!favorites.some((fav) => fav.key === book.key)) {
      setFavorites([...favorites, book]);
    }
  };

  const handleRemoveFavorite = (book) => {
    setFavorites(favorites.filter((fav) => fav.key !== book.key));
  };

  const handleSearchChange = (query) => {
    setIsSearching(query.length > 0);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <Navbar 
        favoriteBooks={favorites} 
        onRemoveFavorite={handleRemoveFavorite}  // Pass the remove function here
      />
      <div className="container mx-auto p-4 max-w-4xl">
        <SearchBar onAddToFavorites={handleAddToFavorites} onSearchChange={handleSearchChange} />

        {!isSearching && (
          <>
            <section id="popular-books">
              <h2 className="text-2xl font-bold text-center mt-8">Popular Books</h2>
              <div className="border-b-2 border-gray-600 w-20 mx-auto mt-2"></div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {popularBooks.map((book) => (
                  <div key={book.key} className="text-center">
                    <img src={book.cover} alt={book.title} className="w-48 h-64 mx-auto" />
                    <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
                    <p className="text-sm text-gray-600">{book.author}</p>
                    <button onClick={() => handleAddToFavorites(book)}>
                      <FontAwesomeIcon icon={faHeart} className="text-red-500 cursor-pointer" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section id="top-rated-books">
              <h2 className="text-2xl font-bold text-center mt-8">Top Rated Books</h2>
              <div className="border-b-2 border-gray-600 w-20 mx-auto mt-2"></div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {topRatedBooks.map((book) => (
                  <div key={book.key} className="text-center">
                    <img src={book.cover} alt={book.title} className="w-48 h-64 mx-auto" />
                    <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
                    <p className="text-sm text-gray-600">{book.author}</p>
                    <button onClick={() => handleAddToFavorites(book)}>
                      <FontAwesomeIcon icon={faHeart} className="text-red-500 cursor-pointer" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section id="about-us">
              <h2 className="text-2xl font-bold text-center mt-8">About Us</h2>
              <div className="border-b-2 border-gray-600 w-20 mx-auto mt-2"></div>
              <p className="mt-4 text-gray-700 text-center">
                Welcome to Book Finder! Our goal is to make it easy for you to find and explore books. We are passionate about connecting readers with the stories they love.
              </p>
            </section>

            <section id="contact-info">
              <h2 className="text-2xl font-bold text-center mt-8">Contact Info</h2>
              <div className="border-b-2 border-gray-600 w-20 mx-auto mt-2"></div>
              <p className="mt-4 text-gray-700 text-center">Email: contact@bookfinder.com</p>
              <p className="mt-2 text-gray-700 text-center">Phone: +123-456-7890</p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
