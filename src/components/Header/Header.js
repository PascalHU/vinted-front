import logo from "../../assets/img/logo.svg";
import searchIcon from "../../assets/img/search-1.svg";
import info from "../../assets/img/info.svg";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ user, token }) => {
  const navigate = useNavigate();

  const disconnect = () => {
    user(null);
    navigate("/");
  };

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
        {token ? (
          <button className="disconect" onClick={disconnect}>
            Se déconnecter
          </button>
        ) : (
          <>
            <button className="signup" onClick={() => navigate("/signup")}>
              S'inscrire
            </button>
            <button className="login" onClick={() => navigate("/login")}>
              Se connecter
            </button>
          </>
        )}
        <button className="sell-now">Vend Maintenant</button>
        <button>
          <img src={info} alt="info" />
        </button>
      </div>
    </div>
  );
};
export default Header;
