import "./reset.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./containers/Home/Home";
import Offer from "./containers/Offer/Offer";
import Signup from "./containers/Signup/Signup";
import Login from "./containers/Login/Login";
import { useState } from "react";
import Cookies from "js-cookie";
function App() {
  const [token, setToken] = useState(Cookies.get("token") | null);

  const user = (token) => {
    if (token) {
      Cookies.set("token", token, {
        expire: 0.04166666666666666666666666666667,
      });
    } else {
      Cookies.remove("token");
    }
    setToken(token);
  };
  return (
    <Router>
      <Header user={user} token={token} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup user={user} />} />
        <Route path="/login" element={<Login user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
