// ShoppingCart.js
import React from "react";

function ShoppingCart({ cart, onRemoveFromCart }) {
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item._id}>
            {item.name} - SKU: {item.sku} - Price: ${item.price}
            <button onClick={() => onRemoveFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingCart;
