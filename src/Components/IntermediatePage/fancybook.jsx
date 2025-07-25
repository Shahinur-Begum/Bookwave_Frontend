import React from 'react';
import img1 from '../../Assets/Book4.jpeg';
import img2 from '../../Assets/book5.png';
import img3 from '../../Assets/book6.jpeg';
import img4 from '../../Assets/Book1.jpg';
import img6 from '../../Assets/cat4.jpg';
import './intermediatePage.css';

const book = [
  {
    id: 1,
    bookName: 'Other London',
    imgSrc: img1,
    published: 'January 1, 1980',
    author: 'Carl Sagan',
    genre: 'Science · Nonfiction · Physics · Astronomy · History · Space · Philosophy · Classics · Political Science'
  },
  {
    id: 2,
    bookName: 'Science Fiction',
    imgSrc: img2,
    published: '2023',
    author: 'Dilip Kumar Sultania',
    genre: 'Nonfiction · Computer Science · Technical · Textbook',
  },
  {
    id: 3,
    bookName: 'Enceladus',
    imgSrc: img3,
    published: 'May 29, 2020',
    author: 'Charles E. Baukal, Jr.',
    genre: 'Nonfiction · Science · Technical · Textbook',
  },
  {
    id: 4, // New book added to Popular Books
    bookName: 'The Cosmos',
    imgSrc: img4,
    published: 'April 15, 1995',
    author: 'Neil deGrasse Tyson',
    genre: 'Science · Astronomy · Nonfiction · Space · Popular Science',
  }
];

// Recently Added books
const recentlyAdded = [
  {
    id: 1,
    bookName: 'Cosmos',
    imgSrc: img4,
    published: 'January 1, 1980',
    author: 'Carl Sagan',
    genre: 'Science · Nonfiction · Physics · Astronomy · History · Space · Philosophy · Classics · Popular Science'
  },
  {
    id: 5,
    bookName: 'Data Structure and Algorithm',
    imgSrc: img2,
    published: '2023',
    author: 'Dilip Kumar Sultania',
    genre: 'Nonfiction · Computer Science · Technical · Textbook',
  },
  {
    id: 6,
    bookName: 'Mechanical Engineering Education HandBook',
    imgSrc: img3,
    published: 'May 29, 2020',
    author: 'Charles E. Baukal, Jr., PhD (Editor)',
    genre: 'Nonfiction · Science · Technical · Textbook'
  },
  {
    id: 7, // New book added to Recently Added Books
    bookName: 'Artificial Intelligence',
    imgSrc: img6,
    published: 'November 2021',
    author: 'John Doe',
    genre: 'Nonfiction · Computer Science · AI · Technology · Textbook',
  }
];

const IntermediateGridLayout = () => {
  return (
    <div className="book-grid-container">
      {/* Popular Books Section */}
      <h2>Popular Books</h2>
      <div className="books-grid">
        {book.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.imgSrc} alt={`${book.bookName} cover`} className="book-cover" />
            <h3>{book.bookName}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Published:</strong> {book.published}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
          </div>
        ))}
      </div>
      <button className="see-all-button">See All</button>

      {/* Recently Added Section */}
      <h2>Recently Added</h2>
      <div className="books-grid">
        {recentlyAdded.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.imgSrc} alt={`${book.bookName} cover`} className="book-cover" />
            <h3>{book.bookName}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Published:</strong> {book.published}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
          </div>
        ))}
      </div>
      <button className="see-all-button">See All</button>
    </div>
  );
};

export default IntermediateGridLayout;
