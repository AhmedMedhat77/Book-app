import React from "react";
import Book from "../Book/Book";

function BookShelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.bookList.map((v) => {
            return (
              <li key={v.id}>
                <Book
                  {...v}
                  onBookStateChange={props.onBookStateChange}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default BookShelf;
