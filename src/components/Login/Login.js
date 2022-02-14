import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ user, setSignUpModal, setLoginModal }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const login_done = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        user(response.data.token);
        setLoginModal(false);
        navigate("/publish");
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
      if (error.response.status === 400 || error.response.status === 401) {
        setErrorMsg("Identifiant incorrect");
      }
    }
  };
  return (
    <div className="login-form container">
      <h1>Se connecter</h1>
      <form className="login" onSubmit={login_done}>
        <input
          type="text"
          placeholder="Adresse email"
          required="required"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de Passe"
          required="required"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <span className="error-Msg">{errorMsg}</span>
        <button type="submit" className="signup-btn">
          Se connecter
        </button>
      </form>
      <span
        className="link-signup"
        onClick={() => {
          setLoginModal(false);
          setSignUpModal(true);
        }}
      >
        Pas encore de compte ? Inscris-toi !
      </span>
    </div>
  );
};

export default Login;
