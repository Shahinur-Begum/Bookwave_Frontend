import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../adminheader/AdminSidebar";
import BookNavBar from "../../../AdminDash/Function/AdminBook/adminbooknav";
import img from "../../../../Assets/pay.jpg";
import "./adminpay.css";

const AdminPayment = () => {
  const [reportData, setReportData] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState("");
  const [averagePayment, setAveragePayment] = useState(0);

  // Fetch data from the backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/report/allreport"); // Fetch all reports
        console.log(response.data); // Check the response to ensure data is coming
        setReportData(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/payments"); // Fetch all payments
        setPaymentDetails(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchReports();
    fetchPayments();
  }, []);

  // Calculate average payment
  useEffect(() => {
    if (paymentDetails.length > 0) {
      const total = paymentDetails.reduce((sum, payment) => sum + payment.amount, 0);
      setAveragePayment((total / paymentDetails.length).toFixed(2));
    } else {
      setAveragePayment(0);
    }
  }, [paymentDetails]);

  // Handle search and filtering for reports
  useEffect(() => {
    let updatedReports = [...reportData];

    if (searchTerm) {
      updatedReports = updatedReports.filter((report) =>
        report.paymentStatus.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCriteria === "id") {
      updatedReports.sort((a, b) => a.id - b.id);
    } else if (filterCriteria === "due") {
      updatedReports.sort((a, b) => b.totalDue - a.totalDue);
    }

    setFilteredReports(updatedReports);
  }, [searchTerm, filterCriteria, reportData]);

  // Handle search and filtering for payments
  useEffect(() => {
    let updatedPayments = [...paymentDetails];

    if (searchTerm) {
      updatedPayments = updatedPayments.filter(
        (payment) =>
          payment.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCriteria === "id") {
      updatedPayments.sort((a, b) => a.id - b.id);
    } else if (filterCriteria === "amount") {
      updatedPayments.sort((a, b) => b.amount - a.amount);
    }

    setFilteredPayments(updatedPayments);
  }, [searchTerm, filterCriteria, paymentDetails]);

  // Delete functions for both tables
  const deleteReport = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/report/${id}`);
      setReportData(reportData.filter((report) => report.id !== id));
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const deletePayment = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/payments/${id}`);
      setPaymentDetails(paymentDetails.filter((payment) => payment.id !== id));
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  const toggleFilter = () => {
    setFilterVisible((prev) => !prev);
  };

  const handleFilterChange = (criteria) => {
    setFilterCriteria(criteria);
    setFilterVisible(false); // Close the dropdown
  };

  const handleSearch = (term) => {
    if (term) {
      setSearchTerm(term.trim());
    } else {
      setSearchTerm(""); // Reset if no input
    }
  };

  return (
    <div className="admin-payment-container">
      <AdminSidebar />
      <BookNavBar onSearch={handleSearch} />

      <div className="admain-content">
        <div className="adbook-welcome-bar">
          <div className="adbook-welcome-text">
            <h1>Payment Management</h1>
            <p>Manage payment reports and payment details efficiently.</p>
          </div>
          <div className="adbook-welcome-image">
            <img src={img} alt="Payment Management" />
          </div>
        </div>

        <div className="admin-payment-tables">
          {/* Payment Reports Table */}
          <div className="table-container">
            <h2>Reports</h2>
            <table className="admin-feedback-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student ID</th> {/* Added Student ID */}
                  <th>Status</th>
                  <th>Due</th>
                  <th>Amount</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <tr key={report.id}>
                      <td>{report.id}</td>
                      <td>{report.studentId}</td> {/* Display Student ID */}
                      <td>{report.paymentStatus}</td>
                      <td>{report.totalDue} BDT</td>
                      <td>{report.Amount} BDT</td>
                      <td>
                        <button
                          className="delete-button"
                          onClick={() => deleteReport(report.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No reports found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Payment Details Table */}
          <div className="table-container">
            <h2>Payment Details</h2>
            <table className="admin-feedback-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Student ID</th> {/* Added Student ID */}
                  <th>Paid Status</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.id}</td>
                      <td>{payment.amount} BDT</td>
                      <td>{payment.method}</td>
                      <td>{payment.studentId}</td> {/* Display Student ID */}
                      <td>{payment.isPaid ? "Paid" : "Unpaid"}</td> {/* Handle Paid/Unpaid */}
                      <td>
                        <button
                          className="delete-button"
                          onClick={() => deletePayment(payment.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No payment details found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPayment;