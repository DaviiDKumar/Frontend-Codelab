import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { searchCourses } from "../redux/courseSlice";
import "../css/Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Search when the input has 3 or more characters
    if (value.trim().length >= 3) {
      dispatch(searchCourses(value));
    }
    // Reset search when input is cleared
    if (value.trim().length === 0) {
      dispatch(searchCourses(""));
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search courses here..."
        value={query}
        onChange={handleSearch}
        className="search-input"
      />
      <button className="search-button">
        <FaSearch />
      </button>
    </div>
  );
};

export default Search;
