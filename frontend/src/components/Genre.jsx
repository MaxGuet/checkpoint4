import React, { useEffect, useState } from "react";
import useAPI from "../api/useApi";
import "../scss/index.css";
import { useAuth } from "../../context/authContext";

function Genre() {
  const api = useAPI();
  const { userInfo } = useAuth();
  const [allGenres, setAllGenres] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [genreName, setGenreName] = useState();

  useEffect(() => {
    if (userInfo && userInfo.id) {
      api
        .get(`/vinyl/user/${userInfo.id}`)
        .then((res) => {
          setAllRecords(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      api
        .get("/vinyl")
        .then((res) => {
          setAllRecords(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userInfo]);

  useEffect(() => {
    api.get("/genre").then((res) => {
      setAllGenres(res.data);
    });
  }, []);

  const vinylByGenre = allRecords.filter((rec) => rec.genre_name === genreName);

  return (
    <div className="main-div-genre">
      <div className="genre-container">
        {allGenres.map((genre) => (
          <div
            role="button"
            key={genre.id}
            className="genre"
            onClick={() => setGenreName(genre.genre_name)}
            tabIndex={0}
            onKeyDown={() => {
              setGenreName(genre.genre_name);
            }}
          >
            <h1>{genre.genre_name}</h1>
          </div>
        ))}
      </div>
      <div className="record-container">
        {vinylByGenre &&
          vinylByGenre.map((rec) => (
            <div className="record" key={rec.id}>
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

export default Genre;
