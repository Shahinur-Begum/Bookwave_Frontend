import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboarduser.css';

function CardSection() {
  const [issuedBooksCount, setIssuedBooksCount] = useState(0);
  const [dueBooksCount, setDueBooksCount] = useState(0);
  const [dueAmount, setDueAmount] = useState(0);

  useEffect(() => {
    const fetchBookCounts = async () => {
      try {
        const studentId = localStorage.getItem('studentId'); 
        
        // Fetch the total issued books
        const response = await axios.get(`http://localhost:8080/api/borrows-return/details/${studentId}`);
        const data = response.data;

        // Set the counts based on the fetched data
        if (data.books) {
          setIssuedBooksCount(data.count); // Assuming 'count' is the total issued books count
        }

        // Fetch due amount
        const reportResponse = await axios.get(`http://localhost:8080/api/report/${studentId}`);
        const reportData = reportResponse.data;
        if (reportData.totalDue !== undefined) {
        setDueAmount(reportData.totalDue);
        }


        // Fetch due books count separately (or from the same response if available)
        const dueResponse = await axios.get(`http://localhost:8080/api/borrows-return/due-books/${studentId}`);
        const dueData = dueResponse.data;

        if (dueData.dueBooks) {
          setDueBooksCount(dueData.dueBooks.length); // Assuming 'dueBooks' is an array of books
        }
      } catch (error) {
        console.error('Error fetching book counts:', error);
      }
    };

    fetchBookCounts();
  }, []);

  return (
    <div className="card-section">
      <div className="card card1">
        <i className="fas fa-bookmark"></i> {/* Icon for "Total Issued Books" */}
        <div>Total Issued Books</div>
        <div className="card-value">{issuedBooksCount}</div> {/* Dynamic count from backend */}
      </div>

      <div className="card card2">
        <i className="fas fa-calendar-alt"></i> {/* Icon for "Books on Due" */}
        <div>On Due</div>
        <div className="card-value">{dueBooksCount}</div> {/* Dynamic count from backend */}
      </div>

     
      <div className="card card3">
        <i className="fas fa-money-bill-wave"></i>
        <div>Due Amount</div>
        <div className="card-value">{dueAmount} BDT</div>
      </div>
   </div>
  );
}

export default CardSection;
