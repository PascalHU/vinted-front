import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Article from "../components/Article";

const Home = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const searchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    searchData();
  }, []);

  return isLoading ? (
    <div>Chargement en cours</div>
  ) : (
    <div className="home">
      <div className="hero">
        <img
          className="big-pic"
          src="https://www.vinted.fr/assets/seller-promotion/other/banner-tablets-up-afe3d19776592a72f165c1bb93fd02c5528250a8c670ecc1656654323f9d4856.jpg"
          alt="hero"
        />
      </div>
      <div className="articles container">
        {data.offers.map((article) => {
          return <Article key={article._id} article={article} />;
        })}
      </div>
    </div>
  );
};
export default Home;
