import "./Header.css";
import logo from "../../assets/img/logo.svg";
import searchIcon from "../../assets/img/search-1.svg";
import info from "../../assets/img/info.svg";

import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Modal from "react-modal";

import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import MinMaxPrice from "../MinMaxPrice/MinMaxPrice";
import SortPrice from "../SortPrice/SortPrice";

const Header = ({
  user,
  token,
  signUpModal,
  setSignUpModal,
  loginModal,
  setLoginModal,
  sortValue,
  setSortValue,
  values,
  setMinMaxValues,
  setSearch,
}) => {
  const navigate = useNavigate();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const openSignUpModal = () => {
    setSignUpModal(true);
  };
  const closeSignUpModal = () => {
    setSignUpModal(false);
  };
  const openLoginModal = () => {
    setLoginModal(true);
  };
  const closeLoginModal = () => {
    setLoginModal(false);
  };
  useEffect(() => {
    Modal.setAppElement(".header");
  }, []);

  const disconnect = () => {
    user(null);
    navigate("/");
  };
  const checkisLogged = () => {
    if (token) {
      navigate("/publish");
    } else {
      setLoginModal(true);
    }
  };
  return (
    <div className="header container">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div className="header-middle">
        <div className="search-bar">
          <img src={searchIcon} alt="loupe" />
          <input
            type="text"
            placeholder="Rechercher des articles"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        <div className="price-filter">
          <SortPrice sortValue={sortValue} setSortValue={setSortValue} />
          <MinMaxPrice values={values} setMinMaxValues={setMinMaxValues} />
        </div>
      </div>
      <div className="header-button">
        {token ? (
          <button className="disconect" onClick={disconnect}>
            Se déconnecter
          </button>
        ) : (
          <>
            <button className="signup" onClick={openSignUpModal}>
              S'inscrire
            </button>
            <Modal
              isOpen={signUpModal}
              onRequestClose={closeSignUpModal}
              style={customStyles}
              contentLabel="signup"
            >
              <button onClick={closeSignUpModal} className="close-modal">
                X
              </button>
              <Signup
                user={user}
                setSignUpModal={setSignUpModal}
                setLoginModal={setLoginModal}
              />
            </Modal>

            <button className="login" onClick={openLoginModal}>
              Se connecter
            </button>
            <Modal
              isOpen={loginModal}
              onRequestClose={closeLoginModal}
              style={customStyles}
              contentLabel="login"
            >
              <button onClick={closeLoginModal} className="close-modal">
                X
              </button>
              <Login
                user={user}
                setSignUpModal={setSignUpModal}
                setLoginModal={setLoginModal}
              />
            </Modal>
          </>
        )}
        <button className="sell-now" onClick={checkisLogged}>
          Vend Maintenant
        </button>
        <button>
          <img src={info} alt="info" />
        </button>
      </div>
    </div>
  );
};
export default Header;
