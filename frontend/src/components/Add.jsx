import React, { useEffect, useState } from "react";
import useApi from "../api/useApi";
import "../scss/index.css";

function Add() {
  const api = useApi();
  const [genreData, setGenreData] = useState([]);
  const [recordTitle, setRecordTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [recordGenre, setRecordGenre] = useState("");
  const [fileUpload, setFileUpload] = useState(null);

  function addRecord(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", recordTitle);
    formData.append("name", artistName);
    formData.append("genre_id", recordGenre);
    formData.append("cover", fileUpload);

    api.post("/vinyl", formData).then((res) => {
      return res;
    });
  }

  useEffect(() => {
    api.get("/genre").then((res) => {
      setGenreData(res.data);
    });
  }, []);

  return (
    <div className="form-div-container">
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

          <label htmlFor="genre">Genre:</label>
          <select
            name="genre"
            id="genre"
            value={recordGenre}
            onChange={(e) => setRecordGenre(e.target.value)}
          >
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
    </div>
  );
}

export default Add;
