import React, { useEffect, useState } from "react";
import useApi from "../api/useApi";
import "../scss/index.css";
import { useAuth } from "../../context/authContext";

function Add() {
  const api = useApi();
  const [genreData, setGenreData] = useState([]);
  const [recordTitle, setRecordTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [artistId, setArtistId] = useState();
  const [recordGenre, setRecordGenre] = useState();
  const [fileUpload, setFileUpload] = useState(null);
  const [artistData, setArtistData] = useState([]);
  const [bravo, setBravo] = useState(true);
  const { userInfo } = useAuth();

  function addRecord(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", recordTitle);
    formData.append("name", artistName);
    formData.append("genre_id", recordGenre);
    formData.append("artist_id", artistId);
    formData.append("cover", fileUpload);
    formData.append("user_id", userInfo.id);

    api.post("/vinyl", formData).then((res) => {
      setBravo(!bravo);
      return res;
    });
  }

  useEffect(() => {
    api.get("/genre").then((res) => {
      setGenreData(res.data);
    });
  }, []);

  useEffect(() => {
    api.get("/artist").then((res) => {
      setArtistData(res.data);
    });
  }, []);

  return (
    <div className="form-div-container">
      {bravo ? (
        <div className="form-div">
          <form action="submit" className="add-form" onSubmit={addRecord}>
            <label htmlFor="title">Title of the record:</label>
            <input
              type="text"
              name="title"
              value={recordTitle}
              onChange={(e) => setRecordTitle(e.target.value)}
            />

            <label htmlFor="artist">Name of the artist:</label>
            <input
              type="text"
              name="artist"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
            />
            <label htmlFor="artist">Or choose from the list:</label>
            <select
              name="artist"
              id="artist"
              value={artistId}
              onChange={(e) => setArtistId(e.target.value)}
            >
              <option>--Choose an artist--</option>
              {artistData.map((artist) => (
                <option value={artist.id} key={artist.id}>
                  {artist.name}
                </option>
              ))}
            </select>

            <label htmlFor="genre">Genre:</label>
            <select
              name="genre"
              id="genre"
              value={recordGenre}
              onChange={(e) => setRecordGenre(e.target.value)}
            >
              <option>--Choose a genre--</option>
              {genreData.map((genre) => (
                <option value={genre.id} key={genre.id}>
                  {genre.genre_name}
                </option>
              ))}
            </select>
            <label htmlFor="link">
              <input
                type="file"
                name="cover"
                onChange={(e) => setFileUpload(e.target.files[0])}
                id="file-selection-button"
              />
            </label>
            <button type="submit" className="button">
              Add to my collection
            </button>
          </form>
        </div>
      ) : (
        <div className="adding-another">
          <h1> Record added to collection!</h1>
          <button
            className="button"
            type="button"
            onClick={() => {
              setBravo(!bravo);
            }}
          >
            ADD ANOTHER ONE
          </button>
        </div>
      )}
    </div>
  );
}

export default Add;
