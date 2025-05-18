import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [books, setBooks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get('/api/books').then((res) => setBooks(res.data));
  }, []);

  const addToMyBooks = (bookId) => {
    if (!user) {
      alert('Please login first');
      return;
    }
    axios.post(`/api/mybooks/${bookId}`, {}, { withCredentials: true })
      .then(() => alert('Book added!'))
      .catch((e) => alert(e.response.data.message || 'Error adding book'));
  };

  return (
    <div>
      <h1>Books Library</h1>
      <div>
        {books.map((book) => (
          <div key={book._id}>
            <h3>{book.title} by {book.author}</h3>
            <img src={book.coverImage} alt={book.title} width={120} />
            <p>{book.availability ? 'Available' : 'Not available'}</p>
            <button onClick={() => addToMyBooks(book._id)}>Add to My Books</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
