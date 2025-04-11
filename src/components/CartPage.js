import React from "react";
import { useLocation } from "react-router-dom";

function CartPage() {
  const location = useLocation();
  const cartItems = location.state?.cart || [];

  return (
    <div className="cart-page">
      <h1>Cart Items</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <img src={item.image} alt={item.title} style={{ width: "80px" }} />
              <h3>{item.title}</h3>
              <p>₹{(item.price * 83).toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartPage;
