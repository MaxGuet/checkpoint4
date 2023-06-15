import React, { useEffect, useState } from "react";
import useApi from "../api/useApi";
import "../scss/index.css";

function Collection() {
  const api = useApi();

  const [recordData, setRecordData] = useState([]);

  useEffect(() => {
    api.get("/vinyl").then((res) => {
      setRecordData(res.data);
    });
  }, []);

  return (
    <div className="record-list-container">
      <div className="record-list">
        {recordData.map((rec) => (
          <div className="record" key={rec.id}>
            <img src={rec.cover} alt="" />
            <div className="rec-info">
              <h1 className="rec-title">{rec.title}</h1>
              <h2 className="rec-artist">{rec.artist_name}</h2>
            </div>
            <h2 className="rec-genre">{rec.genre_name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collection;
