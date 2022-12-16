import React from "react";
import { Link } from "react-router-dom";

function ButtonSearch(props) {
  return (
    <div className="open-search">
      <Link state={props.state} to={props.path}>{props.children}</Link>
    </div>
  );
}

export { ButtonSearch };
