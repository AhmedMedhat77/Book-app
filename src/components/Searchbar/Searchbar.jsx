import React from "react";
import { Link } from "react-router-dom";

function Searchbar(props) {
  return (
    <div className="search-books-bar">
      <Link className="close-search" to={props.backPath}>
        Close
      </Link>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN"
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}

export default Searchbar;
