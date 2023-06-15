import React, { useEffect, useState } from "react";
import useApi from "../api/useApi";
import "../scss/index.css";
import { useAuth } from "../../context/authContext";

function Collection() {
  const api = useApi();
  const { userInfo } = useAuth();

  const [recordData, setRecordData] = useState([]);

  useEffect(() => {
    if (userInfo && userInfo.id) {
      api
        .get(`/vinyl/user/${userInfo.id}`)
        .then((res) => {
          setRecordData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      api
        .get("/vinyl")
        .then((res) => {
          setRecordData(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userInfo]);

  return (
    <div className="record-list-container">
      <div className="record-list">
        {Array.isArray(recordData) &&
          recordData.map((rec) => (
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
