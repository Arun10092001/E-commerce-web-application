import React from 'react'

import './QuantityInput.css'

const QuantityInput = ({quantity, setQuantity, stock, cartPage, productID}) => {
  return (
    <>
    <button className="quantity_input_button" disabled = {quantity <= 1}
    onClick={() => { cartPage ? setQuantity("decrease", productID) :
      setQuantity(quantity - 1)}}>
        {" "}-{" "} </button>
                <p 
                className="quantity_input_count">
                  {quantity}</p>
                <button 
                className="quantity_input_button" 
                disabled={quantity >= stock}
                 onClick={() => { cartPage ? setQuantity("increase", productID) :
      setQuantity(quantity + 1)}}>{" "}+{" "}
                 </button>
    </>  
  )
}

export default QuantityInput