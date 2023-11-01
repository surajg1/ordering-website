import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';
import ShoppingCart from './ShoppingCart';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs'; // Example icon (you can choose any other)

function App() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchText, setSearchText] = useState("");
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem._id !== item._id);
    setCart(updatedCart);
  };

  const searchItems = (text) => {
    fetch(`http://localhost:3001/api/search?search=${text}`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("Error searching for items:", error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:3001/api/items")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  return (
    <Container>
      <h1>Ordering Website</h1>
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <FormControl
              type="text"
              placeholder="Search by SKU or Name" 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={() => searchItems(searchText)}>
              <BsSearch /> Search
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <ItemList items={items} onAddToCart={addToCart} onSearch={searchItems} />
        </Col>
        <Col>
          <ShoppingCart cart={cart} onRemoveFromCart={removeFromCart} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
