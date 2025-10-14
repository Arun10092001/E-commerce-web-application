import React, { useContext, useState } from "react";
import "./Navbar.css";
import rocket from "../../assets/rocket.png";
import star from "../../assets/star.png";
import idbutton from "../../assets/id-button.webp";
import memo from "../../assets/memo.jpg";
import lock from "../../assets/locked.jpg";
import order from "../../assets/package.jpg";
import LinkwithIcon from "../Navbar/LinkwithIcon.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext.js";
import CartContext from "../../context/CartContext.js";

const Navbar = () => {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  const user = useContext(UserContext)
  const {cart} = useContext(CartContext)

  const handleSubmit = e => {
    e.preventDefault()
    if (search.trim() !==""){
      navigate(`/products?search=${search.trim()}`)

    }
  }

  return (
    <nav className="align_center navbar">
      <div className="align_center">
        <h1 className="navbar_heading">CartWish</h1>
        <form className="align_center navbar_form"
        onSubmit={handleSubmit}>
          <input type="text" 
          className="navbar_search" 
          placeholder="Search Products" 
          value={search}
          onChange={e => setSearch(e.target.value)}/>
          <button type="submit" className="search_button">Search</button>
        </form>
      </div>
      <div className="align_center navbar_links">
        <LinkwithIcon title="Home" link="/" emoji={rocket} />
        <LinkwithIcon title="Products" link="/products" emoji={star} />

        {!user ? (
          <>
            <LinkwithIcon title="Login" link="/login" emoji={idbutton} />
            <LinkwithIcon title="SignUp" link="/signup" emoji={memo} />
          </>
        ) : (
          <>
            <LinkwithIcon title="My Orders" link="/myorders" emoji={order} />
            <LinkwithIcon title="Logout" link="/logout" emoji={lock} />

            <NavLink to="/cart" className="align_center">
              Cart
              <p className="align_center cart_count">{cart.length}</p>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
