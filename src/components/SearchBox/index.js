import React from "react";
import "./style.css";

function SearchBox({ handleSearchChange }) {
  return (
    <div className="searchbox">
      {/* <form className="form-inline"> */}
        {/* <FontAwesomeIcon icon={faSearch} style={{ color: 'purple' }} size="1x" /> */}
        <label>
          <span className="searchIcon" />
          <input
          className="form-control"
          type="search"
          placeholder="Search your favorite food..."
          aria-label="Search"
          onChange={e => handleSearchChange(e)}
        />

        </label>
      {/* </form> */}
    </div>
  );
}
export default SearchBox;
