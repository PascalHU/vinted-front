import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Article from "../../components/Article/Article";

const Home = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const page = [];

  useEffect(() => {
    const searchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?page=${pageNumber}&limit=${limit}`
        );
        setData(response.data);
        setIsLoading(false);
        console.log(pageNumber);
        if (pageNumber === 1) {
          document.getElementById("page-btn1").style.color = "red";
        } else {
          document.getElementById("page-btn1").style.color = "black";
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    searchData();
  }, [limit, pageNumber]);

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
        <select onChange={(event) => setLimit(Number(event.target.value))}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
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
              id={`page-btn${index}`}
              className="page-btn"
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
