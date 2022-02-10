import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Offer.css";
const Offer = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const searchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    searchData();
  }, [id]);

  return isLoading ? (
    <div>Chargement en cours</div>
  ) : (
    <div className="offer-page">
      <div className="article-container container">
        <div className="article-img">
          <img src={data.product_pictures[0].secure_url} alt="article" />
        </div>
        <div className="article-detail">
          <span className="price">
            {data.product_price.toFixed(2).replace(".", ",") + " €"}
          </span>
          <div className="offer-detail">
            {data.product_details.map((elem, index) => {
              return (
                <div key={index} className="offer-detail-line">
                  <span>{Object.keys(elem)[0]}</span>
                  <span>{Object.values(elem)[0]}</span>
                </div>
              );
            })}
          </div>
          <div className="line"></div>
          <div className="underline-info">
            <span className="product-title">{data.product_name}</span>
            <span className="product-description">
              {data.product_description}
            </span>
            <div className="seller-info">
              <img src={data.owner.account.avatar.secure_url} alt="seller" />
              <span>{data.owner.account.username}</span>
            </div>
          </div>
          <button className="buy-btn">Acheter</button>
        </div>
      </div>
    </div>
  );
};

export default Offer;