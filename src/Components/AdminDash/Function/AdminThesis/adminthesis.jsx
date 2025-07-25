import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../../adminheader/AdminSidebar";
import BookNavBar from "../../../AdminDash/Function/AdminBook/adminbooknav";
import img from "../../../../Assets/thesis.jpg";
import "./adminthesis.css";

const AdminThesis = () => {
  const [theses, setTheses] = useState([]);
  const [filteredTheses, setFilteredTheses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");
  const [newThesis, setNewThesis] = useState({
    title: "",
    author: "",
    year: "",
    topic: "",
    link: "",         // fileUrl
    downloadUrl: "",  // new external download link
  });

  useEffect(() => {
    fetchTheses();
  }, []);

  useEffect(() => {
    let updated = [...theses];

    if (searchTerm) {
      updated = updated.filter((t) =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCriteria === "year") {
      updated.sort((a, b) => b.year - a.year);
    } else if (filterCriteria === "topic") {
      updated.sort((a, b) => a.topic.localeCompare(b.topic));
    }

    setFilteredTheses(updated);
  }, [searchTerm, filterCriteria, theses]);

  const fetchTheses = () => {
    axios
      .get("http://localhost:8080/api/thesis")
      .then((response) => {
        const mappedTheses = response.data.map((t) => ({
          id: t.thesisId,
          title: t.title,
          author: t.author,
          year: t.year,
          topic: t.topic,
          link: t.fileUrl,
          downloadUrl: t.downloadUrl,
        }));
        setTheses(mappedTheses);
      })
      .catch((error) => console.error("Error fetching theses:", error));
  };

  const deleteThesis = (id) => {
    axios
      .delete(`http://localhost:8080/api/thesis/${id}`)
      .then(() => fetchTheses())
      .catch((error) => console.error("Error deleting thesis:", error));
  };

  const addThesis = (e) => {
    e.preventDefault();
    const { title, author, year, topic, link, downloadUrl } = newThesis;

    if (!title || !author || !year || !topic || !link) {
      alert("Please fill all required fields.");
      return;
    }

    const thesisData = {
      title,
      author,
      year: parseInt(year),
      topic,
      fileUrl: link,
      downloadUrl,
    };

    axios
      .post("http://localhost:8080/api/thesis", thesisData)
      .then(() => {
        fetchTheses();
        setNewThesis({
          title: "",
          author: "",
          year: "",
          topic: "",
          link: "",
          downloadUrl: "",
        });
      })
      .catch((error) => console.error("Error adding thesis:", error));
  };

  const handleSearch = (term) => {
    if (typeof term === "string" && term.trim() !== "") {
      setSearchTerm(term.trim());
    } else {
      setSearchTerm("");
    }
  };

  return (
    <div className="admin-book-container">
      <AdminSidebar />
      <BookNavBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        hidepart={true}
      />

      <div className="adfeed-content">
        <div className="adfeed-welcome-bar">
          <div className="adfeed-welcome-text">
            <h1>Thesis Management</h1>
            <p>Manage academic thesis - add, delete, and review.</p>
          </div>
          <div className="adfeed-welcome-image">
            <img src={img} alt="Thesis" />
          </div>
        </div>

        {/* Add Thesis Form */}
        <form className="adthesis-add-form" onSubmit={addThesis}>
          <input
            type="text"
            placeholder="Title"
            value={newThesis.title}
            onChange={(e) =>
              setNewThesis({ ...newThesis, title: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={newThesis.author}
            onChange={(e) =>
              setNewThesis({ ...newThesis, author: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Year"
            value={newThesis.year}
            onChange={(e) =>
              setNewThesis({ ...newThesis, year: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Topic"
            value={newThesis.topic}
            onChange={(e) =>
              setNewThesis({ ...newThesis, topic: e.target.value })
            }
            required
          />
          <input
            type="url"
            placeholder="Thesis File URL (PDF)"
            value={newThesis.link}
            onChange={(e) =>
              setNewThesis({ ...newThesis, link: e.target.value })
            }
            required
          />
          <input
            type="url"
            placeholder="External Download URL (optional)"
            value={newThesis.downloadUrl}
            onChange={(e) =>
              setNewThesis({ ...newThesis, downloadUrl: e.target.value })
            }
          />
          <button type="submit" className="add-button">
            Add Thesis
          </button>
        </form>

        {/* Thesis Table */}
        <table className="admin-thesis-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Topic</th>
              <th>Link(s)</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {filteredTheses.length > 0 ? (
              filteredTheses.map((thesis) => (
                <tr key={thesis.id}>
                  <td>{thesis.id}</td>
                  <td>{thesis.title}</td>
                  <td>{thesis.author}</td>
                  <td>{thesis.year}</td>
                  <td>{thesis.topic}</td>
                  <td>
                    <a
                      href={thesis.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                    {thesis.downloadUrl && (
                      <>
                        {" | "}
                        <a
                          href={thesis.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download
                        </a>
                      </>
                    )}
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => deleteThesis(thesis.id)}
                      aria-label={`Delete thesis ${thesis.title}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No theses found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminThesis;
