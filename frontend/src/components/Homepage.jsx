import React from "react";
import "../scss/index.css";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="main-div">
      <Link to="/collection">
        <h1 className="main-title">MY RECORD COLLECTION</h1>
      </Link>
    </div>
  );
}

export default Homepage;
