import React, { useState, useEffect } from "react";
import useAPI from "../api/useApi";

function Artist() {
  const [artists, setArtists] = useState([]);
  const [allVinyls, setAllVinyls] = useState([]);
  const [artistId, setArtistId] = useState();
  const [addArtist, setAddArtist] = useState(true);
  const [artistName, setArtistName] = useState("");

  const api = useAPI();
  useEffect(() => {
    api.get("/artist").then((res) => {
      setArtists(res.data);
    });
  }, []);

  useEffect(() => {
    api.get("/vinyl").then((res) => {
      setAllVinyls(res.data);
    });
  }, []);

  const vinylByArtist = allVinyls.filter((rec) => rec.artist_name === artistId);

  return (
    <div className="container-div">
      <div className="artist-container">
        {artists.map((artist) => (
          <div
            role="button"
            key={artist.id}
            className="artist"
            onClick={() => setArtistId(artist.name)}
            tabIndex={0}
            onKeyDown={() => {
              setArtistId(artist.id);
            }}
          >
            <h1>{artist.name}</h1>
          </div>
        ))}
        {addArtist ? (
          <button
            type="button"
            className="add-artist"
            onClick={() => {
              setAddArtist(false);
            }}
          >
            + Ajouter un artiste
          </button>
        ) : (
          <>
            <label htmlFor="artist">Name of the artist:</label>
            <input
              type="text"
              name="artist"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
            />
          </>
        )}
      </div>
      <div className="record-container">
        {vinylByArtist &&
          vinylByArtist.map((rec) => (
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

export default Artist;
