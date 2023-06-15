import React, { useState, useEffect } from "react";
import useAPI from "../api/useApi";

function Artist() {
  const [artists, setArtists] = useState([]);
  const api = useAPI();
  useEffect(() => {
    api.get("/artist").then((res) => {
      setArtists(res.data);
    });
  }, []);

  return (
    <div className="artist-container">
      {artists.map((artist) => (
        <div key={artist.id} className="artist">
          <h1>{artist.name}</h1>
        </div>
      ))}
    </div>
  );
}

export default Artist;
