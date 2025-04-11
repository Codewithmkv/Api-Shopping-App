import React from "react";
import { Link } from "react-router-dom";

function CartPage({ cart }) {
  if (cart.length === 0) {
    return (
      <div>
        <h2>Your Cart is Empty!</h2>
        <Link to="/">Go Back to Products</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <img src={item.image} alt={item.title} style={{ width: "50px" }} />
            <h3>{item.title}</h3>
            <p>Price: ₹{(item.price * 83).toFixed(2)}</p>
          </li>
        ))}
      </ul>
      <Link to="/">Continue Shopping</Link>
    </div>
  );
}

export default CartPage;
