import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Article from "../../components/Article/Article";

const Home = ({ sortValue, minMaxValues, search }) => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(40);
  const [pageNumber, setPageNumber] = useState(1);
  const page = [];
  const minValue = minMaxValues[0];
  const maxValue = minMaxValues[1];
  useEffect(() => {
    const searchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?page=${pageNumber}&limit=${limit}&sort=${sortValue}&priceMin=${minValue}&priceMax=${maxValue}&title=${search}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    searchData();
  }, [limit, pageNumber, sortValue, minValue, maxValue, search]);

  const nbPage = Math.ceil(data.count / limit);
  for (let i = 1; i <= nbPage; i++) {
    page.push(i);
  }

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
      <div className="article-menu container">
        <span className="menu-txt">Afficher</span>
        <select
          defaultValue={40}
          onChange={(event) => setLimit(Number(event.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
          <option value="35">35</option>
          <option value="40">40</option>
        </select>
      </div>
      <div className="articles container">
        {data.offers.map((article) => {
          return <Article key={article._id} article={article} />;
        })}
      </div>
      <div className="page-list container">
        <span className="menu-txt"> page = </span>
        {page.map((index) => {
          return (
            <button
              key={index}
              className={`page-btn ${index === pageNumber ? "red" : "black"}`}
              onClick={(event) => setPageNumber(Number(event.target.value))}
              value={index}
            >
              {index}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default Home;
