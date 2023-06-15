import React, { useState } from "react";
import "../scss/index.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import useAPI from "../api/useApi";

function Header() {
  const api = useAPI();
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const { success, setSuccess, userInfo } = useAuth();

  function updateMenu() {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  }

  const handleLogOut = () => {
    delete api.defaults.headers.authorization;
    setSuccess(!success);
  };
  return (
    <div id="header">
      <nav>
        <button type="button" className="burger-menu" onClick={updateMenu}>
          <div className={burgerClass} />
          <div className={burgerClass} />
          <div className={burgerClass} />
        </button>
        <h1 className="add">
          <Link to="/Add">+</Link>
        </h1>
      </nav>
      <div className={menuClass}>
        <ul className="pages-selection">
          <li>
            <Link to="/" onClick={() => updateMenu()}>
              Accueil
            </Link>
          </li>
          {userInfo?.id ? (
            <li>
              <Link to="/collection" onClick={() => updateMenu()}>
                Mes disques
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/collection" onClick={() => updateMenu()}>
                Les disques
              </Link>
            </li>
          )}

          <li>
            <Link to="/artist" onClick={() => updateMenu()}>
              Par Artistes
            </Link>
          </li>

          <li>
            <Link to="/genre" onClick={() => updateMenu()}>
              Par Genre
            </Link>
          </li>
          {success ? (
            <li>
              {" "}
              <Link to="/connexion" onClick={() => updateMenu()}>
                Connexion{" "}
              </Link>
            </li>
          ) : (
            <button
              className="user-button"
              type="button"
              onClick={handleLogOut}
            >
              Déconnexion
            </button>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
