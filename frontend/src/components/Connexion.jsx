import React, { useState } from "react";
import useAPI from "../api/useApi";
import { useAuth } from "../../context/authContext";

function Connexion() {
  const api = useAPI();
  const [userName, setUserName] = useState();

  const [mdp, setMdp] = useState();
  const { setUserInfo, success, setSuccess } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: userName,
      mdp,
    };
    api
      .post("/user", newUser)
      .then((result) => {
        setSuccess(!success);
        return result;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleConnexionSubmit = (e) => {
    e.preventDefault();
    const user = {
      mdp,
      name: userName,
    };

    api
      .post("user/login", user)
      .then((res) => {
        const { token } = res.data;
        api.defaults.headers.authorization = `Bearer ${token}`;
        setUserInfo(res.data.user);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="main-div">
      {success ? (
        <form onSubmit={handleSubmit} className="registration-form">
          <label>
            Name:
            <input
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={mdp}
              onChange={(e) => {
                setMdp(e.target.value);
              }}
            />
          </label>
          <br />
          <button type="submit">Connexion</button>
          <button
            type="button"
            onClick={() => {
              setSuccess(!success);
            }}
          >
            Se Connecter
          </button>
        </form>
      ) : (
        <>
          <h1>Sign up</h1>
          <form onSubmit={handleConnexionSubmit} className="registration-form">
            <label>
              Name:
              <input
                type="text"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                value={mdp}
                onChange={(e) => {
                  setMdp(e.target.value);
                }}
              />
            </label>
            <br />
            <button type="submit">Connexion</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Connexion;
