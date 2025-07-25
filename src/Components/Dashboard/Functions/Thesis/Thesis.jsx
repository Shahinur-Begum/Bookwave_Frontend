import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "./Thesis.css";

import Header from '../../../Header/header';
import img from "../../../../Assets/thesis.jpg";
import axios from 'axios';

const ThesisLibrary = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [theses, setTheses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/thesis")
      .then(response => {
        setTheses(response.data);
      })
      .catch(error => {
        console.error("Error fetching theses:", error);
      });
  }, []);

  return (
    <div className="ebook-page-container">
      <Header />
      
      <div className={`main-content ${isSidebarExpanded ? "shrink" : ""}`}>
        {/* Welcome Bar */}
        <div className="welcome-bar">
          <div className="welcome-text">
            <h2>Thesis Library</h2>
            <p>Browse a curated collection of academic theses across various domains and technologies.</p>
          </div>
          <div className="welcome-image">
            <img src={img} alt="Book Catalogue" />
          </div>
        </div>

        {/* Thesis Table */}
        <table style={{ marginTop: "40px", marginLeft: "20px", marginRight: "20px", width: "calc(100% - 40px)" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author(s)</th>
              <th>Year</th>
              <th>Topic</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {theses.map((thesis, index) => (
              <tr key={index}>
                <td>{thesis.title}</td>
                <td>{thesis.author}</td>
                <td>{thesis.year}</td>
                <td>
                  <span className="topic-tag">{thesis.topic}</span>
                </td>
                <td className="actions">
                  {/* View PDF */}
                  <a
                    href={thesis.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download"
                    style={{ marginRight: "10px" }}
                  >
                    Read
                  </a>

                  
                  <a
                    href={`http://localhost:8080/api/thesis/download/${thesis.thesisId}`}
                    className="download"
                  >
                    ⬇ Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ThesisLibrary;
