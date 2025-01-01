import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h1>{book.volumeInfo.title}</h1>
      <p>By: {book.volumeInfo.authors?.join(", ") || "Unknown"}</p>
      <p>{book.volumeInfo.description}</p>
      {book.volumeInfo.imageLinks?.thumbnail && (
        <img
          src={book.volumeInfo.imageLinks.thumbnail}
          alt={book.volumeInfo.title}
        />
      )}
    </div>
  );
};

export default BookDetails;
