import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const MyBooks = () => {
  const [myBooks, setMyBooks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      axios.get('/api/mybooks', { withCredentials: true }).then((res) => setMyBooks(res.data));
    }
  }, [user]);

  const updateStatus = (bookId, status) => {
    axios.patch(`/api/mybooks/${bookId}/status`, { status }, { withCredentials: true })
      .then((res) => {
        setMyBooks((prev) =>
          prev.map((mb) => (mb.bookId._id === bookId ? res.data : mb))
        );
      });
  };

  const updateRating = (bookId, rating) => {
    axios.patch(`/api/mybooks/${bookId}/rating`, { rating }, { withCredentials: true })
      .then((res) => {
        setMyBooks((prev) =>
          prev.map((mb) => (mb.bookId._id === bookId ? res.data : mb))
        );
      });
  };

  if (!user) return <p>Please login to see your books.</p>;

  return (
    <div>
      <h1>My Books</h1>
      {myBooks.length === 0 ? (
        <p>You haven't added any books yet.</p>
      ) : (
        myBooks.map(({ _id, bookId, status, rating }) => (
          <div key={_id}>
            <h3>{bookId.title}</h3>
            <p>Status:
              <select value={status} onChange={(e) => updateStatus(bookId._id, e.target.value)}>
                <option>Want to Read</option>
                <option>Currently Reading</option>
                <option>Read</option>
              </select>
            </p>
            <p>Rating:
              <select value={rating || 0} onChange={(e) => updateRating(bookId._id, +e.target.value)}>
                <option value={0}>No rating</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBooks;
