import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = ({ user }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const checkPassword = (x) => {
    if (x === "out") {
      if (password !== password1) {
        setIncorrectPassword(true);
      }
    } else {
      setIncorrectPassword(false);
    }
  };
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
      console.log(response.data);
      if (response.data.token) {
        user(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      console.log("Signup Error ===> ", error.message);
      console.log("Catch error ===> ", error.response);
      if (error.response.status === 409) {
        setErrorMsg("Email déjà utilisé");
      }
    }
  };
  return (
    <div className="signup-form container">
      <h1>S'inscrire</h1>
      <form className="signup">
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
        {incorrectPassword && (
          <span className="error-Msg">Mot de passe non identique</span>
        )}
        <input
          type="password"
          placeholder="Confrmer mot de passe"
          required="required"
          onChange={(event) => {
            setPassword1(event.target.value);
          }}
          onBlur={() => checkPassword("out")}
          onFocus={() => checkPassword("in")}
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
        <span className="error-Msg">{errorMsg}</span>
        <button type="button" onClick={Signup_done} className="signup-btn">
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
