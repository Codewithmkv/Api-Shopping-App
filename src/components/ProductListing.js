import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './ProductListing.css';

function App() {
  const [data, setData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [cart, setCart] = useState([]); 
 
  useEffect(() => {
    fetch("https://fakestoreapi.in/api/products")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'SUCCESS' && data.products) {
          setData(data.products); 
          setFilteredData(data.products); 
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "") {
      setFilteredData(data);
    } else {
      const filteredProducts = data.filter((item) => item.category.toLowerCase() === category.toLowerCase());
      setFilteredData(filteredProducts); 
    }
  };
  const handlecartbtn = () =>{
      
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className="product-list">
      <div className="categories">
        <ul>
          <li onClick={() => handleCategoryClick("gaming")}>Gaming</li>
          <li onClick={() => handleCategoryClick("audio")}>Earphones</li>
          <li onClick={() => handleCategoryClick("mobile")}>Mobiles</li>
          <li onClick={() => handleCategoryClick("tv")}>TVs</li>
          <button onClick={handlecartbtn} className="cart-list">Cart List</button>
        </ul>
      </div>


      <h1>{selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products` : "Product List"}</h1>
      <div className="card-container">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div className="card" key={item.id}>
              <img src={item.image} alt={item.title} className="card-image" />
              <h3>{item.title.slice(0, 20)}{item.title.length > 20 ? '...' : ''}</h3>
              <p><strong>Price:</strong> ₹{(item.price * 83).toFixed(2)}</p>
              <Link to={`/product/${item.id}`} className="details-button">Details</Link>
              <button onClick={() => handleAddToCart(item)} className="add-to-cart-button">Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>

      <div className="cart-link">
        <Link to="/cart">Go to Cart ({cart.length})</Link>
      </div>
    </div>
  );
}

export default App;
