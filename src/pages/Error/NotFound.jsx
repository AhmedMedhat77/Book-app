import React from "react";

function NotFound(props) {
  return (
    <h1 style={{ textAlign: "center", fontSize: "10rem" }}>
      Error {props.id} {props.message}
    </h1>
  );
}

export default NotFound;
