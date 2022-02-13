import "./reset.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./containers/Home/Home";
import Offer from "./containers/Offer/Offer";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import { useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [signUpModal, setSignUpModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [sortValue, setSortValue] = useState("price-asc");
  const [minMaxValues, setMinMaxValues] = useState([0, 500]);
  const [search, setSearch] = useState("");

  const user = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 1 / 24 });
    } else {
      Cookies.remove("token");
    }
    setToken(token);
  };
  return (
    <Router>
      <Header
        user={user}
        token={token}
        signUpModal={signUpModal}
        setSignUpModal={setSignUpModal}
        loginModal={loginModal}
        setLoginModal={setLoginModal}
        sortValue={sortValue}
        setSortValue={setSortValue}
        values={minMaxValues}
        setMinMaxValues={setMinMaxValues}
        setSearch={setSearch}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              sortValue={sortValue}
              minMaxValues={minMaxValues}
              search={search}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup user={user} />} />
        <Route path="/login" element={<Login user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
