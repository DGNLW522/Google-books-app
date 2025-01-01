import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const maxResults = 10;

  useEffect(() => {
    fetchBooks("javascript"); // Default search query
  }, []);

  const fetchBooks = async (searchQuery, startIndex = 0) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/books?q=${searchQuery}&startIndex=${startIndex}&maxResults=${maxResults}`
      );
      setBooks(response.data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
      alert("An error occurred while fetching books. Please try again later.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setStartIndex(0); // Reset to the first page
      fetchBooks(query, 0);
    }
  };

  const handleNextPage = () => {
    const newIndex = startIndex + maxResults;
    setStartIndex(newIndex);
    fetchBooks(query, newIndex);
  };

  const handlePrevPage = () => {
    if (startIndex >= maxResults) {
      const newIndex = startIndex - maxResults;
      setStartIndex(newIndex);
      fetchBooks(query, newIndex);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Google Books Search</h1>
      <form className="d-flex justify-content-center mb-4" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ maxWidth: "400px" }}
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      <div>
        {books.length > 0 ? (
          <div className="row">
            {books.map((book) => (
              <div className="col-md-4 mb-4" key={book.id}>
                <div className="card h-100">
                  {book.volumeInfo.imageLinks?.thumbnail && (
                    <img
                      src={book.volumeInfo.imageLinks.thumbnail}
                      className="card-img-top"
                      alt={book.volumeInfo.title}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">
                      <a href={`/book/${book.id}`} style={{ textDecoration: "none" }}>
                        {book.volumeInfo.title}
                      </a>
                    </h5>
                    <p className="card-text">
                      By: {book.volumeInfo.authors?.join(", ") || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No books found.</p>
        )}
      </div>
      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-secondary"
          disabled={startIndex === 0}
          onClick={handlePrevPage}
        >
          Previous
        </button>
        <button className="btn btn-secondary" onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
