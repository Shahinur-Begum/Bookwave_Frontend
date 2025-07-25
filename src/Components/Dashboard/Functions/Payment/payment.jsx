import React, { useState, useEffect } from "react";
import axios from "axios";
import "./paymentPage.css";
import bkashLogo from "../../../../Assets/bkash.jpeg";
import nogodLogo from "../../../../Assets/nagad.png";
import rocketLogo from "../../../../Assets/rocket.jpeg";
import Header from "../../../Header/header";
import img from "../../../../Assets/pay.jpg";

export default function PaymentPage() {
  const [dues, setDues] = useState(0);
  const [status, setStatus] = useState("Unpaid");
  const [showTransactionInput, setShowTransactionInput] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [method, setMethod] = useState("bKash");
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    fetchPaymentDetails(studentId);
  }, []);

  const fetchPaymentDetails = async (studentId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/report/${studentId}`);
      const { totalDue } = response.data;
      setDues(totalDue || 0);
      setStatus(totalDue === 0 ? "Paid" : "Unpaid");
    } catch (error) {
      console.error("Error fetching payment details:", error);
      alert("Failed to load payment details. Please try again.");
    }
  };

  const clearDues = async () => {
    if (!transactionId.trim()) {
      alert("Please enter a valid transaction ID.");
      return;
    }

    const paymentPayload = {
      studentId,
      amount: dues, // full payment
      method,
      transactionId,
    };

    try {
      // 1. Process payment
      const response = await axios.post("http://localhost:8080/api/payments", paymentPayload);
      const { totalDue } = response.data;

      if (totalDue === 0) {
        // 2. Fetch due books for the student
        const dueBooksResponse = await axios.get(
          `http://localhost:8080/api/borrows-return/due-books/${studentId}`
        );
        const dueBooksList = dueBooksResponse.data.dueBooks || [];

        // 3. Delete each due book using your existing API
        await Promise.all(
          dueBooksList.map((book) =>
            axios.delete(
              `http://localhost:8080/api/borrows-return/delete/${studentId}/${book.bookId}`
            )
          )
        );
      }

      // 4. Refresh payment details after deletion
      await fetchPaymentDetails(studentId);

      setShowTransactionInput(false);
      setTransactionId("");
      alert("Payment successful and due books cleared!");
    } catch (error) {
      console.error("Error processing payment or clearing dues:", error);
      alert("Failed to process payment or clear dues. Please try again.");
    }
  };

  const handlePaymentClick = (selectedMethod) => {
    setMethod(selectedMethod);
    setShowTransactionInput(true);
  };

  return (
    <div className="payment-page">
      <Header />
      <div className="paymain-content">
        <div className="paywelcome-bar">
          <div className="paywelcome-text">
            <h1>Payment</h1>
            <p>Easily manage and pay your dues with our secure payment options.</p>
          </div>
          <div className="paywelcome-image">
            <img src={img} alt="Payment" />
          </div>
        </div>

        <div className="payment-details">
          <h3>
            Total Dues:{" "}
            <span className="dues-amount">{dues > 0 ? `${dues} BDT` : "No Dues"}</span>
          </h3>
          <div className="status">
            <span>Status: </span>
            <button className={`status-button ${status.toLowerCase()}`}>{status}</button>
          </div>
        </div>

        <h3>Payment Methods</h3>
        <div className="payment-options-row">
          <div className="payment-option">
            <img src={bkashLogo} alt="bKash" className="payment-logo" />
            <button
              onClick={() => handlePaymentClick("bKash")}
              disabled={status === "Paid"}
              className="pay-button"
            >
              Pay with bKash
            </button>
          </div>
          <div className="payment-option">
            <img src={nogodLogo} alt="Nagad" className="payment-logo" />
            <button
              onClick={() => handlePaymentClick("Nagad")}
              disabled={status === "Paid"}
              className="pay-button"
            >
              Pay with Nagad
            </button>
          </div>
          <div className="payment-option">
            <img src={rocketLogo} alt="Rocket" className="payment-logo" />
            <button
              onClick={() => handlePaymentClick("Rocket")}
              disabled={status === "Paid"}
              className="pay-button"
            >
              Pay with Rocket
            </button>
          </div>
        </div>

        {showTransactionInput && (
          <div className="transaction-input">
            <h4>Enter Transaction ID</h4>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter Transaction ID"
            />
            <button onClick={clearDues} className="pay-button">
              Submit Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
