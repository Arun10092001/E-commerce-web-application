import React, { useEffect, useState } from "react";
import{ToastContainer, toast} from 'react-toastify'
import UserContext from "./context/UserContext";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { getJwt, getUser } from "./service/userservices";
import setAuthToken from "./utils/setAuthToken";
import { addToCartApi, decreaseProductAPI, getCartAPI, increaseProductAPI, removeFromCartAPI } from "./service/cartServices";
import 'react-toastify/dist/ReactToastify.css'
import CartContext from "./context/CartContext";

setAuthToken(getJwt());

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const jwtUser = getUser();
    if (!jwtUser) return;

    if (Date.now() >= jwtUser.exp * 1000) {
      localStorage.removeItem("token");
      setUser(null);
    } else {
      setUser(jwtUser);
    }
  }, []);

  const addtoCart = (product, quantity = 1) => {
    if (!product || !product._id) {
      console.error("Invalid product passed to addtoCart:", product);
      return;
    }

    const oldCart = [...cart];
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );

    if (productIndex === -1) {
      updatedCart.push({ product, quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }

    setCart(updatedCart);

    addToCartApi(product._id, quantity)
      .then(() => {
        toast.success("Product Added Successfully!");
      })
      .catch(() => {
        toast.error("Failed to add product!");
        setCart(oldCart);
      });
  };

  const removeFromCart = id => {
    const oldCart = [...cart]
    const newCart = oldCart.filter(item => item.product._id !== id)
    setCart(newCart)

    removeFromCartAPI(id).catch(err => {
      toast.error("Something went wrong!")
      setCart(oldCart)
    })
  }

  const updateCart = (type, id) => {
    const oldCart = [...cart]
    const updatedCart = [...cart]
    const productIndex = updatedCart.findIndex(item => item.product._id === id)
    
    if(type === "increase"){
      updatedCart[productIndex].quantity += 1
      setCart(updatedCart)

      increaseProductAPI(id).catch(err => {
        toast.error("Something went wrong!")
        setCart(oldCart)
      })
    }
    if(type === "decrease"){
      updatedCart[productIndex].quantity -= 1
      setCart(updatedCart)

      decreaseProductAPI(id).catch(err => {
        toast.error("Something went wrong!")
        setCart(oldCart)
      })
    }
  }

  const getCart = () => {
    getCartAPI()
    .then(res => {
      setCart(res.data)
    })
  }
  useEffect(() => {
    if (user) {
      getCart()
    }
  }, [user])

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider value = {{cart, addtoCart, removeFromCart, updateCart, setCart}}>
    <div className="app">
      <Navbar />
      <main>
        <ToastContainer position="bottom-right"/>
        <Routing user={user} setUser={setUser}
         />
      </main>
    </div>
    </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
