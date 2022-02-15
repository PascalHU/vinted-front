import "./reset.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./containers/Home/Home";
import Offer from "./containers/Offer/Offer";

import Publish from "./containers/Publish/Publish";
import Payment from "./containers/Payment/Payment";

import { useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [signUpModal, setSignUpModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [sortValue, setSortValue] = useState("price-asc");
  const [minMaxValues, setMinMaxValues] = useState([0, 10000]);
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
        <Route path="/offer/:id" element={<Offer token={token} />} />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
