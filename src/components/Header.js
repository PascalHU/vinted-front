import logo from "../assets/img/logo.svg";
import searchIcon from "../assets/img/search-1.svg";
import info from "../assets/img/info.svg";
import { Link } from "react-router-dom";

import "./Header.css";
const Header = () => {
  return (
    <div className="header container">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div className="search-bar">
        <img src={searchIcon} alt="loupe" />
        <input type="text" placeholder="Rechercher des articles" />
      </div>
      <div className="header-button">
        <button>S'inscrire / Se connecter</button>
        <button>Vend Maintenant</button>
        <button>
          <img src={info} alt="info" />
        </button>
      </div>
    </div>
  );
};
export default Header;
