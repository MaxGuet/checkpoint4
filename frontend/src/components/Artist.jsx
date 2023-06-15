import React, { useState, useEffect } from "react";
import useAPI from "../api/useApi";
import { useAuth } from "../../context/authContext";

function Artist() {
  const [artists, setArtists] = useState([]);
  const [allVinyls, setAllVinyls] = useState([]);
  const [artistId, setArtistId] = useState();

  const { userInfo } = useAuth();

  const api = useAPI();
  useEffect(() => {
    api.get("/artist").then((res) => {
      setArtists(res.data);
    });
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.id) {
      api
        .get(`/vinyl/user/${userInfo.id}`)
        .then((res) => {
          setAllVinyls(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      api
        .get("/vinyl")
        .then((res) => {
          setAllVinyls(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userInfo]);

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
