import "./SortPrice.css";

const SortPrice = ({ sortValue, setSortValue }) => {
  const changeSort = () => {
    if (sortValue === "price-asc") {
      setSortValue("price-desc");
    } else {
      setSortValue("price-asc");
    }
  };
  return (
    <div className="price-asc-desc">
      <span>Trier par prix : </span>
      <label className="switch">
        <input type="checkbox" onChange={changeSort} />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default SortPrice;
