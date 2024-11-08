import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onAddToFavorites, onSearchChange }) => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (query === '') {
      setBooks([]);  // Agar query empty hai, toh books ko clear kar do
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?title=${query}`);
      setBooks(response.data.docs.slice(0, 10)); // 10 results tak limit
    } catch (err) {
      setError('Could not fetch books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearchChange(e.target.value);  // Search change hone par parent ko inform karna
    if (!e.target.value) {
      setBooks([]);  // Agar search box empty ho, toh books ko clear kar do
    }
  };

  const openBookDetails = (book) => {
    setSelectedBook(book);
  };

  const closeBookDetails = () => {
    setSelectedBook(null);
  };

  const handleAddToFavorites = () => {
    if (selectedBook) {
      onAddToFavorites(selectedBook);
      closeBookDetails();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 my-6">Book Finder</h1>
      <form onSubmit={handleSearch} className="flex items-center justify-center mb-4">
        <input
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={handleInputChange}
          className="px-4 py-2 border rounded-l-md w-80 focus:outline-none"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
          Search
        </button>
      </form>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Search Results */}
      {books.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-center mt-8">Search Results</h2>
          <div className="border-b-2 border-gray-600 w-20 mx-auto mt-2"></div>
          <div className="books-container mt-4" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <div className="grid grid-cols-3 gap-4">
              {books.map((book) => (
                <div key={book.key} className="text-center relative">
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                    alt={book.title}
                    className="w-48 h-64 mx-auto cursor-pointer"
                    onClick={() => openBookDetails(book)} // Image click to show details
                  />
                  {/* Only show love and wrong icon when image is clicked */}
                  {selectedBook && selectedBook.key === book.key && (
                    <>
                      {/* Love icon below image */}
                      <button 
                        onClick={() => handleAddToFavorites(book)} 
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-red-500 text-3xl">
                        ❤️
                      </button>
                      {/* Wrong icon at top right corner */}
                      <button 
                        onClick={closeBookDetails} 
                        className="absolute top-2 right-2 text-red-500 text-xl">
                        ❌
                      </button>
                    </>
                  )}
                  <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
                  <p className="text-sm text-gray-600">{book.author_name ? book.author_name.join(", ") : 'Unknown'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Book Details Modal */}
      {selectedBook && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-96 relative">
            <button onClick={closeBookDetails} className="absolute top-2 right-2 text-red-500 text-xl">❌</button>
            <img
              src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`}
              alt={selectedBook.title}
              className="w-48 h-64 mx-auto"
            />
            <h2 className="text-xl font-bold mt-4">{selectedBook.title}</h2>
            <p className="mt-2">{selectedBook.author_name ? selectedBook.author_name.join(", ") : 'Unknown'}</p>
            <p className="mt-2">{selectedBook.first_publish_year ? `First published in ${selectedBook.first_publish_year}` : 'No publication date available'}</p>
            <button onClick={() => handleAddToFavorites()} className="text-red-500 cursor-pointer mt-4">
              Add to Favorites ❤️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
