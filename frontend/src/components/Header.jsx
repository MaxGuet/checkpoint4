import React, { useState } from "react";
import "../scss/index.css";
import { Link } from "react-router-dom";

function Header() {
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

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
  return (
    <div id="header">
      <nav>
        <button type="button" className="burger-menu" onClick={updateMenu}>
          <div className={burgerClass} />
          <div className={burgerClass} />
          <div className={burgerClass} />
        </button>
      </nav>
      <div className={menuClass}>
        <ul className="pages-selection">
          <Link to="/">
            <li>Accueil</li>
          </Link>
          <li>Mes disques</li>
          <li>Par Artistes</li>
          <li>Par Genre</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
