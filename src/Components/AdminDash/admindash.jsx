import React, { useEffect, useState } from "react";
import AdminNav from "../AdminDash/adminheader/AdminNav";
import AdminSidebar from "../AdminDash/adminheader/AdminSidebar";
import AdminWelcome from "./AdminWelcome";
import { Card, CardContent, Typography } from "@mui/material";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks"; // Icon for Books
import BookIcon from "@mui/icons-material/Book"; // Icon for E-books
import FeedbackIcon from "@mui/icons-material/Feedback"; // Icon for Feedback

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import '../AdminDash/adminheader/admindash.css';
import axios from "axios";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function AdminDash() {
  // State for real counts fetched from backend
  const [membersCount, setMembersCount] = useState(0);
  const [booksCount, setBooksCount] = useState(0);
  const [ebooksCount, setEbooksCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);

  // Updated categories matching database exactly
  const categories = [
    "CSE",
    "Electrical Engineering",
    "Mechanical Engineering",
    "StoryBooks"
  ];
  
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    // Fetch members count
    axios.get("http://localhost:8080/api/admin/students")
      .then(res => setMembersCount(res.data.length))
      .catch(err => console.error("Error fetching members:", err));

    // Fetch books count
    axios.get("http://localhost:8080/api/admin/books")
      .then(res => setBooksCount(res.data.length))
      .catch(err => console.error("Error fetching books:", err));

    // Fetch ebooks count
    axios.get("http://localhost:8080/api/ebooks")
      .then(res => setEbooksCount(res.data.length))
      .catch(err => console.error("Error fetching ebooks:", err));
    
    // Fetch feedback count
    axios.get("http://localhost:8080/api/feedback/all")
      .then(res => setFeedbackCount(res.data.length))
      .catch(err => console.error("Error fetching feedback:", err));

    // Fetch counts per category for doughnut chart
    const fetchCategoryCounts = async () => {
      try {
        const counts = await Promise.all(
          categories.map(async (cat) => {
            const res = await axios.get(`http://localhost:8080/api/admin/books/category/${encodeURIComponent(cat)}`);
            return res.data.length;
          })
        );
        console.log("Fetched category counts:", counts);
        setCategoryCounts(counts);
      } catch (err) {
        console.error("Error fetching category counts:", err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategoryCounts();

  }, []);

  // Prepare card data with real counts replacing static counts
  const cardData = [
    {
      title: "Total Members",
      count: membersCount,
      gradient: "linear-gradient(45deg, #ff6ec7, #ff7b9d)",
      chartData: [4, 3, 2, 1],
      chartType: "dot",
      icon: <LibraryBooksIcon style={{ fontSize: 40, color: "white" }} />,
    },
    {
      title: "Total Books",
      count: booksCount,
      gradient: "linear-gradient(45deg, #36a2eb, #5a8fbf)",
      chartData: !loadingCategories && categoryCounts.length === categories.length ? categoryCounts : [0, 0, 0, 0],
      chartType: "bar",
      icon: <BookIcon style={{ fontSize: 40, color: "white" }} />,
    },
    {
      title: "Total E-books",
      count: ebooksCount,
      gradient: "linear-gradient(45deg, #ffce56, #ffdf74)",
      chartData: [6, 4, 5, 5],
      chartType: "bar",
      icon: <LibraryBooksIcon style={{ fontSize: 40, color: "white" }} />,
    },
    {
      title: "Total Feedback",
      count: feedbackCount,
      gradient: "linear-gradient(45deg, #9966ff, #b38bff)",
      chartData: [2, 3, 1, 4],
      chartType: "line",
      icon: <FeedbackIcon style={{ fontSize: 40, color: "white" }} />,
    },
  ];

  const createDotChartData = (data, color) => ({
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "Activity",
        data: data.map((d, idx) => ({
          x: idx + 1,
          y: d,
        })),
        borderColor: color,
        backgroundColor: color,
        borderWidth: 2,
        pointRadius: 8,
        pointBorderColor: 'white',
        pointBackgroundColor: color,
      },
    ],
  });

  // Doughnut data dynamically from backend, fallback to zeros while loading
  const doughnutData = {
    labels: categories,
    datasets: [
      {
        data:
          !loadingCategories && categoryCounts.length === categories.length
            ? categoryCounts
            : Array(categories.length).fill(0),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "New Members",
        backgroundColor: "#36A2EB",
        data: [1, 2, 3, 4, 5],
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Dues",
        borderColor: "#FF6384",
        data: [65, 59, 80, 81, 56],
        fill: false,
        pointBackgroundColor: "#FF6384",
        pointRadius: 7,
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-main-content">
        <AdminWelcome />

        {/* Cards Section */}
        <div className="admin-dashboard-cards">
          {cardData.map((card, index) => (
            <Card key={index} className="admin-card" style={{ background: card.gradient }}>
              <CardContent>
                <div className="admin-card-icon">{card.icon}</div>
                <Typography variant="h6" className="admin-card-title">{card.title}</Typography>
                <Typography variant="h4" className="admin-card-count">{card.count}</Typography>
                <div className="admin-card-chart">
                  {card.chartType === "line" && (
                    <Line
                      data={{
                        labels: ["1", "2", "3", "4", "5"],
                        datasets: [
                          {
                            data: card.chartData,
                            borderColor: "white",
                            borderWidth: 2,
                            tension: 0.4,
                            pointRadius: 0,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: { x: { display: false }, y: { display: false } },
                      }}
                    />
                  )}

                  {card.chartType === "bar" && (
                    <Bar
                      data={{
                        labels: ["1", "2", "3", "4", "5"],
                        datasets: [
                          {
                            label: "Activity",
                            data: card.chartData,
                            backgroundColor: "white",
                            borderColor: "white",
                            borderWidth: 1,
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: { x: { display: false }, y: { ticks: { display: false } } },
                      }}
                    />
                  )}

                  {card.chartType === "dot" && (
                    <Line
                      data={createDotChartData(card.chartData, card.gradient)}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: { x: { display: false }, y: { display: false } },
                      }}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Charts Section */}
        <div className="admin-charts">
          <div className="admin-chart">
            {!loadingCategories ? (
              <Doughnut data={doughnutData} />
            ) : (
              <p>Loading chart...</p>
            )}
          </div>
          <div className="admin-chart">
            <Bar data={barData} />
          </div>
          <div className="admin-chart">
            <Line data={lineData} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDash;
