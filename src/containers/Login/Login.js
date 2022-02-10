import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
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
      Cookies.set("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response);
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
        <button type="submit" className="signup-btn">
          Se connecter
        </button>
      </form>
      <Link to="/signup" className="link-signup">
        Pas encore de compte ? Inscris-toi !
      </Link>
    </div>
  );
};

export default Login;
