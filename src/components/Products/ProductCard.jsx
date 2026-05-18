import React, { useContext } from "react";
import config from "../../config.json";
import star from "../../assets/star.png";
import basket from "../../assets/basket.jpg";
import "./ProductCard.css";
import { NavLink } from "react-router-dom";
import { addToCartApi } from "../../service/cartServices";
import CartContext from "../../context/CartContext";
import UserContext from "../../context/UserContext";

const handleAddToCart = async (product) => {
  try {
    await addToCartApi(product._id, 1); // <-- pass both parameters
    alert("Product added to cart!");
  } catch (err) {
    console.error(err);
    alert("Failed to add to cart");
  }
};

const ProductCard = ({ product }) => {
  const { addtoCart } = useContext(CartContext);
  const user = useContext(UserContext);
  return (
    <article className="product_card">
      <div className="product_image">
        <NavLink to={`/products/${product?._id}`}>
          <img
            src={`${config.backendURL}/products/${product?.images[0]}`}
            alt="product image"
          ></img>
        </NavLink>
      </div>
      <div className="product_details">
        <h3 className="product_price">${product?.price}</h3>
        <p className="product_title">{product?.title}</p>

        <footer className="align_center product_info">
          <div className="align_center">
            <p className="align_center product_rating">
              <img src={star} alt="star" /> {product?.reviews?.rate ?? 0}
            </p>
            <p className="product_review_count">{product?.reviews?.counts ?? 0}</p>
          </div>

          {product?.stock > 0 && user && (
            <button
              className="add_to_cart"
              onClick={() => addtoCart(product, 1)}
            >
              <img src={basket} alt="basket" />
            </button>
          )}
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
