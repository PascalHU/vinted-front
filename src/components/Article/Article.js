import "./Article.css";
import { Link } from "react-router-dom";
import no_avatar from "../../assets/img/no_avatar.png";
import no_picture from "../../assets/img/no_picture.png";
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
        {owner.avatar ? (
          <img className="avatar" src={owner.avatar.secure_url} alt="avatar" />
        ) : (
          <img className="avatar" src={no_avatar} alt="none" />
        )}
        <span>{owner.username}</span>
      </div>
      <Link to={`./offer/${id}`} className="link">
        <div className="product">
          <div className="product-img">
            {article.product_pictures[0] ? (
              <img src={article.product_pictures[0].secure_url} alt="product" />
            ) : article.product_image ? (
              <img src={article.product_image.secure_url} alt="product" />
            ) : (
              <img src={no_picture} alt="none" />
            )}
          </div>
          <div className="product-detail">
            <span className="price">{price}</span>
            {sizeExist === "TAILLE" && <span className="size">{size}</span>}
            <span className="brand">{brand}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default Article;
