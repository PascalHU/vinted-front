import "./Signup.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const Signup_done = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
        }
      );
      Cookies.set("token", response.data.token);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="signup-form container">
      <h1>S'inscrire</h1>
      <form className="signup" onSubmit={Signup_done}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          required="required"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          required="required"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          required="required"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className="newsletter">
          <div className="newsletter-checkbox">
            <input
              type="checkbox"
              onChange={() => {
                setNewsletter(true);
              }}
            />
            <span>S'inscrire à notre newsletter</span>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>
        <button type="submit" className="signup-btn">
          S'inscrire
        </button>
      </form>
      <Link to="/login" className="link-login">
        Tu as déjà un compte ? Connecte-toi !
      </Link>
    </div>
  );
};

export default Signup;
