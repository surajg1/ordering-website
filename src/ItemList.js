// ItemList.js
import React, { useState } from "react";

function ItemList({ items, onAddToCart, onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - SKU: {item.sku} - Price: ${item.price}
            <button onClick={() => onAddToCart(item)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
