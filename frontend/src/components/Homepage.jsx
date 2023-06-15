import React from "react";
import "../scss/index.css";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="main-div">
      <h1 className="main-title">
        <Link to="/collection">MY RECORD COLLECTION</Link>
      </h1>
    </div>
  );
}

export default Homepage;
