import React from "react";

function Book(props) {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: "128px",
            height: "193px",
            backgroundImage: props?.imageLinks?.thumbnail
              ? `url(${props.imageLinks.thumbnail})`
              : "",
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            defaultValue={props.shelf ?? "none"}
            onChange={(e) => {
              const { value } = e.target;
              if (props.shelf === value) {
                return;
              }
              props.onBookStateChange(props, value);
            }}
          >
            <option value="" disabled={true}>
              Move to...
            </option>
            <option
              // selected={props.shelf === "currentlyReading"}
              // onClick={() => }
              // disabled={props.shelf === "currentlyReading"}
              value="currentlyReading"
            >
              Currently Reading
            </option>
            <option
              // selected={props.shelf === "wantToRead"}
              // onClick={() => props.onBookStateChange(props, "wantToRead")}
              // disabled={props.shelf === "wantToRead"}
              value="wantToRead"
            >
              Want to Read
            </option>
            <option
              // selected={props.shelf === "read"}
              // onClick={() => props.onBookStateChange(props, "read")}
              // disabled={props.shelf === "read"}
              value="read"
            >
              Read
            </option>
            <option
              // onClick={() => props.onBookStateChange(props, "none")}
              // disabled={props.shelf === "none" || props.shelf === undefined}
              value="none"
            >
              None
            </option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.title}</div>
      {props.authors !== undefined ? (
        <div className="book-authors">{props.authors.join(", ")}</div>
      ) : null}
    </div>
  );
}

export default Book;
