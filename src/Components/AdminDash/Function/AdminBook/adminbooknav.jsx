import React, { useState, useEffect } from "react";
import { IconButton, TextField, InputAdornment, Avatar } from "@mui/material";
import { GiBookCover } from "react-icons/gi";
import dummyImg from "../../../../Assets/dummy.jpeg";
import "./adminbook.css"; // Reuse same CSS

function BookNavBar({
  books = [],                        // Array of data (books or records)
  searchTerm,                       // Input state from parent
  setSearchTerm,                   // State setter from parent
  onSearch,                         // Called whenever input or filter changes
  onSelectBook = () => {},         // Optional handler when user clicks a suggestion
  hidepart = false,                // Whether to show filter options
  filterOptions = ["title", "author"], // Filters like ["studentId", "bookId"] for borrow
}) {
  const [filterType, setFilterType] = useState(filterOptions[0]); // Default to first filter
  const [filterVisible, setFilterVisible] = useState(false);
  const [suggestedItems, setSuggestedItems] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setSuggestedItems([]);
      onSearch("", filterType);
      return;
    }

    const filtered = books.filter((item) =>
      item[filterType]?.toString().toLowerCase().includes(value.toLowerCase())
    );
    setSuggestedItems(filtered);
    onSearch(value, filterType);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
    onSearch(searchTerm, type); // Refresh filter
  };

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const handleItemClick = (item) => {
    if (typeof onSelectBook === "function") {
      onSelectBook(item.id || item.bookId); // Support both book.id and record.bookId
    }
  };

  useEffect(() => {
    onSearch(searchTerm, filterType); // Auto-trigger on mount/change
  }, [searchTerm, filterType]);

  return (
    <nav className="booknavbar">
      <div className="booknavbar-left">
        <IconButton className="booknavbar-icon">
          <GiBookCover size={40} color="white" />
        </IconButton>
      </div>

      <div className="booknavbar-center">
        <TextField
          variant="outlined"
          size="small"
          className="admin-search-bar"
          placeholder={`Search by ${filterType}`}
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <i className="fas fa-search" />
              </InputAdornment>
            ),
          }}
        />

        {hidepart && (
          <>
            <button className="adfilter-button" onClick={toggleFilter}>
              <i className="fas fa-filter"></i> Filter
            </button>

            {filterVisible && (
              <div className="adfilter-dropdown">
                {filterOptions.map((opt) => (
                  <div
                    key={opt}
                    className="filter-option"
                    onClick={() => handleFilterChange(opt)}
                  >
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {searchTerm && suggestedItems.length > 0 && (
        <div className="adsuggestions">
          <h3>Suggestions:</h3>
          <ul>
            {suggestedItems.map((item) => (
              <li
                key={item.id || item.bookId}
                onClick={() => handleItemClick(item)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={item.cover || dummyImg}
                  alt={item.title || item.bookId}
                  style={{
                    width: "50px",
                    height: "auto",
                    marginRight: "10px",
                    borderRadius: "4px",
                  }}
                />
                <span>
                  {item.title || `Book: ${item.bookId}`}{" "}
                  {item.author ? `by ${item.author}` : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="booknavbar-right">
        <Avatar alt="Profile" src={dummyImg} className="profile-avatar" />
      </div>
    </nav>
  );
}

export default BookNavBar;
