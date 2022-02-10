import "./Article.css";
import { Link } from "react-router-dom";

const Article = ({ article }) => {
  const owner = article.owner.account;
  const price = article.product_price.toFixed(2).replace(".", ",") + " €";
  const sizeExist = Object.keys(article.product_details[1])[0];
  const size = article.product_details[1].TAILLE;
  const brand = article.product_details[0].MARQUE;
  const id = article._id;
  return (
    <div className="article">
      <div className="user-info">
        <img className="avatar" src={owner.avatar.secure_url} alt="avatar" />
        <span>{owner.username}</span>
      </div>
      <div className="product">
        <div className="product-img">
          <Link to={`./offer/${id}`}>
            <img src={article.product_pictures[0].secure_url} alt="product" />
          </Link>
        </div>
        <div className="product-detail">
          <span className="price">{price}</span>
          {sizeExist === "TAILLE" && <span className="size">{size}</span>}
          <span className="brand">{brand}</span>
        </div>
      </div>
    </div>
  );
};
export default Article;
