import React, { useState } from 'react';
import './main.css';
import img1 from '../../../Assets/Book1.jpg';
import img2 from '../../../Assets/Book2.jpeg';
import img3 from '../../../Assets/Book3.jpg';
import monthlyreadimg from '../../../Assets/monthlychallenge.jpg';
import yearlyreadimg from '../../../Assets/Reading-Challenge.png';
import Navbar from '../Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const Data = [
  { id: 1, bookName: 'Cosmos', imgSrc: img1, published: 'January 1, 1980', author: 'Carl Sagan', genre: 'Science · Nonfiction · Physics' },
  { id: 2, bookName: 'Data Structure and Algorithm', imgSrc: img2, published: '2023', author: 'Dilip Kumar Sultania', genre: 'Nonfiction · Computer Science' },
  { id: 3, bookName: 'Mechanical Engineering Handbook', imgSrc: img3, published: 'May 29, 2020', author: 'Charles E. Baukal', genre: 'Nonfiction · Engineering' },
];

const librarySchedule = [
  { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
  { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
  { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
  { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
  { day: 'Friday', hours: '9:00 AM - 5:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
];

const Main = () => {
   const navigate = useNavigate();
  const handleRedirectToLogin = () => {
    navigate('/login'); // Redirect to the specified route
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [highlightedBookId, setHighlightedBookId] = useState(null);

  const notices = [
    { notice: 'Library will be closed for maintenance on 8th January.', date: 'January 3, 2025' },
    { notice: 'New collection of books are available in the Science Fiction genre.', date: 'January 4, 2025' },
    { notice: 'All overdue fines must be cleared by 20th January.', date: 'January 5, 2025' },
  ];

  // Filter books based on search query and author filter
  const filteredBooks = Data.filter((book) => {
    const matchesSearch = book.bookName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAuthor = authorFilter ? book.author.toLowerCase().includes(authorFilter.toLowerCase()) : true;
    return matchesSearch && matchesAuthor;
  });

  return (
    <div>
      <Navbar setSearchQuery={setSearchQuery} setAuthorFilter={setAuthorFilter} />

      <section className="main container section">
        <div className="secHeader">
          <h3 className="title">Recently Added Books</h3>
          <button className="seeAllBtn">See All</button>
        </div>

        <div className="secContent grid" onClick={() => handleRedirectToLogin('/login')} >
          {filteredBooks.length > 0 ? (
            filteredBooks.map(({ id, imgSrc, bookName, published, author, genre }) => (
              <div
                key={id}
                className={`singleBook ${highlightedBookId === id ? 'highlighted' : ''}`}
                onClick={() => setHighlightedBookId(id)}
              >
                <div className="imageDiv" onClick={() => handleRedirectToLogin('/login')}>
                  <img src={imgSrc} alt={bookName} />
                </div>
                <div className="bookDetails">
                  <h4>{bookName}</h4>
                  <p><strong>Author:</strong> {author}</p>
                  <p><strong>Published:</strong> {published}</p>
                  <p><strong>Genre:</strong> {genre}</p>

                  <button className="reserveButton" onClick={() => handleRedirectToLogin('/login') }>
                    Reserve
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No books found matching your search.</p>
          )}
        </div>

        {/* Library Notices */}
        <div className="secHeader" style={{ marginTop: '40px' }}>
          <h3 className="title">Library Notices</h3>
        </div>
        <div className="noticesList">
          {notices.length > 0 ? (
            notices.map((item, index) => (
              <div key={index} className="noticeItem">
                <p><strong>Notice:</strong> {item.notice}</p>
                <p><strong>Date:</strong> {item.date}</p>
              </div>
            ))
          ) : (
            <p>No notices posted yet.</p>
          )}
        </div>

        {/* Library Schedule */}
        <div className="secHeader">
          <h3 className="title">Library Schedule</h3>
        </div>
        <div className="librarySchedule">
          {librarySchedule.map(({ day, hours }, index) => (
            <div key={index} className="scheduleItem">
              <p><strong>{day}:</strong> {hours}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Main;
